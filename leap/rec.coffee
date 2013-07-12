#!/usr/bin/env coffee 
###
rec - save a set of frames streamed from the Leap's websocket.

USAGE

  rec.coffee [no.-of-frames [file.json]]

  rec.coffee                  # stream 100 frames to stdout
  rec.coffee 1000             # stream 1000 frames to stdout 
  rec.coffee 1000 hand.json   # stream 1000 frames to hand.json

###
WebSocket = require 'ws'
ws = new WebSocket 'ws://localhost:6437'
fs = require 'fs'

max = parseInt process.argv[2]
max or= 100

file = process.argv[3]
out = if file then fs.createWriteStream(file) else process.stdout 

print = console.log
i = 0   # frames seen

ws.on 'open', -> 
  print ' leap socket opened' if file
  ws.send JSON.stringify {enableGestures: true}
  out.write '[\n'                               # opening bracket for JSON payload

ws.on 'close', (code, reason) -> 
  out.write ']\n'                               # closing bracket for JSON payload
  if file
    print ' leap socket closed'
    print " #{ws.bytesReceived} bytes received"
    print " #{max} frames written to #{file}"
    print reason if reason

ws.on 'error', (err) -> print err

ws.on 'message', (d) -> 
  if i == 0                                     # first frame of stream
    print " version #{JSON.parse(d).version}"   # print (but not write) stream version
  else if max > i
    out.write "#{d},\n"                         # include trailing comma for JSON
  else if max == i
    out.write "#{d}\n"                          # exclude trailing comma for JSON
  else
    ws.close()
  i += 1                                        # increment frame count
