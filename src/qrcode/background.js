const imageMenuId = chrome.contextMenus.create({
  title: '选中生成二维码',
  contexts: [ 'selection' ],
})

chrome.contextMenus.onClicked.addListener(function callback(e) {
  if (e.menuItemId === imageMenuId) {
    window.open(
      `http://10.15.25.243:8080/?url=${encodeURIComponent('e.selection')}`,
      '',
      'width=340,height=360,left=500,top=200'
    )
  }
})

chrome.runtime.onMessage.addListener(function callback(e) {
  chrome.contextMenus.update(imageMenuId, {
    title: e.text
  })
})