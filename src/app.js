const express = require('express')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const sassMiddleware = require('node-sass-middleware')
const router = require('./routes')
const handlebars = require('express-handlebars')
const publicPath = require('./asdf')

const port = process.env.PORT || 3002
const debug = false
const app = express()

const fileTypesPath = path.join(publicPath, 'images', 'file-types')

app.engine('hbs', handlebars({
  extname: 'hbs',
  helpers: {
    formatSize: (sizeInBytes) => {
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      const exponent = Math.floor(
        (sizeInBytes ? Math.log(sizeInBytes) : 0) / Math.log(1024)
      )
      const index = Math.min(exponent, units.length - 1)
      const size = Math.round(sizeInBytes / (1024 ** index))
      const unit = units[index]
      return `${size} ${unit}`
    },
    iconByMimeType: (mimeType) => {
      const extension = mime.getExtension(mimeType)

      if (extension) {
        if (fs.existsSync(path.join(fileTypesPath, `${extension}.svg`))) {
          return `images/file-types/${extension}.svg`
        }
      }

      return `images/file-types/file.svg`
    },
    formatDate: (date) => {
      if (!date) return ''

      return `${date.getUTCDay()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} (UTC)`
    }
  }
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

app.use(router)

app.use(sassMiddleware({
  root: path.join(__dirname, '..'),
  src: 'scss',
  dest: 'public/css',
  prefix: '/css',
  outputStyle: 'compressed',
  debug
}))

app.use(express.static(path.join(__dirname, '..', 'public')))

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

server.timeout = 1000 * 60 * 60

process.on('uncaughtException', (err) => {
  console.error(err.stack);
})
