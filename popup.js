document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("timeSpentData", (result) => {
    let timeSpentData = result.timeSpentData || {};
    let timeDiv = document.getElementById("times");

    let sortedTimeSpentData = Object.entries(timeSpentData).sort(
      (a, b) => b[1] - a[1],
    );

    for (let [url, timeSpent] of sortedTimeSpentData) {
      let li = document.createElement("li");
      li.textContent = `${url}: ${formatTime(timeSpent)}`;
      timeDiv.appendChild(li);
    }
  });
});

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}
