A simple [priority queue](http://en.wikipedia.org/wiki/Priority_queue) implementation with *O*(*n* log *n*) sorting. The underlying data structure is a [binary heap](http://en.wikipedia.org/wiki/Binary_heap).


#### Usage

Nodes are just python **dicts** comparable by their `priority` key:

```python
from heap import Node, PriorityQueue

a = Node(label='a', msg="boom!", priority=1)
b = Node(label='b', msg="hi", priority=2)
c = Node(label='c', msg="ok", priority=3)
d = Node(label='d', msg="oh", priority=4)

assert a < b < c < d
```

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
