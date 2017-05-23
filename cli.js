#!/usr/bin/env node

const prog = require('caporal')
const pkg = require('./package.json')
const listItemsToPosts = require('./src/listitems-to-posts')
const { resolve } = require('path')

prog
  .version(pkg.version)
  .command('listitems-to-posts', 'Parse md list items in given file and generate posts from them')
  .argument('<filePath>', 'Path to file to parse')
  .argument('<outPath>', 'Path to directory in which to put posts')
  .action((args, options, logger) => {
    const filePath = resolve(process.cwd(), args.filePath)
    const outPath = resolve(process.cwd(), args.outPath)
    listItemsToPosts(filePath, outPath)
  })

prog.parse(process.argv)
