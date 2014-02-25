Quick demo of the [observer](http://en.wikipedia.org/wiki/Observer_pattern) / [pubsub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern.

Here we leverage node's [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) class as the basis for our observable/publisher. (See [this variant](https://gist.github.com/joyrexus/9007146) for a publisher class not based on `EventEmitter`.)

The scenario is a publisher notifiying its subscribers of events. Subscribers have callbacks (`watch`, `read`) registered with the publisher that listen for particular event types.  Each subscriber's callback is called when the publisher emits the associated event.

```coffeescript
# create instances
acme = new Pub('Acme Media')  # publisher
bob = new Sub('Bob')          # subscribers
ann = new Sub('Ann')

# set up subscriptions
acme
  .on('vogue', ann.read)
  .on('glee', ann.watch)
  .on('glee', bob.watch)

# notify subscribers
acme
  .notify('glee')
  .notify('vogue')

```
    
Expected output:

    Acme Media notifies its subscribers of glee:
     * Ann is now watching GLEE
     * Bob is now watching GLEE

    Acme Media notifies its subscribers of glee:
     * Ann is now reading VOGUE
