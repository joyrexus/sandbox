# returns an iterator that takes a partition object `part` for its
# initial value / previous value / accumulator.  The returned
# partition should be partitioned at `p`.
partitionAt = (p) ->
  (part, x) ->
    if x > p then part.gt.push(x) else part.lt.push(x)
    part

# initial partition object
init = ->
    lt: []
    gt: []

qsort = ([x, xs...]) ->
  return [] unless x?
  part = xs.reduce(partitionAt(x), init())
  qsort(part.lt)
    .concat(x)
    .concat(qsort(part.gt))


# testing
{ok, deepEqual} = require 'assert'
eq = deepEqual

input    = [3, 2, 1, 3, 4, 6, 5]
expected = [1, 2, 3, 3, 4, 5, 6]

eq qsort(input), expected
