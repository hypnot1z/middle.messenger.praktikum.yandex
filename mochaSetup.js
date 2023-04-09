const { JSDOM } = require('jsdom')
const Handlebars = require('handlebars')
const fs = require('fs')

const dom = new JSDOM('<div id="app"><div>', { url: 'http://localhost:3000' })

global.window = dom.window
global.document = dom.window.document
global.DocumentFragment = window.DocumentFragment
global.Node = dom.window.Node

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8')
  module.exports = Handlebars.compile(contents)
}

require.extensions['.scss'] = function () {
  module.exports = () => ({})
}
