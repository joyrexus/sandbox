fs = require 'fs'
queue = require 'queue-async'

done = (error, results...) -> console.log r.mtime for r in results

queue(1)
    .defer(fs.stat, __dirname + "/../monads")
    .defer(fs.stat, __dirname + "/../geo")
    .await(done)


names = ['Joe', 'Jack']

getLength = (name, done) -> 
  console.log "inspecting #{name}"
  result = "#{name} is #{name.length} letters long"
  done(err=null, result)

lastly = (err, results...) -> console.log results

q = queue(1)
q.defer(getLength, n) for n in names
q.await(lastly)
