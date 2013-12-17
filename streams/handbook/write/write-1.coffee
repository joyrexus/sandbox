ws = require('stream').Writable(decodeStrings: false)

ws._write = (chunk, enc, next) ->
  console.log chunk
  next()

ws.write 'beep'
ws.write 'boop'
ws.end()
