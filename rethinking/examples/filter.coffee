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

summary = (err, data) ->
  throw err if err
  console.log "#{name}: #{tv_show}" for {name, tv_show} in data

byName = (name) -> r.row('name').eq(name)
byMinPosts = (min) -> r.row('posts').count().gt(min)
byMaxPosts = (max) -> r.row('posts').count().lt(max)
  
r.connect params, (err, cx) ->
  db.table('authors')
    .filter(byMinPosts 2)         
    .filter(byName "William Adama")
    .run cx, (err, cursor) ->
      throw err if err
      cursor.toArray summary
  cx.close()
