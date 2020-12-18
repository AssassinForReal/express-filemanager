(function () {
  function init() {
    const hDropArea = document.querySelector('.js-drag-and-drop')
    const target = hDropArea.dataset.target
    const hTargetInput = document.querySelector(target)

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      hDropArea.addEventListener(eventName, preventDefaults, false)
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
      hDropArea.addEventListener(eventName, () => {
        hDropArea.classList.add('highlight')
      }, false)
    })
    
    ;['dragleave', 'drop'].forEach(eventName => {
      hDropArea.addEventListener(eventName, () => {
        hDropArea.classList.remove('highlight')
      }, false)
    })

    hDropArea.addEventListener('drop', (event) => {
      const transferedFiles = event.dataTransfer.files
      hTargetInput.files = transferedFiles

      hDropArea.innerHTML = ''

      console.log(transferedFiles)

      ;[...transferedFiles].forEach(file => {
        const hFile = document.createElement('div')
        hFile.className = 'js-drag-and-drop-file'

        const hFileName = document.createElement('div')
        hFileName.className = 'js-drag-and-drop-file__name'
        hFileName.textContent = file.name

        // const hFileRemove = document.createElement('div')
        // hFileRemove.className = 'js-drag-and-drop-file__remove'
        // hFileRemove.innerHTML = '<i class="icon-cancel hover-red"></i>'

        // hFileRemove.addEventListener('click', (event) => {
          
        // })

        hFile.appendChild(hFileName)
        // hFile.appendChild(hFileRemove)
        hDropArea.append(hFile)
      })
    }, false)
  }

  function preventDefaults(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  window.addEventListener('load', init)
})()
