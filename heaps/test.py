from heap import Node, PriorityQueue

q = PriorityQueue([5, 4, 3])

def test_basic():
    assert q.min == 3
    assert q.size == 3
    assert q == [3, 5, 4]

def test_insert():
    '''
    Testing `insert` method, which inserts a new element into the queue
    and reorders the underlying MinHeap if necessary.

    '''
    q.insert(2)
    assert q.min == 2
    assert q.size == 4
    assert q == [2, 3, 4, 5]

    q.insert(1)
    assert q.min == 1
    assert q.size == 5
    assert q == [1, 2, 4, 5, 3]

def test_relations():
    '''
    Testing parent and child relations among elements.

    '''
    l = q.node(4)   # node at index 4
    r = q.node(5)   # node at index 5
    p = q.node(2)   # parent of child nodes l and r
    assert l == {'index': 4, 'value': 5}
    assert r == {'index': 5, 'value': 3}
    assert p == {'index': 2, 'value': 2}
    assert q.parent(l) == p
    assert q.parent(r) == p
    assert q.children(p) == [l, r]
    assert q.children(p) == [l, r]

def test_shift():
    '''
    Testing the `shift` method, which shifts off min 
    element and rearranges the underlying MinHeap if 
    necessary to preserve the min-heap property.
    
    '''
    assert q.shift() == 1
    assert q == [2, 3, 4, 5]

    c = q.node(4)
    assert c == {'index': 4, 'value': 5}

    p = q.parent(c)
    assert p == {'index': 2, 'value': 3}
    assert q.children(p) == [c]

def test_pop():
    '''
    Testing the `pop` method, which pops off nodes at a 
    specified index and rearranges the underlying MinHeap 
    if necessary to preserve the min-heap property.
    
    '''
    assert q == [2, 3, 4, 5]
    assert q.pop(2)
    assert q == [2, 5, 4]

def test_sort():
    '''
    Test sorting (heap sort) of priority queues.
    
    '''
    q = PriorityQueue([5, 1, 2, 4, 6, 3])
    assert q == [1, 4, 2, 5, 6, 3]
    assert q.sort() == [1, 2, 3, 4, 5, 6]

def test_nodes():
    '''
    Test node object comparability.
    
    '''
    a = Node(msg="hi", priority=1)
    b = Node(msg="ok", priority=2)
    c = Node(msg="oh", priority=2)
    assert a < b
    assert a <= b
    assert not a == b
    assert not a > b
    assert not a >= b
    assert not b > c
    assert b >= c
    assert b == c
    assert a.msg is 'hi'

    x = Node(label='x', msg="boom!", priority=1)
    assert x.label == 'x'

def test_node_heaping():
    '''
    Test priority queues with nodes as elements.
    
    '''
    a = Node(label='a', msg="boom!", priority=1)
    b = Node(label='b', msg="hi", priority=2)
    c = Node(label='c', msg="ok", priority=3)
    d = Node(label='d', msg="oh", priority=4)

    q = PriorityQueue([b, c, d])
    assert q.min == b
    assert q.min.msg == 'hi'
    assert q.min.label == 'b'
    assert q == [b, c, d]

    q.insert(a)
    assert q.min == a
    assert q.min.msg is 'boom!'
    assert q.min.label == 'a'
    assert q == [a, b, d, c]

    assert q.delete('c') == c
    assert q.sort() == [a, b, d]
    assert q.min == a
    assert q.min.label == 'a'

    min = q.shift()
    assert min == a
    assert min.label == 'a'
    assert q.sort() == [b, d]
    assert q.min == b
    assert q.min.label == 'b'

    q = PriorityQueue([d, c, b, a])
    assert [a, b, c, d] == q.sort()
    assert [a, b, c, d] == [q.shift() for x in range(q.size)]
    assert q.size == 0
    assert q == []

    from itertools import permutations
    nodes = [a, b, c, d]
    for perm in permutations(nodes):
        q = PriorityQueue(perm)
        assert [a, b, c, d] == q.sort()
        assert [a, b, c, d] == [q.shift() for x in range(q.size)]
        assert q.size == 0
        assert q == []
