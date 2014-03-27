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
def lesser(x, y): return x if x < y else y
def greater(x, y): return x if x > y else y

assert reduce(add, [1, 2, 3, 4], 0) is 10
assert reduce(mul, [1, 2, 3, 4], 1) is 24
assert reduce(lesser, [1, 2, 3, 4], 10) is 1
assert reduce(greater, [1, 2, 3, 4], 1) is 4


# Redefining previous functions with `reduce`

sum = lambda seq: reduce(add, seq, 0)
min = lambda seq: reduce(lesser, seq, 99999999999)
max = lambda seq: reduce(greater, seq, -999999999999)
mul = lambda seq: reduce(lambda x, y: x * y, seq, 1)

assert sum([1, 2, 3, 4]) is 10
assert min([1, 2, 3, 4]) is 1
assert max([1, 2, 3, 4]) is 4
assert mul([1, 2, 3, 4]) is 24
