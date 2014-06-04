First pass at a simple (i.e., non-optimal) quicksort function implemented in
coffeescript.

Notably, does not sort in-place and is less than optimal in runtime because of
its choice of pivot element (viz., the first element).

---

A very naive version of quicksort might look as follows:

```coffee
qsort = ([p, rest...]) ->
  return [] unless x?
  lt = (x for x in rest when x <= p)
  gt = (x for x in rest when x > p)
  qsort(lt)
    .concat(x)
    .concat(qsort(gt))
```

This is nice and compact, but we're iterating over the input array (minus its first element `p`) twice.  So, in lieu of the double list comprehensions, we're going to `reduce` the array to a partition object (`part`) with less-than (`lt`) and greater-than (`gt`) properties.

---
 
We first create a function for creating a partition iterator.  We'll use this
to reduce the input to a partition object.  This contains the items less than
or equal to `p` (viz. `part.lt`) and those greater than `p` (`part.gt`). The
resulting partition object will have the following form:

```coffee
part =
  lt: [ input items <= p ]
  gt: [ input items > p  ]
```

The following returns an iterator that takes a partition object `part` for its initial value / previous value / accumulator.  The returned partition should be partitioned at `p`.

```coffee
partitionAt = (p) ->
  (part, x) ->
    if x > p then part.gt.push(x) else part.lt.push(x)
    part
```

Initial partition object:

```coffee
init = ->
    lt: []
    gt: []
```

Our simple quicksort routine:

```coffee
qsort = ([x, xs...]) ->
  return [] unless x?
  part = xs.reduce(partitionAt(x), init())
  qsort(part.lt)
    .concat(x)
    .concat(qsort(part.gt))
```

Testing:

```coffee
{ok, deepEqual} = require 'assert'
eq = deepEqual

input    = [3, 2, 1, 3, 4, 6, 5]
expected = [1, 2, 3, 3, 4, 5, 6]

eq qsort(input), expected
```


