concat = require('stream').Transform()

concat.buffers = []
concat._transform = (buff, enc, next) ->
  @buffers.push buff
  next()

concat._flush = (done) ->
  process.stdout.write Buffer.concat(@buffers).toString()
  done()

process.stdin.pipe(concat)
