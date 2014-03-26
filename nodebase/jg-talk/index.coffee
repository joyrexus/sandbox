level = require 'level'
http = require 'http'
build = require 'browserify'
engine = require 'engine.io-stream'
multilevel = require 'multilevel'

server = http.createServer (req, res) ->
  switch req.url
    when '/' 
      res.end '<script src="bundle.js"></script>'
    when '/bundle', '/bundle.js'
      build(__dirname + '/browser.js')
        .bundle(debug: true)
        .pipe(res)
    else
      res.end '!!!'

server.listen 8000

db = level(__dirname + '/data', encoding: 'json')

# websocket
ws = engine (con) ->
  con
    .pipe(multilevel.server(db))    # duplex pattern
    .pipe(con)

ws.attach(server, '/engine')

bob = 
  name: 'Bob'
  age: 40
  sex: 'M'

db.put 'person~1', bob, (err) -> 
  db.get 'person~1', (err, p) ->
    console.log "#{p.name} is #{p.age} years old"
