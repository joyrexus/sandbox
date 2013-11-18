oauth = require 'oauth'
{EventEmitter} = require 'events'


class Listener extends EventEmitter
  
  urls:
    stream: 'https://userstream.twitter.com/1.1/user.json'
    request: 'https://api.twitter.com/oauth/request_token'
    access: 'https://api.twitter.com/oauth/access_token'

  constructor: (@args) ->
    @chunkSize = 0    # length of next data chunk for buffer
    @buffer = ''
    oauthArgs = [
      @urls.request,
      @urls.access,
      @args.consumerKey,
      @args.consumerSecret,
      '1.0', 
      null, 
      'HMAC-SHA1', 
      null,
      Accept: '*/*'
      Connection: 'close'
      'User-Agent': 'listen.js'
    ]
    @oauth = new oauth.OAuth oauthArgs...

  start: (args=with:'user') ->
    args = {} if typeof args != 'object'
    args.stall_warnings = 'true'
    req = @oauth.post(
      @urls.stream,
      @args.accessToken,
      @args.accessTokenSecret,
      args 
    )
    
    @destroy = -> req.abort()
    stream = @
    req.on 'response', (res) ->
      if res.statusCode > 200
        stream.emit 'error', {type: 'response', data: {code: res.statusCode}}
      else
        stream.emit 'connected'
        res.setEncoding 'utf8'
        res.on 'data', (data) -> stream.parse data
        res.on 'error', (err) -> stream.emit('close', err)
        res.on 'end', -> stream.emit('close', 'socket end')
        res.on 'close', -> req.abort()
    
    req.on 'error', (err) -> stream.emit('error', {type: 'request', data: err})
    req.end()

  # see https://dev.twitter.com/docs/streaming-apis/processing
  parse: (data) ->
    for t in data.split('\r\n') when t
      try
        @emit 'data', JSON.parse(t)
      catch err
        @emit 'garbage', t


module.exports = Listener
