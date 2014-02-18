Demonstrate how to extend [stream](http://nodejs.org/api/stream.html)'s 
[Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) 
base class to create streaming [mappers](http://underscorejs.org/#map) for [streamed objects](http://nodejs.org/api/stream.html#stream_object_mode).

```coffeescript
inc = new Map((d) -> d + 1)   # increment each value by one

count
  .upto(3)
  .pipe(inc)
  .pipe(log)
```

Outputs `2, 3, 4`
 
