# Leap Stream Utilities

* `stream` - print the Leap's websocket stream to stdout
* `record` - record a sample of the Leap's websocket stream to a file
* `filter` - filter and transform each frame emitted from a sample or stream


## stream 

Print the Leap's websocket stream to stdout. For example, we can redirect the
stream to a file.

    stream.coffee > sample.ldj

Use `CTRL-C` (`control` key + `c` key) to terminate the redirect.

The websocket stream emits a JSON-encoded "frame" of motion data.  The
`stream` utility appends a line return character to each JSON frame, resulting
in a motion sample file of [line-delimited JSON](http://en.wikipedia.org/wiki/Line_Delimited_JSON).  To indicate the nature of the formatting, you'll want to use either `.ldj` or `.ldjson` as your file extension.


## record

Record a sample of the Leap's websocket stream.  Similar to the `stream`
utility, except we get prompted to start and stop our recording:

    $ record.coffee sample.ldj
    Hit return to start recording ...

After hitting return:

    Hit return again to stop recording ...


## filter

Use [ldj-pipe](https://github.com/joyrexus/ldj-pipe#ldj-pipe) to [filter](http://en.wikipedia.org/wiki/Filter_%28Unix%29) your Leap sample or stream.

For example, suppose you've got a sample of line-delimited JSON containing
motion data from the Leap's websocket stream and you want to extract
a few attributes from each frame.  We can define a filter to extract the
attributes of interest in just a few lines:

```coffeescript
#!/usr/bin/env coffee 
pipe = require 'ldj-pipe'

filter = (d) ->
  id:        d.id
  hands:     d.hands
  timestamp: d.timestamp

pipe.through filter
```

We can then use the filter we've defined to produce a filtered version of our
motion sample:

    cat sample.ldj | filter.coffee > filtered.ldj

For more details on defining such filters, see [ldj-pipe](https://github.com/joyrexus/ldj-pipe#ldj-pipe).
