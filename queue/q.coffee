fs = require 'fs'
queue = require 'queue-async'

'''
render = (error, a, b) -> console.log a, b

queue()
    .defer(fs.stat, __dirname + "/../mine")
    .defer(fs.stat, __dirname + "/../misc")
    .await(render)
'''

files = ['misc', 'mine']

bar = (f) -> f.length

foo = (a, b, callback, f, final) -> 
  final null, callback(f)


q = queue(1)
q.defer(foo, 1, 2, bar, f) for f in files
q.awaitAll (err, results) -> console.log results
