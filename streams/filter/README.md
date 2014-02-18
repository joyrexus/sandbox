Demonstrate how to extend [stream](http://nodejs.org/api/stream.html)'s 
[Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) 
base class to create streaming [filters](http://underscorejs.org/#filter) for [streamed objects](http://nodejs.org/api/stream.html#stream_object_mode).

We observe each object in the stream, pushing along any values meeting
the filter's predicate condition. In other words, we're filtering out any
values that do not meet the predicate condition.

```coffeescript
odd = (d) -> d % 2
evens = new Filter((d) -> not odd(d))

count
  .upto(11)
  .pipe(evens)
  .pipe(log)
 
```

Output:

    2
    4
    6
    8
    10
