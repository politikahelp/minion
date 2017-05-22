#!/usr/bin/env node

const prog = require('caporal')
const pkg = require('./package.json')
const parseMdFile = require('./src/parseMdFile')
const { resolve } = require('path')

prog
  .version(pkg.version)
  .command('lists-to-posts', 'Parse md lists in given file and generate posts from them')
  .argument('<filePath>', 'Path to file to parse')
  .action((args, options, logger) => {
    const filePath = resolve(process.cwd(), args.filePath)
    parseMdFile(filePath)
  })

prog.parse(process.argv)
