class Status

  constructor: ->
    @count = 0
    @sum = 0    # rolling sum
    @sos = 0    # rolling sum of squares
    @max = 0
    @min = null
    @localAvg = null
    @localMax = 0
    @weightedMax = 0

  amortize: (x) -> 
    x + @count

  mean: -> @sum/@count if @count

  stddev: -> 
    avg = @mean()
    Math.sqrt(@sos/@count - avg*avg)

  push: (x) ->
    @count += 1
    @sum += x 
    @sos += x * x 
    @min ?= x
    @max = x if @max < x
    @min = x if @min > x
    @localAvg ?= @mean()
    @localAvg = (@localAvg * .2 + x) / (.2 + 1) if @localAvg
    if @weightedMax < @amortize(x)
      @localMax = x 
      @weightedMax = @amortize(x)

random = (min, max) -> Math.random() * (max - min) + min

status = new Status()

status.amortize = (x) -> x + (2 * @count)

observe = (x) ->
  status.push x
  console.log x, status.max, status.localMax, status.mean(), status.stddev()



observe(i) for i in [1, 2, 3, 2, 1, 4, 1, 1, 1, 1, 1, 2]

