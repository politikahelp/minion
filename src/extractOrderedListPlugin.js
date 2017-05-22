const visit = require('unist-util-visit')

function textVisitor (node, index, parent) {
  console.log('--------------------')
  console.log('node:', node)
  return 'abc'
}

function paragraphVisitor (node) {
  // console.log('--------------------')
  // console.log(JSON.stringify(node, null, 2))
  return visit(node, 'text', textVisitor)
}

function listItemVisitor (node) {
  return visit(node, 'paragraph', paragraphVisitor)
  // console.log('index:', index)
  // console.log('parent:', parent)
}

function extractOrderedListPlugin () {
  return (tree, file) => {
    const visitRes = visit(tree, 'listItem', listItemVisitor)
    console.log('visitRes:', visitRes)
  }
}

module.exports = extractOrderedListPlugin
