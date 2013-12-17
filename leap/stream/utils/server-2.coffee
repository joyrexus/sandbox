#!/usr/bin/env coffee 
WebSocketServer = require('ws').Server
split = require('split')()
fs = require 'fs'
 
file = process.argv[2]
throw 'please specify a leap sample to serve!' if not file?
fileStream = fs.createReadStream(file)

wss = new WebSocketServer(port: 8081)
console.log 'websocket server created -> ws://localhost:8081'
console.log 'use CTRL-C to quit'

wss.on('connection', (ws) ->
  console.log 'connection open (press CTRL+C to quit)'
 
  fs.createReadStream(file)
    .pipe(split)
    .on('data', (line) -> 
      emit = -> ws.send line
      setTimeout emit, 2000
    )
 
  ws.on 'close', -> console.log 'connection closed'
)
