import { ACTIONS, PROMPTS } from "./lib/catalog.js";
import { SUPPORT_LINKS } from "./lib/support.js";
import { maskKey } from "./lib/security.js";

const main = document.getElementById("main");
const status = document.getElementById("status");
const promptEl = document.getElementById("prompt");
let state = null;
let mode = "browser";
let page = { title: "", url: "", text: "", selection: "" };

async function refresh() {
  const res = await chrome.runtime.sendMessage({ type: "GET_STATE" });
  if (res?.ok) state = res.state;
  render();
}

function render() {
  if (!state) {
    main.innerHTML = "<p class='muted'>Loading…</p>";
    return;
  }
  if (mode === "browser") renderBrowser();
  else if (mode === "studio") renderStudio();
  else if (mode === "reader") renderReader();
  else if (mode === "memory") renderMemory();
  else if (mode === "providers") renderProviders();
  else renderSupport();
}

function renderBrowser() {
  const msgs = (state.messages || [])
    .map(
      (m) =>
        `<article class="msg"><div class="meta">${m.role}</div>${escapeHtml(m.content)}</article>`,
    )
    .join("");
  const chips = ACTIONS.filter(([id]) => id !== "save-note")
    .slice(0, 12)
    .map(([id, title]) => `<button data-act="${id}">${title}</button>`)
    .join("");
  main.innerHTML = `
    <div class="card">
      <div class="meta">Page</div>
      <div>${escapeHtml(page.title || "No page read yet")}</div>
      <div class="muted">${escapeHtml(page.url || "")}</div>
      ${page.selection ? `<p class="muted">Selection: ${escapeHtml(page.selection.slice(0, 280))}</p>` : ""}
    </div>
    <div class="tools">${chips}</div>
    ${msgs || "<p class='muted'>Nothing sent yet. Page text stays local until you ask.</p>"}
  `;
  main.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => runAction(btn.getAttribute("data-act")));
  });
}

function renderStudio() {
  main.innerHTML = `
    <div class="card">
      <div class="meta">Story Studio</div>
      <p class="muted">Rewrite, continue, and check continuity against your own text. This is not a clone of a living author's style.</p>
      <textarea id="story">${escapeHtml(state.story || "")}</textarea>
      <div class="row">
        <button class="btn" data-tool="continue">Continue</button>
        <button class="btn ghost" data-tool="rewrite">Rewrite chapter</button>
        <button class="btn ghost" data-tool="dialogue">Dialogue</button>
        <button class="btn ghost" data-tool="plothole">Plot holes</button>
      </div>
    </div>
  `;
  const story = main.querySelector("#story");
  story.addEventListener("change", async () => {
    state.story = story.value;
    await chrome.runtime.sendMessage({ type: "SAVE_STATE", state });
  });
  main.querySelectorAll("[data-tool]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tool = btn.getAttribute("data-tool");
      const text = story.value;
      const map = {
        continue: PROMPTS.continue,
        rewrite: "Rewrite this chapter. Preserve character personalities.\n\n{{text}}",
        dialogue: PROMPTS.dialogue,
        plothole: "List possible plot holes. Separate fact from speculation.\n\n{{text}}",
      };
      await send((map[tool] || PROMPTS.continue).replace("{{text}}", text));
    });
  });
}

function renderReader() {
  const text = page.selection || page.text || state.story || "";
  main.innerHTML = `
    <div class="card">
      <div class="meta">Reader</div>
      <p style="font-family:Georgia,serif;font-size:17px;line-height:1.7;white-space:pre-wrap">${escapeHtml(text)}</p>
    </div>
  `;
}

function renderMemory() {
  const notes = (state.notes || [])
    .map((n) => `<div class="card"><strong>${escapeHtml(n.title)}</strong><p class="muted">${escapeHtml(n.body)}</p></div>`)
    .join("");
  main.innerHTML = notes || "<p class='muted'>No notes yet. Right-click selected text → Save to notes.</p>";
}

function renderProviders() {
  const options = state.providers
    .map(
      (p) =>
        `<option value="${p.id}" ${p.id === state.defaultProviderId ? "selected" : ""}>${p.name}</option>`,
    )
    .join("");
  const p = state.providers.find((x) => x.id === state.defaultProviderId) || state.providers[0];
  const keys = (p.keys || [])
    .map(
      (k) =>
        `<div class="muted">${escapeHtml(k.label)} · ${maskKey(k.secret)} · ${k.enabled ? "on" : "off"}</div>`,
    )
    .join("");
  main.innerHTML = `
    <div class="card">
      <div class="meta">BYOK</div>
      <p class="muted">Keys are stored in chrome.storage.local on this profile. They are sent only to the provider endpoint you configure. Never to a Loreweave server.</p>
      <label class="muted">Provider</label>
      <select id="prov">${options}</select>
      <div class="row"></div>
      ${keys}
      <label class="muted">Label</label>
      <input id="k-label" value="Key 1" />
      <label class="muted">API key</label>
      <input id="k-secret" type="password" autocomplete="off" />
      <div class="row">
        <button class="btn" id="add-key">Add key</button>
        <button class="btn ghost" id="test-key">Test key</button>
      </div>
      <p class="muted" id="test-out"></p>
    </div>
  `;
  main.querySelector("#prov").addEventListener("change", async (e) => {
    state.defaultProviderId = e.target.value;
    await chrome.runtime.sendMessage({ type: "SAVE_STATE", state });
    render();
  });
  main.querySelector("#add-key").addEventListener("click", async () => {
    const secret = main.querySelector("#k-secret").value.trim();
    if (!secret) return;
    p.keys = p.keys || [];
    p.keys.push({ id: "k" + Date.now(), label: main.querySelector("#k-label").value || "Key", secret, enabled: true });
    await chrome.runtime.sendMessage({ type: "SAVE_STATE", state });
    render();
  });
  main.querySelector("#test-key").addEventListener("click", async () => {
    const out = main.querySelector("#test-out");
    out.textContent = "Testing…";
    const res = await chrome.runtime.sendMessage({ type: "TEST_KEY", providerId: p.id });
    out.textContent = res.ok ? "Key accepted." : res.error || res.message || "Failed";
  });
}

function renderSupport() {
  main.innerHTML = `
    <div class="card">
      <div class="brand">Enjoying Loreweave?</div>
      <p class="muted">The extension is free. Core AI uses your keys. Support is optional.</p>
      ${SUPPORT_LINKS.map((l) => `<p><a href="${l.url}" target="_blank" rel="noreferrer">${l.label}</a></p>`).join("")}
    </div>
  `;
}

async function runAction(id) {
  const text = page.selection || page.text || state.story || "";
  const template = PROMPTS[id];
  if (!template) return;
  await send(template.replace("{{text}}", text));
}

async function send(prompt) {
  status.textContent = "Composing…";
  const res = await chrome.runtime.sendMessage({ type: "COMPLETE", prompt });
  status.textContent = res.ok ? "Done" : res.error || "Error";
  if (res.state) state = res.state;
  mode = "browser";
  render();
}

document.querySelectorAll("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    mode = btn.getAttribute("data-mode");
    document.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-current", b === btn ? "true" : "false"));
    render();
  });
});

document.getElementById("send").addEventListener("click", async () => {
  const v = promptEl.value.trim();
  if (!v) return;
  promptEl.value = "";
  const extra = page.selection || page.text ? `\n\nPage context:\n${(page.selection || page.text).slice(0, 8000)}` : "";
  await send(v + extra);
});

document.getElementById("read-page").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const res = await chrome.runtime.sendMessage({ type: "GET_PAGE", tabId: tab?.id });
  if (!res.ok) {
    if (tab?.id) await chrome.runtime.sendMessage({ type: "REQUEST_PAGE_ACCESS", tabId: tab.id });
    status.textContent = res.error || "Need page access";
    return;
  }
  page = res.page;
  status.textContent = page.title;
  render();
});

document.getElementById("palette").addEventListener("click", () => {
  const name = window.prompt("Command: summarize, rewrite, continue, explain…", "summarize");
  if (name && PROMPTS[name]) void runAction(name);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "OPEN_PALETTE") document.getElementById("palette").click();
  if (msg.type === "MENU_RESULT") refresh();
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

refresh();
