# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

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
  
params =
  host: 'localhost'
  port: 28015
  db: 'test'

'''
r.connect params, (err, cx) ->
  r.table('authors')
    .get('fbf82665-be5b-4c3e-80c3-89773df77dc6')
    .run(cx, log)
  cx.close()
'''

connect = r.connect

r.connect = (config) ->
  (callback) -> connect.call(r, config, callback)

query = (err, cx) ->
  r.table('authors')
    .get('fbf82665-be5b-4c3e-80c3-89773df77dc6')
    .run(cx, log)
  cx.close()

run = r.connect(params) 

run query
