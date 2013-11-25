Listener = require './listen'

listen = new Listener(require 'keys')
listen.start()
listen.on 'data', (tweet) -> console.log tweet.text if tweet.text?
