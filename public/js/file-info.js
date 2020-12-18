(function () {
  const hItems = document.querySelectorAll('[data-file-info]')

  hItems.forEach(hItem => {
    const fileId = hItem.dataset.fileInfo

    hItem.addEventListener('click', event => {
      if (event.target.tagName !== 'DIV') return
      window.location.href = `/info/${fileId}`
    })
  })
})()
