const redirectedStatus = {};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes("youtube")) {

      const tabId = details.tabId;

      const redirected = redirectedStatus[tabId];

      if (!redirected) {

        redirectedStatus[tabId] = true;

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
