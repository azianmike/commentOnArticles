let color = '#3aa757';

// when the chrome extension is installed, this fires off
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  // console.log("test enter onUpdated")
  // console.log("changeInfo == " + changeInfo.status)
  if (changeInfo.status == 'complete') {

    // do your things
    let url = tab.url;
    console.log("the url finished loading is " + url)
  }
})
