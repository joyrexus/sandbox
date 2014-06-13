# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

params =
  host: 'localhost'
  port: 28015

tv = r.db('test').table('tv_shows')

log = (err, result) ->
  throw err if err
  console.log result

lost =
  name: 'Lost'
  episodes: 55

r.connect params, (err, cx) ->

  tv.insert(lost)
    .run(cx, log)

  tv.count()
    .run(cx, log)

  cx.close()
