fs = require 'fs'
queue = require 'queue-async'

done = (error, results...) -> console.log r.mtime for r in results

queue(1)
  .defer(fs.stat, __dirname + "/../monads")
  .defer(fs.stat, __dirname + "/../geo")
  .await(done)



