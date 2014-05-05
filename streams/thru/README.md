[Another](http://bl.ocks.org/joyrexus/11153491) quick demo of [through2-map](https://github.com/brycebaril/through2-map) and [through2-filter](https://github.com/brycebaril/through2-filter).


#### Objective

* create a stream of monotonically increasing integers
* filter out the even integers
* show the differences between pairwise odd numbers in stream


#### Sample output

    B - A = DELTA
    1 - 0 = 1
    5 - 1 = 4
    5 - 5 = 0
    7 - 5 = 2
    9 - 7 = 2
    11 - 9 = 2
    13 - 11 = 2
    13 - 13 = 0
    15 - 13 = 2
    17 - 15 = 2
    21 - 17 = 4
