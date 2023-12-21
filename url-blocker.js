/**
 * Start timer countdown interval
 *
 * @param {number} delay - Total delay to count down
 * @returns {number}
 */
function startCountdownTimer(delay) {
  const timer = document.querySelector("#timer");
  let delay_counter = decrementCounter(delay/1000, timer);

  return setInterval(() => {
    delay_counter = decrementCounter(delay_counter, timer);
  }, 1000);
}

/**
 * Update timer HTML with decremented oldValue
 *
 * @param {number} oldValue - Previous value, to be decremented
 * @param {Element} timer - Timer HTML Element
 * @returns {number} decremented value
 */
function decrementCounter(oldValue, timer) {
  timer.innerHTML = oldValue.toFixed(0).toString()
  oldValue -= 1;
  return oldValue;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const originalUrl = message.originalUrl;
  console.log('Original URL:', originalUrl);
  // const newUrl = new URL(originalUrl)
  // newUrl.searchParams.append("holdon", "true"); console.log(toString(newUrl))
  // console.log(newUrl.toString())
  
  const delay = 5000;
  

  startCountdownTimer(delay);

  // After a specified delay, redirect back to the original URL
  setTimeout(() => {
    // const newUrl = new URL(originalUrl).searchParams.append("holdon", "true");
    // console.log(newUrl.toString())

    window.location.href = originalUrl;
  }, delay);
});
