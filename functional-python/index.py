'''
Working through the PyToolz Tutorial for PyData 2013 - NYC
See `https://gist.github.com/joyrexus/9792547`

'''
def sum(seq):
    result = 0
    for i in seq:
        result += i
    return result


def min(seq):
    result = seq[0]
    for i in seq[1:]:
        if result > i: result = i
    return result


def max(seq):
    result = seq[0]
    for i in seq[1:]:
        if result < i: result = i
    return result


def product(seq):
    result = 1
    for i in seq:
        result *= i
    return result


assert sum([1, 2, 3, 4]) is 10
assert min([1, 2, 3, 4]) is 1
assert max([1, 2, 3, 4]) is 4
assert product([2, 3, 10]) is 60


def reduce(f, seq, init):
    result = init
    for i in seq:
        result = f(result, i)
    return result


def add(x, y): return x + y
def mul(x, y): return x * y
def lt(x, y): return x if x < y else y
def gt(x, y): return x if x > y else y

assert reduce(add, [1, 2, 3, 4], 0) is 10
assert reduce(mul, [1, 2, 3, 4], 1) is 24
assert reduce(lt, [1, 2, 3, 4], 10) is 1
assert reduce(gt, [1, 2, 3, 4], 1) is 4


# Redefining previous functions with `reduce`

sum = lambda seq: reduce(add, seq, 0)
min = lambda seq: reduce(lt, seq, 99999999999)
max = lambda seq: reduce(gt, seq, -999999999999)
mul = lambda seq: reduce(lambda x, y: x * y, seq, 1)

assert sum([1, 2, 3, 4]) is 10
assert min([1, 2, 3, 4]) is 1
assert max([1, 2, 3, 4]) is 4
assert mul([1, 2, 3, 4]) is 24


even = lambda x: x % 2 is 0
odd  = lambda x: not even(x)
data = [1, 2, 3, 4]

assert filter(even, data) == [2, 4]
assert filter(odd, data) == [1, 3]

def groupby(f, seq):
    result = {}
    for value in seq: 
        key = f(value)
        if key in result:
            result[key].append(value) 
        else: 
            result[key] = [value]
    return result

data = [1, 2, 3, 4]
assert groupby(even, data) == { False: [1, 3], True: [2, 4] }
assert groupby(odd, data)  == { True: [1, 3], False: [2, 4] }

# alternatively, leveraging defaultdict ...

from collections import defaultdict

def groupby(f, seq):
    d = defaultdict(list)
    for i in seq: d[f(i)].append(i)
    return dict(d)

data = [1, 2, 3, 4]
assert groupby(even, data) == { False: [1, 3], True: [2, 4] }
assert groupby(odd, data)  == { True: [1, 3], False: [2, 4] }

names = ['Alice', 'Bob', 'Charlie', 'Dan', 'Edith']
expected = {3: ['Bob', 'Dan'], 5: ['Alice', 'Edith'], 7: ['Charlie']}
assert groupby(len, names) == expected


def countby(f, seq):
    result = {}
    for value in seq: 
        key = f(value)
        if key in result:
            result[key] += 1
        else: 
            result[key] = 1
    return result

# alternatively, leveraging defaultdict ...

def countby(f, seq):
    d = defaultdict(int)
    for i in seq: d[f(i)] += 1
    return dict(d)

assert countby(len, ['cat', 'mouse', 'dog']) == {3: 2, 5: 1}
assert countby(even, [1, 2, 3]) == {True: 1, False: 2}
