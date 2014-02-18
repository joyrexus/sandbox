###
Demonstrate how to extend each of the stream base classes.
 
###
Read = require('stream').Readable
Write = require('stream').Writable
Transform = require('stream').Transform
 
 
class Counter extends Read
    
  constructor: (@max) -> 
    @i = 0
    super(objectMode: true)
 
  upto: (n) -> 
    @max = n
    @
 
  _read: ->
    @i += 1
    if @max and @i >= @max
      @push null 
    else
      @push @i
 
 
class Evens extends Transform

  constructor: -> super(objectMode: true)

  odd: (i) -> i % 2
 
  _transform: (data, enc, next) ->
    @push data if not @odd(data)
    next()
 
 
class Log extends Write
 
  constructor: (@insert=' ') -> 
    super(objectMode: true)
 
  _write: (data, enc, next) ->
    process.stdout.write data + "\n"
    next()
 
 
# create instances of each stream
 
count = new Counter
evens = new Evens
log = new Log
 
 
# call the pipeline
 
count
  .upto(11)
  .pipe(evens)
  .pipe(log)

###

  2
  4
  6
  8
  10

### 
