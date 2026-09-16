import { ACTIONS, PROMPTS, PROVIDERS } from "./lib/catalog.js";
import { complete } from "./lib/complete.js";

const STORAGE = "loreweave.v1";

async function loadState() {
  const bag = await chrome.storage.local.get(STORAGE);
  if (bag[STORAGE]) return bag[STORAGE];
  const state = defaultState();
  await chrome.storage.local.set({ [STORAGE]: state });
  return state;
}

async function saveState(state) {
  await chrome.storage.local.set({ [STORAGE]: state });
}

function defaultState() {
  return {
    providers: PROVIDERS.map((p, i) => ({
      id: `prov_${p.kind}`,
      ...p,
      defaultModel: p.models[0],
      keys: [],
      enabled: true,
    })),
    defaultProviderId: "prov_openai",
    notes: [],
    story: SAMPLE,
    messages: [
      {
        role: "assistant",
        content:
          "Loreweave stays on this machine until you send a prompt. Add an API key in Providers, select text on a page, or open Story Studio.",
      },
    ],
    settings: {
      autoPageContext: false,
      autoMemoryContext: true,
      dailyRequestLimit: 200,
      maxRequestChars: 12000,
    },
  };
}

const SAMPLE = `The lamps along Ashlight Harbor burned low. Mara Keel stood on the customs pier with salt in her hair and a ledger that would not balance.

"You're early," said Warden Holt. He did not look at her.

"I'm on time for a lie," Mara said. "That's close enough."`;

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "lw-root", title: "Loreweave", contexts: ["selection"] });
    for (const [id, title] of ACTIONS) {
      chrome.contextMenus.create({ id, parentId: "lw-root", title, contexts: ["selection"] });
    }
  });
  await loadState();
});

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    await chrome.sidePanel.open({ tabId: tab.id });
  } catch {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }
  if (command === "command-palette") {
    chrome.runtime.sendMessage({ type: "OPEN_PALETTE" }).catch(() => {});
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = info.selectionText || "";
  if (info.menuItemId === "save-note") {
    const state = await loadState();
    state.notes.unshift({ title: text.slice(0, 48), body: text, at: Date.now() });
    await saveState(state);
    return;
  }
  const template = PROMPTS[info.menuItemId];
  if (!template) return;
  if (tab?.id) {
    try {
      await chrome.sidePanel.open({ tabId: tab.id });
    } catch {
      /* ignore */
    }
  }
  const result = await runPrompt(template.replace("{{text}}", text));
  chrome.runtime.sendMessage({ type: "MENU_RESULT", text: result, source: text }).catch(() => {});
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  handle(msg).then(sendResponse).catch((err) => sendResponse({ ok: false, error: String(err.message || err) }));
  return true;
});

async function handle(msg) {
  if (msg.type === "GET_STATE") return { ok: true, state: await loadState() };
  if (msg.type === "SAVE_STATE") {
    await saveState(msg.state);
    return { ok: true };
  }
  if (msg.type === "GET_PAGE") return getPage(msg.tabId);
  if (msg.type === "COMPLETE") return runPrompt(msg.prompt, msg.system);
  if (msg.type === "TEST_KEY") return testKey(msg.providerId);
  if (msg.type === "REQUEST_PAGE_ACCESS") return requestPageAccess(msg.tabId);
  return { ok: false, error: "Unknown message" };
}

async function getPage(tabId) {
  try {
    const [tab] = tabId
      ? [await chrome.tabs.get(tabId)]
      : await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return { ok: false, error: "No active tab." };
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        title: document.title,
        url: location.href,
        selection: String(getSelection() || ""),
        text: (document.body && document.body.innerText ? document.body.innerText : "").slice(0, 20000),
      }),
    });
    return { ok: true, page: result };
  } catch {
    return {
      ok: false,
      error: "Cannot read this page yet. Use the toolbar action on the tab, or grant site access in the panel.",
    };
  }
}

async function requestPageAccess(tabId) {
  const tab = await chrome.tabs.get(tabId);
  if (!tab.url) return { ok: false, error: "No URL." };
  const origin = new URL(tab.url).origin + "/*";
  const granted = await chrome.permissions.request({ origins: [origin] });
  return { ok: granted };
}

async function runPrompt(prompt, system) {
  const state = await loadState();
  const provider = state.providers.find((p) => p.id === state.defaultProviderId) || state.providers[0];
  const key = (provider.keys || []).find((k) => k.enabled && k.secret);
  if (!key && provider.format !== "ollama") {
    const text = "Add an API key in Providers. Loreweave does not ship with a developer key.";
    state.messages.push({ role: "user", content: prompt.slice(0, 4000) });
    state.messages.push({ role: "assistant", content: text });
    await saveState(state);
    return { ok: false, error: text, state };
  }
  const messages = [
    {
      role: "system",
      content:
        system ||
        "You are Loreweave, a local-first writing and reading assistant. Distinguish user text, page text, and your output.",
    },
    { role: "user", content: prompt },
  ];
  const result = await complete({
    format: provider.format,
    baseUrl: provider.baseUrl,
    apiKey: key?.secret || "",
    model: provider.defaultModel,
    messages,
  });
  state.messages.push({ role: "user", content: prompt.slice(0, 8000) });
  state.messages.push({ role: "assistant", content: result.text || result.message || result.error || "No response" });
  if (state.messages.length > 80) state.messages = state.messages.slice(-80);
  await saveState(state);
  return { ...result, state };
}

async function testKey(providerId) {
  const state = await loadState();
  const provider = state.providers.find((p) => p.id === providerId);
  if (!provider) return { ok: false, error: "Missing provider" };
  const key = (provider.keys || []).find((k) => k.enabled && k.secret);
  if (!key && provider.format !== "ollama") return { ok: false, error: "No key" };
  return complete({
    format: provider.format,
    baseUrl: provider.baseUrl,
    apiKey: key?.secret || "",
    model: provider.defaultModel,
    messages: [{ role: "user", content: "Reply with pong." }],
    maxTokens: 8,
  });
}
