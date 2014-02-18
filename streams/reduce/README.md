Demonstrate how to extend [stream](http://nodejs.org/api/stream.html)'s 
[Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) 
base class to create [reducers](http://underscorejs.org/#reduce) for [streamed objects](http://nodejs.org/api/stream.html#stream_object_mode).

```coffeescript
count = new Counter
iter = (memo, d) -> memo + d
sum = new Reduce(iter, 0)
 
count
  .upto(5)
  .pipe(sum)  # 1 + 2 + 3 + 4 = 10

```
