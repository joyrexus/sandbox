# See http://rethinkdb.com/docs/guide/javascript/

r = require 'rethinkdb'

params =
  host: 'localhost'
  port: 28015

db = r.db('test')

log = (err, result) ->
  throw err if err
  console.log result

data = [
  name: "William Adama"
  tv_show: "Battlestar Galactica"
  posts: [
    {title: "Decommissioning speech", content: "The Cylon War is long over..."},
    {title: "We are at war", content: "Moments ago, this ship received word..."},
    {title: "The new Earth", content: "The discoveries of the past few days..."}
  ]
 ,
  name: "Laura Roslin", tv_show: "Battlestar Galactica",
  posts: [
    {title: "The oath of office", content: "I, Laura Roslin, ..."},
    {title: "They look like us", content: "The Cylons have the ability..."}
  ]
 ,
  name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
  posts: [
    {title: "Civil rights", content: "There are some words I've known since..."}
  ]
]

r.connect params, (err, cx) ->
  authors = db.table('authors')
  authors.insert(data).run(cx, (err, result) ->
    authors.count().run(cx, log)
  )
  cx.close()
