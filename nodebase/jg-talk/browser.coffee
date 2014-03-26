container = require 'container-el'
multilevel = require 'multilevel'
engine = require 'engine.io-stream'

db = multilevel.client()

con = engine '/engine'

con
  .pipe(db.createRpcStream())   # duplex pattern
  .pipe(con)

window.db = db

el = (elem) -> document.createElement elem
tn = (text) -> document.createTextNode text

listen = (ch) ->
  p = el(p)                           # on new p element
  msg = ch.value.message
  if msg
    p.appendChild(tn(msg))            # append text from value
    container.appendChild p

db.createReadStream().on('data', listen)
