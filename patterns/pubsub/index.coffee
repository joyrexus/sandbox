class Pub
  '''
  Publisher / Observable / Event Emitter

  '''
  subs: []

  constructor: (@name) ->

  emit: (event) ->
    console.log "#{@name} notifies its subscribers of #{event}:"
    sub.notify(event) for sub in @subs when sub.event is event
    @

  on: (event, listener) ->
    @subs.push 
      event: event
      notify: listener
    @


class Sub
  '''
  Subscriber with various listener methods.

  '''
  constructor: (@name) ->

  watch: (event) =>
    console.log " * #{@name} is now watching #{event}"

  read: (event) =>
    console.log " * #{@name} is now reading #{event}" 


# create instances
pub = new Pub('Acme Media')   # publisher
joe = new Sub('Joe')          # subscribers
bob = new Sub('Bob')
ann = new Sub('Ann')

# set up subscriptions (register callbacks listening for specified events)
pub
  .on('glee', ann.watch)
  .on('glee', bob.watch)
  .on('vogue', ann.read)
  .on('gun & garden', bob.read)
  .on('gun & garden', joe.read)
  .on('sons of anarchy', bob.watch)
  .on('sons of anarchy', joe.watch)

# notify subscribers
pub
  .emit('vogue')
  .emit('gun & garden')

pub
  .emit('glee')
  .emit('sons of anarchy')
