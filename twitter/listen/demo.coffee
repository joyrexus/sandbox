Stream = require 'user-stream'
config = require 'config'

stream = new Stream config

stream.stream()

print = (data) -> 
  if data.friends?
    console.log data.friends.length + ' friends!'
  console.log data.text if data.text?

stream.on 'data', print
