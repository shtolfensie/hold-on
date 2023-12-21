const redirectedStatus = {};

/**
 * Strip URL of protocol and www parts, keeping only the host and pathname.
 *
 * Decisions about URL equality are made based on these parts in this plugin.
 *
 * @param {URL} url - URL to normalize
 * @returns {string} - Normalized URL with shape: <base host><pathname>
 */
function normalizeURL(url) {
  const strippedHost = url.host.replace("www.", "");
  return strippedHost + url.pathname;
}

/**
 * Check if trying to navigate to new URL, exclude extension URL.
 *
 * This function is used to determine, whether to show the delay
 * page, or if it is not needed. It also prevents redirects to
 * the delay page from causing cycles.
 *
 * @param {string|undefined} oldURLText - Previous URL, can be undefined if this is the first URL of the tab
 * @param {string} newURLText - URL the tab is trying to navigate to
 * @returns {boolean} If the navigation was to a newURL that should be delayed
 */
function navigatedToNewURL(oldURLText, newURLText) {
  if (newURLText.includes("extension")) {
    return false;
  }
  const oldURL = new URL(oldURLText);
  const newURL = new URL(newURLText);

  const normOld = normalizeURL(oldURL);
  const normNew = normalizeURL(newURL);

  return normOld !== normNew;
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.type === "main_frame" && (details.url.includes("youtube"))) {
      const tabId = details.tabId;

      const redirected = redirectedStatus[tabId];

      if (redirected === undefined || navigatedToNewURL(redirected, details.url)) {
        redirectedStatus[tabId] = details.url;

        const newURL = new URL(chrome.runtime.getURL("url-blocker.html"));
        newURL.searchParams.set("url", encodeURIComponent(details.url))
        return { redirectUrl:  newURL.toString()};
      }
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
)

chrome.tabs.onRemoved.addListener((tabId) => {
  delete redirectedStatus[tabId];
});
