class Storage {
  files = []
  autoIncrement = 1

  insert(file) {
    file.id = this.autoIncrement++
    this.files.push(file)
    return file.id
  }
}

const storage = new Storage()

module.exports = storage
