fs = require 'fs'
render = require 'brucedown'

filename = process.argv[2] or __dirname + '/README.md'

print = (err, md) -> 
  render md, (err, html) -> console.log(html)

fs.readFile(filename, 'utf8', print)
