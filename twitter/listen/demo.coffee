Listener = require './index'

listen = new Listener(require 'private')
listen.start()
listen.on 'data', (tweet) -> 
  console.log tweet.text if tweet.text?
