class Status

  constructor: (@max=0, @count=0) ->

  feed: (x) ->
    @count += 1
    @max = x if @max < x

random = (min, max) -> Math.random() * (max - min) + min

status = new Status()

observe = (x) ->
  status.feed x
  console.log status.count, status.max

observe(1)
observe(2)
observe(3)
observe(2)
observe(1)
observe(4)

