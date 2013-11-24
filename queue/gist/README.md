[Queue.js](https://github.com/mbostock/queue/blob/master/README.md#queuejs) is
a minimalist async helper library by [Mike Bostock](https://1.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?d=https%3A%2F%2Fidenticons.github.com%2Fbccfec69c12f4875927673c36fb63cf4.png&r=x&s=400).

Here's a quick demonstration of how to use it.  We're just going to load two
files and sum their corresponding lines. (You might use nested callbacks for 
this, but that gets hairy if you're doing something along these lines with
*more* than two files.)

---

Suppose we have two files, `A.TXT` and `B.TXT`, each containing a list of numbers, one number per line.  Our task is to sum the corresponding lines of each file.

```
  A  B  SUM

  1  2  3
  2  3  5
  3  4  7
  4  5  9
```    

We're going to read the files [in parallel](https://github.com/mbostock/queue/blob/master/README.md#queueparallelism) and execute a `done` function once
they're done reading in order to do something with both files, viz., sum their
corresponding lines:

```coffeescript

queue(2)
  .defer(read, 'A.TXT')
  .defer(read, 'B.TXT')
  .awaitAll(done)

```

---

## demo.coffee

Alright, let's walk through [demo.coffee](https://gist.github.com/joyrexus/7603860#file-demo-coffee).

Load our requirements:

    fs = require 'fs'
    queue = require 'queue'
    {deepEqual} = require 'assert'

Our zip method for [zipping](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_zip) arrays.  The `args` being passed should be the arrays to be zipped together.

    zip = (args...) ->
      sizes = (a.length for a in args)
      min = Math.min(sizes...)
      (arr[i] for arr in args) for i in [0...min]

Our read method for reading in a file:

    read = (name, done) -> 
      callback = (err, data) -> 
        result = (parseInt(d) for d in data.split('\n') when d)
        done(err, result)
      fs.readFile name, 'utf8', callback

Notice how `read` takes two arguments: the `name` of file to read and a `done` callback passed by `queue`.  We can pass to `done` whatever `result` we want here.  Since we're using [awaitAll](https://github.com/mbostock/queue/blob/master/README.md#queueawaitallcallback), the result gets added to the set of results colleted from each deferred function.

Now for our concluding callback, which will get executed after each deferred function is done.  It gets passed the accumulated results collected from each deferred function.
        
    done = (err, results) -> 
      sums = ((pair.reduce (a, b) -> a + b) for pair in (zip results...))
      expected = [3, 5, 7, 9]
      deepEqual sums, expected

Finally ...

    queue(2)
      .defer(read, 'A.TXT')
      .defer(read, 'B.TXT')
      .awaitAll(done)

---

## See also

Mike's ...

* [demo](http://bl.ocks.org/mbostock/1696080)

* [tests](https://github.com/mbostock/queue/blob/master/test/queue-test.js)

* [comment](http://grokbase.com/t/gg/d3-js/13412932vz/queue-js#20130401gzfmvktwsrwry5ozq5xr36klnu)

* [example](http://bl.ocks.org/mbostock/7606141) of an infinite queue

[Analyzing queue.js](http://bsumm.net/2013/03/31/analyzing-mbostocks-queue-js.html)
