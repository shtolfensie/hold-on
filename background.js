const redirectedStatus = {};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes("youtube")) {

      const tabId = details.tabId;

      const redirected = redirectedStatus[tabId];

      if (!redirected) {

        redirectedStatus[tabId] = true;

        setTimeout(() => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0]?.id;
            if (tabId) {
              chrome.tabs.sendMessage(tabId, { originalUrl: details.url });
            }
          });
        }, 700)
        return { redirectUrl: chrome.runtime.getURL("url-blocker.html") };
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
