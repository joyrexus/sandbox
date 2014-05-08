A simple [priority queue](http://en.wikipedia.org/wiki/Priority_queue) implementation with *O*(*n* log *n*) sorting. The underlying data structure is a [binary heap](http://en.wikipedia.org/wiki/Binary_heap).


#### Usage

```python
from heap import Node, PriorityQueue

a = Node(msg="boom!", priority=1)
b = Node(msg="hi", priority=2)
c = Node(msg="ok", priority=3)
d = Node(msg="no", priority=4)

q = PriorityQueue(b, c, d)
assert q == [b, c, d]
assert q.top == b
assert q.top.msg is 'hi'

q.insert(a)
assert q == [a, b, d, c]
assert q.top is a
assert q.top.msg is 'boom!'
```
