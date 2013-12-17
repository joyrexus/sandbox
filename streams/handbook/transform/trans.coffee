filter = require('stream').Transform()

filter._transform = (data, enc, done) ->
  @push(data)
  done()

process.stdin
  .pipe(filter)
  .pipe(process.stdout)

# Some programs like `head` send an error on stdout
# when they don't want any more data
process.stdout.on('error', process.exit)
