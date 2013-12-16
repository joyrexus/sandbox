#!/usr/bin/env coffee 
fs = require 'fs'
ws = require 'websocket-stream'
readline = require 'readline'

filter = require('stream').Transform()

filter._transform = (data, encoding, done) ->
  @push data + "\n"   # append newline delimiter
  done()

toFile = fs.createWriteStream(process.argv[2] or 'sample.json.lsv')

prompt = readline.createInterface(
  input: process.stdin
  output: process.stdout
)

prompt.question 'Hit return to start recording ... ', ->
  stream = ws 'ws://localhost:6437'
  stream
    .pipe(filter)
    .pipe(toFile)
  
  prompt.question 'Hit return again to stop recording ... ', -> 
    stream.end()
    prompt.close()
