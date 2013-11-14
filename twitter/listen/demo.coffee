Listener = require './index'
config = require 'private'
listen = new Listener config

listen.start({with: 'user'})

print = (data) -> 
  if data.friends?
    console.log data.friends.length + ' friends!'
  console.log data.text if data.text?

listen.on 'data', print

