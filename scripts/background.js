setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      let activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.get(activeTab.id, (tab) => {});
      }
    }
  });
}, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateTimeSpent") {
    let url = message.url;
    let timeSpent = message.timeSpent;

    chrome.storage.local.get("timeSpentData", (result) => {
      let timeSpentData = result.timeSpentData || {};
      timeSpentData[url] = timeSpent;
      chrome.storage.local.set({ timeSpentData });
    });
  }
});

// chrome.storage.local.get(console.log)
