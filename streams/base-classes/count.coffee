###
Demonstrate how to extend each of the stream base classes.

###
Read = require('stream').Readable
Write = require('stream').Writable
Filter = require('stream').Transform


class Counter extends Read
    
  constructor: (@max) -> 
    @i = 0
    super()

  upto: (n) -> 
    @max = n
    @

  _read: ->
    @i += 1
    if @max and @i > @max
      @push null 
    else
      @push (@i + '').toString()


class Prefix extends Filter

  constructor: (@insert=' ') -> super()

  _transform: (data, enc, next) ->
    @push @insert + data
    next()


class Log extends Write

  constructor: (@insert=' ') -> super()

  _write: (data, enc, next) ->
    process.stdout.write data + "\n"
    next()


# create instances of each stream

count = new Counter
prefix = new Prefix '+ '
log = new Log


# call the pipeline

count
  .upto(5)
  .pipe(prefix)
  .pipe(log)

###
results in the following output:
+ 1
+ 2
+ 3
+ 4
+ 5
### 
