fs = require 'fs'
queue = require 'queue-async'

count = 0
duration = 2000
parallelism = 4

q = queue(parallelism + 1)

inc = (done) ->
  console.log count += 1
  setTimeout (-> done null), duration
  setTimeout repeat, duration

repeat = -> q.defer(inc)

q.defer(->)
[0..10].forEach(repeat)
