queue = require 'queue-async'

names = ['Joe', 'Jack']

getLength = (name, done) -> 
  console.log "inspecting #{name}"
  result = "#{name} is #{name.length} letters long"
  done(err=null, result)

done = (err, results) -> console.log results

q = queue()
q.defer(getLength, n) for n in names
q.awaitAll(done)


