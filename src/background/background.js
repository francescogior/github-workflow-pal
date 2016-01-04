chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.match(/.*\/github.com\/buildo\/.*\/issues/)) {
    chrome.tabs.sendMessage(tab.id, { onIssuesPage: true });
  }
  if (changeInfo.status == 'complete' && tab.url.match(/.*\/github.com\/buildo\/.*\/pull\/.*/)) {
    chrome.tabs.sendMessage(tab.id, { onPRPage: true });
  }
});
