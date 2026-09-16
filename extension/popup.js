document.getElementById("open").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) await chrome.sidePanel.open({ tabId: tab.id });
  else await chrome.sidePanel.open({ windowId: tab?.windowId });
  window.close();
});
document.getElementById("opts").addEventListener("click", () => chrome.runtime.openOptionsPage());
