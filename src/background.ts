// cross-extension messaging
const waitPageLoad = async (callback) => {
  // 取得するタブの条件
  console.log(callback)
  const queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  // タブの情報を取得する
  chrome.tabs.query(queryInfo, async function (result) {
    // 配列の先頭に現在タブの情報が入っている
    const currentTab = result.shift();
    console.log(currentTab)
    if (currentTab.status === 'complete') {
      // ロードが完了していたら、コールバックを実行
      callback(currentTab);
    } else {
      setTimeout(() => {
        // まだロード中だった場合は、ちょっとwaitして再帰的にこの処理を繰り返す
        waitPageLoad(callback);
      }, 100);
    }
    return true
  });

}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

  console.log("test")
  if (request.message === 'selected') {
    await waitPageLoad((tab) => {
      if (!request.data) {
        alert("テキストはありませんでした")
      }
      chrome.tabs.sendMessage(tab.id, { message: "Show Modal", }, () => { });
    })
  } else if (request.message === 'selected') {
    await waitPageLoad((tab) => {
      if (!request.data) {
        alert("テキストはありませんでした")
        return
      }

      chrome.tabs.sendMessage(tab.id, { message: "Show Modal", }, () => { });
    })
  }
  sendResponse()
  return true
});


chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (tab) {
    if (info.menuItemId === "select") {
      waitPageLoad((tab) => {
        chrome.tabs.sendMessage(tab.id, { message: "select" }, () => { console.log(tab) });
      })
    } else if (info.menuItemId === "paste") {
      waitPageLoad((tab) => {
        chrome.tabs.sendMessage(tab.id, { message: "paste" }, () => { console.log(tab) });
      })
    }
  }
})


chrome.contextMenus.create({
  type: "normal",
  id: "paste",
  title: "SPLT from Clipboard",
  contexts: ["all"]
});

//子メニューを追加（１つ目）
chrome.contextMenus.create({
  type: "normal",
  id: "select",
  title: "SPLT from Select",
  contexts: ["all"]
});