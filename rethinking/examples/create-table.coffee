# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

params =
  host: 'localhost'
  port: 28015

db = r.db('test')

log = (err, result) ->
  throw err if err
  console.log result

r.connect params, (err, cx) ->

  tableName = 'authors'
  db.tableList().run cx, (err, tables) ->
    throw err if err
    if not (tableName in tables)
      db.tableCreate(tableName).run(cx, log)
    else
      db.table(tableName).count().run(cx, log)

  cx.close()
