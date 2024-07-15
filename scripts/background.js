// chrome.storage.local.get(console.log)
// chrome.storage.local.clear();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "updateTimeSpentFor10Seconds") {
    let url = message.url;

    chrome.storage.local.get("timeSpentData", (result) => {
      let timeSpentData = result.timeSpentData || {};
      let timeFromStorage = timeSpentData[url];

      console.log("time spent data", timeSpentData[url]);
      console.log("time from storage", timeFromStorage);
      console.log(
        "calculation",
        (timeSpentData[url] = timeFromStorage + 10000),
      );

      if (timeSpentData[url] > 0) {
        timeSpentData[url] = timeFromStorage + 10000;
      } else {
        timeSpentData[url] = 10000;
      }

      chrome.storage.local.set({ timeSpentData });
    });
  }
});
