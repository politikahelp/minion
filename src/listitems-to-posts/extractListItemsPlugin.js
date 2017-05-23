const visit = require('unist-util-visit')

let listItems = []

function textVisitor (node, index, parent) {
  listItems.push(node.value)
}

function paragraphVisitor (node) {
  visit(node, 'text', textVisitor)
}

function listItemVisitor (node) {
  visit(node, 'paragraph', paragraphVisitor)
}

function extractListItemsPlugin () {
  return (tree, file) => {
    visit(tree, 'listItem', listItemVisitor)
    file.listItems = listItems
  }
}

module.exports = extractListItemsPlugin
