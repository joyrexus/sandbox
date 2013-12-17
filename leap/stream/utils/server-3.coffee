#!/usr/bin/env coffee
WebSocketServer = require('ws').Server
makeStream = require 'websocket-stream'
split = require('split')()
fs = require 'fs'

wss = new WebSocketServer(port: 8081)

file = process.argv[2]
throw 'please specify a leap sample to serve!' if not file?

console.log 'websocket server created -> ws://localhost:8081'
console.log "serving sample file '#{file}'"

connect = (ws) ->
  console.log 'connection open'
  socket = makeStream(ws)
  fs.createReadStream(file)
    .pipe(split)
    .pipe(socket)
  ws.on 'close', -> console.log 'connection closed'
  ''

wss.on 'connection', connect
