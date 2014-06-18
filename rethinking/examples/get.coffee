# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

params =
  host: 'localhost'
  port: 28015

db = r.db('test')

log = (err, result, pretty=true) ->
  throw err if err
  if pretty
    console.log JSON.stringify(result, null, 2)
  else
    console.log result
  
r.connect params, (err, cx) ->
  db.table('authors')
    .get('fbf82665-be5b-4c3e-80c3-89773df77dc6')
    .run(cx, log)
  cx.close()
