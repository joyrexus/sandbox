from collections import deque


class MinHeap:
    '''
    Implementation of a binary heap where each node is less than
    or equal to its children.  We use it as the basis for our
    priority queue, defined below.

    '''
    def __init__(self, *args):
        self.heap = deque([None] + list(args))
        self.size = len(args) 
        max = (self.size // 2) + 1  # indices > max are leaf nodes
        for i in range(1, max):     # iterate over parent node indices
            self.percDown(i)

    def __str__(self):
        return str(list(self.heap)[1:])

    def __eq__(self, other):
        return list(self.heap)[1:] == other

    def node(self, i):
        '''
        Return {index, value} of node at index i.

        '''
        return dict(index=i, value=self.heap[i])

    def parent(self, child):
        '''
        Return {index, value} for parent of child node.

        '''
        i = child['index']
        p = i // 2
        return self.node(p)

    def children(self, parent):
        '''
        Return list of child nodes for parent.

        '''
        p = parent['index']
        l, r = (p * 2), (p * 2 + 1)     # indices of left and right child nodes
        if r > self.size:
            return [self.node(l)]
        else:
            return [self.node(l), self.node(r)]

    def swap(self, i, j):
        '''
        Swap the values of nodes at index i and j.

        '''
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def percUp(self, i):
        '''
        Percolate upward the value at index i to restore heap property.

        '''
        p = i // 2                  # index of parent node
        while p: 
            if self.heap[i] < self.heap[p]:
                self.swap(i, p)     # swap with parent
            i = p                   # new index after swapping with parent
            p = p // 2              # new parent index

    def percDown(self, i):
        '''
        Percolate downward the value at index i to restore heap property.

        '''
        c = i * 2
        while c <= self.size:
            c = self.min_child(i)
            if self.heap[i] > self.heap[c]:
                self.swap(i, c)
            i = c                   # new index after swapping with child
            c = c * 2               # new child index

    def min_child(self, i):
        '''
        Return index of minimum child node.

        '''
        l, r = (i * 2), (i * 2 + 1)     # indices of left and right child nodes
        if r > self.size:
            return l
        else:
            return l if self.heap[l] < self.heap[r] else r


class PriorityQueue(MinHeap):
    '''
    Queue of elements ordered by priority.

    '''
    @property
    def top(self):
        '''
        Return top/minimum element in heap.

        '''
        return self.heap[1]

    def shift(self):
        '''
        Shift off top/minimum element in heap.

        '''
        if self.size == 0: return None
        v = self.heap[1]                # return top value
        self.heap[1] = self.heap[-1]    # move last element to top
        self.heap.pop()                 # delete last element
        self.size -= 1                  # decrement size
        self.percDown(1)                # percolate top value down if necessary
        return v

    def insert(self, v):
        '''
        Append the value v to the heap and percolate up
        if necessary to maintain heap property.

        '''
        self.heap.append(v)
        self.size += 1
        self.percUp(self.size)

    def sort(self):
        '''
        Return sorted array of elements in current heap.

        '''
        sorted = [self.shift() for i in range(self.size)]
        self.heap = deque([None] + sorted)
        return sorted


class Node(dict):
    '''
    Nodes are just dicts comparable by their `priority` key.

    '''
    def __cmp__(self, other):
        '''
        should return a negative integer if self < other, zero if
        self == other, and positive if self > other.

        '''
        if self['priority'] < other['priority']:
            return -1
        elif self['priority'] == other['priority']:
            return 0
        else:
            return 1

    def __eq__(self, other):
        return self['priority'] == other['priority']

    def __getattr__(self, attr):
        return self.get(attr, None)
