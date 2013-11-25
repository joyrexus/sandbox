fs = require 'fs'
queue = require 'queue-async'

done = (error, results...) -> console.log r.size for r in results

queue()
  .defer(fs.stat, __dirname + "/..")
  .defer(fs.stat, __dirname + "/../..")
  .await(done)
