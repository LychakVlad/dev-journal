let lastInteractionTime = Date.now();
const startTime = Date.now();
let checkInProgress = false;

function trackUserInteraction() {
  if (checkInProgress) {
    return;
  }

  checkInProgress = true;

  lastInteractionTime = Date.now();

  if (lastInteractionTime - startTime >= 10000) {
    chrome.runtime.sendMessage({
      action: "updateTimeSpentFor10Seconds",
      url: window.location.href,
    });
  }

  checkInProgress = false;
}

const events = ["mousemove", "keydown", "click", "scroll"];

events.forEach((event) => {
  document.addEventListener(event, trackUserInteraction);
});
