document.getElementById('capture').onclick = () => {
  chrome.tabs.captureVisibleTab(null, {}, (dataUrl) => {
    window.open(dataUrl)
  })
}