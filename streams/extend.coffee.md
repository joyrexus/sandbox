# Extending a base class

Here are two simple approaches to creating a node stream.

To create a stream you want to utilize one of the predefined base classes
(`Readable`, `Writable`, `Duplex`, and `Transform`) and extend the requisite
methods. We'll create `Writable` two instances:

    Write = require('stream').Writable

The standard approach is to create an instance of the based class and then override the **_write** method.

    echo = Write()

    echo._write = (data, enc, next) ->
      process.stdout.write data.toString()
      next()

    process.stdin.pipe(echo)

However, we can also utilize coffeescript's class mechanism to extend the
base class and then define override the method within our class.

    class Log extends Write

      _write: (data, enc, next) ->
        process.stdout.write data + '\n'
        next()

    log = new Log

    process.stdin.pipe(log)

Our program (viz., this [litcoffee](http://coffeescript.org/#literate) file) will now print out two copies of whatever it gets on STDIN.

```
echo 'hi!' | coffee extend.coffee.md
hi!
hi!

```

```
coffee extend.coffee.md
hi!
hi!

^C
```
