const autoPage = document.getElementById("auto-page");
const autoMem = document.getElementById("auto-mem");
const out = document.getElementById("out");

const res = await chrome.runtime.sendMessage({ type: "GET_STATE" });
if (res.ok) {
  autoPage.checked = Boolean(res.state.settings?.autoPageContext);
  autoMem.checked = res.state.settings?.autoMemoryContext !== false;
}

document.getElementById("save").addEventListener("click", async () => {
  const got = await chrome.runtime.sendMessage({ type: "GET_STATE" });
  got.state.settings = {
    ...got.state.settings,
    autoPageContext: autoPage.checked,
    autoMemoryContext: autoMem.checked,
  };
  await chrome.runtime.sendMessage({ type: "SAVE_STATE", state: got.state });
  out.textContent = "Saved on this device.";
});
