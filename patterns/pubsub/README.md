Quick demo of the [observer](http://en.wikipedia.org/wiki/Observer_pattern) / [pubsub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern.

The scenario here is a publisher notifiying its subscribers of events.
Subscribers have callbacks registered with the publisher for particular event
types.  Each subscriber's callback is called when the publisher emits the
associated event.

```coffeescript
# create instances
pub = new Pub('Acme Media')   # publisher
bob = new Sub('Bob')          # subscribers
ann = new Sub('Ann')

# set up subscriptions
pub
  .on('vogue', ann.read)
  .on('glee', ann.watch)
  .on('glee', bob.watch)

# notify subscribers
pub
  .emit('glee')
  .emit('vogue')

```
    
Expected output:

    Acme Media notifies its subscribers of glee:
     * Ann is now watching glee
     * Bob is now watching glee

    Acme Media notifies its subscribers of glee:
     * Ann is now reading vogue
