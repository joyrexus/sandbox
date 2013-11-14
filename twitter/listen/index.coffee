oauth = require 'oauth'
{EventEmitter} = require 'events'


class Listener extends EventEmitter
  
  streamUrl: 'https://userstream.twitter.com/1.1/user.json'
  requestUrl: 'https://api.twitter.com/oauth/request_token'
  accessUrl: 'https://api.twitter.com/oauth/access_token'

  constructor: (@args) ->
    oauthArgs = [
      @requestUrl,
      @accessUrl,
      @args.consumer_key,
      @args.consumer_secret,
      '1.0', 
      null, 
      'HMAC-SHA1', 
      null,
      Accept: '*/*'
      Connection: 'close'
      'User-Agent': 'user-stream.js' # 'listen.js'
    ]
    @oauth = new oauth.OAuth oauthArgs...

  start: (args) ->
    args = {} if typeof args != 'object'
    args.delimited = 'length'
    args.stall_warnings = 'true'
    req = @oauth.post(
      @streamUrl,
      @args.access_token_key,
      @args.access_token_secret,
      args, 
      null
    )
    
    @destroy = -> req.abort()

    stream = @

    req.on 'response', (res) ->
      if res.statusCode > 200
        stream.emit 'error', {type: 'response', data: {code: res.statusCode}}
      else
        buffer = ''
        next = 0
        end = '\r\n'
        stream.emit 'connected'
        res.setEncoding 'utf8'
        res.on 'error', (err) -> stream.emit('close', err)
        res.on 'end', -> stream.emit('close', 'socket end')
        res.on 'close', -> req.abort()
        res.on 'data', (data) ->
          if data is end
            stream.emit 'heartbeat'
            return
          if typeof buffer is 'string'
            i = data.indexOf(end)
            next = parseInt(data.slice(0, i))
            data = data.slice(i + end.length)
          if buffer.length != next
            buffer += data.slice(0, data.indexOf(end))  # remove end
            parsed = false
            try
              buffer = JSON.parse(buffer)
              parsed = true
            catch err
              stream.emit 'garbage', buffer
            if parsed
              stream.emit 'data', buffer
            buffer = ''                                 # empty
          else
            buffer += data                              # append
    
    req.on 'error', (err) -> stream.emit('error', {type: 'req', data: err})

    req.end()
           

module.exports = Listener
