###
Demonstrate how to extend stream's Transform base class 
to create a mapper for streamed objects.

inc = new Map((d) -> d + 1)   # increment each value by one

count
  .upto(3)
  .pipe(inc)
  .pipe(log)

Output: 2, 3, 4
 
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
 

class Map extends Transform

  constructor: (@transform) -> 
    super(objectMode: true)

  _transform: (data, enc, next) ->
    @push @transform(data)
    next()

 
class Log extends Write
 
  constructor: -> super(objectMode: true)
 
  _write: (data, enc, next) ->
    process.stdout.write data + "\n"
    next()
 
 
# create instances of each stream
 
count = new Counter
inc = new Map((d) -> d + 1)
log = new Log
 

count
  .upto(5)
  .pipe(inc)
  .pipe(log)
 
###
should produce the following output:

  2
  3
  4
  5

### 
