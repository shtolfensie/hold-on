/**
 * Start timer countdown interval
 *
 * @param {number} delay - Total delay to count down
 * @returns {number}
 */
function startCountdownTimer(delay) {
  const deltaMS = 100;
  const timer = document.querySelector("#timer");
  let counterValue = handleTimer(delay, deltaMS, timer);

  return setInterval(() => {
    // delay_counter = updateCounterText(delay_counter, timer);
    counterValue = handleTimer(counterValue, deltaMS, timer)
  }, deltaMS);
}

function handleTimer(currValueMS, deltaMS, timer) {

  if (document.hidden) {
    return currValueMS;
  }

  const newValue = currValueMS - deltaMS;
  if (newValue <= 0) {
    handleTimerEnd();
  }

  updateCounterText(formatTime(newValue), timer);

  return newValue;
}

let redirected = false; //< Global flag to track, if the redirect has already been issued, to not spam it

/**
 * React to timer end
 *
 * Currently it redirects to the originalUrl. Sets a global flag,
 * so that the redirect action is not issued multiple times.
 */
function handleTimerEnd() {
  if (!redirected) {
    window.location.href = originalUrl;
    redirected = true;
  }
}

/**
 * Format time in [ms] to [s]
 *
 * @param {number} timeMS - Time value in milliseconds
 * @returns {string} Time value string in seconds, rounded up to closes second
 */
function formatTime(timeMS) {
  return Math.ceil(timeMS / 1000).toFixed(0).toString();


}

/**
 * Update timer HTML with decremented oldValue
 *
 * @param {string} newValue - New value to display
 * @param {Element} timer - Timer HTML Element
 */
function updateCounterText(newValue, timer) {
  timer.innerHTML = newValue;
}

/**
 * Cancel button handler -- closes the current tab, instead of redirecting
 * to the originalUrl.
 *
 * @param {MouseEvent} e - click event
 */
function handleCancelButton(e) {
  e.preventDefault();
  window.close();
}

const currentURL = new URL(document.URL.toString())
const originalUrl = decodeURIComponent(currentURL.searchParams.get("url"))
console.log('current URL:', currentURL);
console.log('Original URL:', originalUrl);

const cancelButton = document.querySelector("#cancel-button");
console.log(cancelButton)
cancelButton.addEventListener("click", handleCancelButton);

const delay = 5000;

startCountdownTimer(delay);
