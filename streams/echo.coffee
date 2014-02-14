###
Echo STDIN after inserting prefix

  echo "hi!" | echo.coffee
  + hi!

###
Write = require('stream').Writable
Filter = require('stream').Transform


class Echo extends Write

  _write: (data, enc, next) ->
    process.stdout.write data.toString()
    next()


class Prefix extends Filter

   constructor: (@insert=' ') -> super()

  _transform: (data, enc, next) ->
    @push @insert + data
    next()


echo = new Echo
prefix = new Prefix '+ '

process.stdin
  .pipe(prefix)
  .pipe(echo)
