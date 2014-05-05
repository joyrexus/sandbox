###
through2-* demo

* create a stream of monotonically increasing integers
* filter out the even integers
* show the differences between pairwise odd numbers in stream

###
spigot = require "stream-spigot"
filter = require "through2-filter"
map = require "through2-map"

obj =
  objectMode: true

randint = (max) -> Math.floor(Math.random() * (max + 1))

nums = (x + randint(1) for x in [0..20])    # [ 0, 1, 3, 3, 5, ... 19, 19, 21 ]

source = spigot(obj, nums)

odds = filter(obj, (x) -> x % 2)            # filter out evens

deltas = map obj, (x) ->
    d = x - (@prev or 0)                    # diff between x and prev
    result = "#{x} - #{@prev or 0} = #{d}"  # curr - prev = delta
    @prev = x
    result

console.log('B - A = DELTA')
source
  .pipe(odds)
  .pipe(deltas)
  .on('data', (d) -> console.log d)
