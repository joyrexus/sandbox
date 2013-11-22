fs = require 'fs'
queue = require 'queue'

zip = (args...) ->
  sizes = (a.length for a in args)
  min = Math.min(sizes...)
  (arr[i] for arr in args) for i in [0...min]

read = (name, done) -> 
  callback = (err, data) -> 
    result = (parseInt(d) for d in data.split('\n') when d)
    done(err, result)
  fs.readFile name, 'utf8', callback
    
done = (err, results) -> 
  for pair in (zip results...)
    console.log pair.reduce (a, b) -> a + b

queue(2)
  .defer(read, 'A.TXT')
  .defer(read, 'B.TXT')
  .awaitAll(done)
