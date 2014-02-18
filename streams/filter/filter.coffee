###
Demonstrate how to extend stream's Transform base class 
to create filters for streamed objects.

evens = new Filter((d) -> not(d % 2))

count
  .upto(11)
  .pipe(evens)
  .pipe(log)
 
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
 

class Filter extends Transform

  constructor: (@condition) -> 
    super(objectMode: true)

  _transform: (data, enc, next) ->
    @push data if @condition(data)
    next()

 
class Log extends Write
 
  constructor: (@insert=' ') -> 
    super(objectMode: true)
 
  _write: (data, enc, next) ->
    process.stdout.write data + "\n"
    next()
 
 
# create instances of each stream
 
count = new Counter
log = new Log
 
odd = (d) -> d % 2
evens = new Filter((d) -> not odd(d))

count
  .upto(11)
  .pipe(evens)
  .pipe(log)
 
###
should produce the following output:

  2
  4
  6
  8
  10

### 
