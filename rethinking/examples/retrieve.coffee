# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

params =
  host: 'localhost'
  port: 28015

db = r.db('test')

log = (err, result) ->
  throw err if err
  console.log result

summary = (err, data) ->
  throw err if err
  console.log "#{name}: #{tv_show}" for {name, tv_show} in data

r.connect params, (err, cx) ->
  authors = db.table('authors')
  authors.run cx, (err, cursor) ->
    throw err if err
    cursor.toArray summary
  cx.close()
