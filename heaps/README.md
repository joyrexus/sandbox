A simple [priority queue](http://en.wikipedia.org/wiki/Priority_queue) implementation with *O*(*n* log *n*) sorting. The underlying data structure is a [binary heap](http://en.wikipedia.org/wiki/Binary_heap).

A priority queue of elements/nodes ordered by comparative value.

This implementation uses a binary heap where each node is less 
than or equal to its children.  Nodes can be anything as long 
as they're comparable.


#### Usage

```python
from heap import PriorityQueue

q = PriorityQueue([3, 1, 2, 4])

assert q.min == 1                 # get  minimum element
assert q.sort() == [1, 2, 3, 4]   # get sorted list of elements

x = q.shift()                     # shift off minimum element
assert x == 1
assert q.sort() == [2, 3, 4]
```

Alternatively, you can populate your priority queue with **Node** instances:

```python
a = Node(label='a', priority=1)
```

**Nodes** are just python **dicts** comparable by their `priority` key.

```python
from heap import Node, PriorityQueue

a = Node(label='a', msg="boom!", priority=1)
b = Node(label='b', msg="hi", priority=2)
c = Node(label='c', msg="ok", priority=3)
d = Node(label='d', msg="oh", priority=4)

assert a < b < c < d
```

If you initialize your queue with **Node** objects containing
`node.label` attributes, you can then delete nodes by label:

```python
q = PriorityQueue([b, c, d])

assert q.min == b
assert q.min.msg == 'hi'
assert q.min.label == 'b'
assert q == [b, c, d]

q.insert(a)
assert q.min == a
assert q.min.msg is 'boom!'
assert q.min.label is 'a'
assert q.sort() == [a, b, c, d]   # get sorted list of elements

min = q.shift()                   # shift off minimum element
assert min == a
assert min.label == 'a'
assert q.sort() == [b, c, d]

assert q.delete('c') == c         # delete a node by `node.label`
assert q.sort() == [b, d]
assert q.min == b
```


#### See Also

* [priority queues with binary heaps](http://interactivepython.org/runestone/static/pythonds/Trees/heap.html) - nice tutorial and walkthrough of a python implementation

* [pqdict](https://github.com/nvictus/priority-queue-dictionary) - an indexed priority queue with a dictionary interface
