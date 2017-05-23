const remark = require('remark')
const parse = require('remark-parse')
const metaPlugin = require('@justinc/remark-yaml-meta')
const extractListItemsPlugin = require('./extractListItemsPlugin')
const fs = require('fs')
const { resolve } = require('path')

function takeWords (n, joinStr = ' ') {
  n = n > 0 ? n : 1
  return str => {
    return str
      .split(' ')
      .filter((_, index) => index <= n - 1)
      .join(joinStr)
  }
}

function zip (as, bs) {
  return as.map((a, i) => [a, bs[i]])
}

const yamlFrontMatterFactory = (category) => `---
title:
date: 2017-05-15 22:09:35
tags: []
categories: [${category}]
---

`

function handleError (err) {
  console.error(err.message)
  process.exit(-1)
}

function listItemsToPosts (filePath, outDir) {
  let fileStr = null
  try {
    fileStr = fs.readFileSync(filePath, 'utf-8')
  } catch (err) { return handleError(err) }

  return remark()
    .use(parse, { commonmark: true })
    .use(metaPlugin)
    .use(extractListItemsPlugin)
    .process(fileStr, (err, file) => {
      if (err) { return handleError(err) }

      let category = null
      if (file.meta && file.meta.categories && file.meta.categories[0]) {
        category = file.meta.categories[0]
      }
      const yamlFrontMatter = yamlFrontMatterFactory(category || '')

      const fileNames = file.listItems
        .map(takeWords(10))
        .map(fileName => `[${category || '?'}] ${fileName}.md`)

      zip(fileNames, file.listItems)
        .forEach(([fileName, listItem]) => {
          let outputPath = resolve(outDir, fileName)
          fs.writeFile(outputPath, yamlFrontMatter + listItem, (err) => {
            if (err) { return handleError(err) }
            console.log(`Done writing ${outputPath}`)
          })
        })
    })
}

module.exports = listItemsToPosts
