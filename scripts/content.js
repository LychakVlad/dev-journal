let lastInteractionTime = Date.now();

function trackUserInteraction() {
  lastInteractionTime = Date.now();

  chrome.runtime.sendMessage({
    action: "updateTimeSpent",
    url: window.location.href,
    timeSpent: lastInteractionTime - startTime,
  });
}

document.addEventListener("mousemove", trackUserInteraction);
document.addEventListener("keydown", trackUserInteraction);
document.addEventListener("click", trackUserInteraction);
document.addEventListener("scroll", trackUserInteraction);

const startTime = Date.now();

chrome.runtime.sendMessage({
  action: "updateTimeSpent",
  url: window.location.href,
  timeSpent: 0,
});
