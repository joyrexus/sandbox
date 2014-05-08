fs = require 'fs'
lz = require 'lz-string'
fs.readFile 'pinch.json.lz', 'utf8', (err, data) -> 
  json = lz.decompressFromBase64(data)
  console.log JSON.parse json
