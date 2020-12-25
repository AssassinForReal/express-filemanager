const { Router } = require('express')
const { IncomingForm } = require('formidable')
const path = require('path')
const fs = require('fs')
const storage = require('../storage')
const publicPath = require('../asdf')

const router = Router()

router.get('/', (req, res) => {
  res.redirect('/filemanager')
})

router.get('/filemanager', (req, res) => {
  res.render('filemanager', { files: storage.files, displayClear: true })
})

router.get('/info', (req, res) => {
  res.render('info')
})

router.get('/info/:id', (req, res) => {
  const fileId = parseInt(req.params.id)
  const file = storage.files.find(file => {
    return file.id === fileId
  })

  if (file) {
    return res.render('info', { file })
  }
  res.render('info')
})

router.route('/upload')
  .get((req, res) => {
    res.render('upload')
  })
  .post((req, res) => {
    const form = new IncomingForm()
    const uploadDir = path.join(publicPath, 'uploads')
    fs.promises.mkdir(uploadDir, { recursive: true });

    form.on('fileBegin', (inputName, file) => {
      if (!file.name) throw ''
      file.path = path.join(uploadDir, file.name)
    })

    form.on('file', (inputName, file) => {
      const { name, path, lastModifiedDate, type, size } = file
      storage.insert({
        id: 0, name, path, lastModifiedDate, type, size
      })
    })
  
    form.once('end', () => {
      res.redirect('/filemanager')
    })

    form.parse(req)
  })

router.get('/delete/:id', (req, res) => {
  const fileId = parseInt(req.params.id)
  const index = storage.files.findIndex(file => {
    return file.id === fileId
  })

  if (index > -1) {
    storage.files.splice(index, 1)
  }
  res.redirect('/filemanager')
})

router.get('/clear', (req, res) => {
  storage.files.length = 0
  res.redirect('/filemanager')
})

module.exports = router
