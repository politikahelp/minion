const remark = require('remark')
const parse = require('remark-parse')
const extractOrderedListPlugin = require('./extractOrderedListPlugin')
const fs = require('fs')

function parseMdFile (filePath) {
  return remark()
    .use(parse, { commonmark: true })
    .use(extractOrderedListPlugin)
    .process(fs.readFileSync(filePath, 'utf-8'), (err, file) => {
      if (err) throw err

      console.log(file)
    })
}

module.exports = parseMdFile
