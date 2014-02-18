###
Demonstrate how to extend stream's Transform base class 
to create reducers for streamed objects.

iter = (memo, d) -> memo + d
sum = new Reduce(iter, 0)

count
  .upto(5)
  .pipe(sum)  # 1 + 2 + 3 + 4 = 10
 
###
Read = require('stream').Readable
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
 

class Reduce extends Transform

  constructor: (@reduce, @memo) -> 
    super(objectMode: true)

  _transform: (data, enc, next) ->
    @memo = @reduce(@memo, data)
    next()

  _flush: (done) ->
    process.stdout.write @memo + "\n"
    done()
 
 
count = new Counter
iter = (memo, d) -> memo + d
sum = new Reduce(iter, 0)
 
count
  .upto(5)
  .pipe(sum)  # 1 + 2 + 3 + 4 = 10
