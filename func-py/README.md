# `groupby` and `countby` for python

Python has the standard methods for applying functions over iterables, viz. `map`, `filter`, and `reduce`.

For example, we can use `filter` to filter some numbers by some criterion:

```python
even = lambda x: x % 2 is 0
odd  = lambda x: not even(x)
data = [1, 2, 3, 4]

assert filter(even, data) == [2, 4]
assert filter(odd, data) == [1, 3]
```

These built-in methods are supplemented by the collection methods in [itertools](http://docs.python.org/3.4/library/itertools.html) and [itertoolz](http://toolz.readthedocs.org/en/latest/api.html#itertoolz).

What follows is just a quick demonstration of how you might implement and use two iteration methods commonly used for data summarization: [groupby](http://toolz.readthedocs.org/en/latest/api.html#toolz.itertoolz.core.groupby) and [countby](http://toolz.readthedocs.org/en/latest/api.html#toolz.itertoolz.recipes.countby).


## groupby

Group a collection by a key function.

```python
def groupby(f, seq):
    result = {}
    for value in seq: 
        key = f(value)
        if key in result:
            result[key].append(value) 
        else: 
            result[key] = [value]
    return result
```

Alternatively, leveraging `defaultdict` ...

```python
from collections import defaultdict

def groupby(f, seq):
    d = defaultdict(list)
    for i in seq: d[f(i)].append(i)
    return dict(d)
```

```python
data = [1, 2, 3, 4]
assert groupby(even, data) == { False: [1, 3], True: [2, 4] }
assert groupby(odd, data)  == { True: [1, 3], False: [2, 4] }
```

```python
names = ['Alice', 'Bob', 'Charlie', 'Dan', 'Edith']
expected = {3: ['Bob', 'Dan'], 5: ['Alice', 'Edith'], 7: ['Charlie']}
assert groupby(len, names) == expected
```


## countby

Count elements of a collection by a key function.

```python
def countby(f, seq):
    result = {}
    for value in seq: 
        key = f(value)
        if key in result:
            result[key] += 1
        else: 
            result[key] = 1
    return result
```

Alternatively, leveraging `defaultdict` ...

```python
def countby(f, seq):
    d = defaultdict(int)
    for i in seq: d[f(i)] += 1
    return dict(d)
```

```python
assert countby(len, ['cat', 'mouse', 'dog']) == {3: 2, 5: 1}
assert countby(even, [1, 2, 3]) == {True: 1, False: 2}
```


---


## See also

* [coffeescript implementations](https://gist.github.com/joyrexus/9810424)

* [pytoolz tutorial](https://gist.github.com/joyrexus/9792547)
