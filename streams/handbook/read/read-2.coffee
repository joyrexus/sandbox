rs = require('stream').Readable()

n = 0
rs._read = ->
  if n > 10
    rs.push(null) 
    return
  beeper = -> 
    rs.push 'beep\n'
    n += 1
  setTimeout beeper, 500

rs.pipe process.stdout 

process.on 'exit', ->
  console.error('\n_read() called ' + n + ' times')
process.stdout.on 'error', process.exit
