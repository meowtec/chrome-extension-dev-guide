document.getElementById('submit').onclick = () => {
  chrome.runtime.sendMessage(null, {
    text: document.getElementById('input').value
  })
}