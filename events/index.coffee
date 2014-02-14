EventEmitter = require('events').EventEmitter


class Pub extends EventEmitter
  '''
  Publisher / Observable / Event Emitter

  '''
  constructor: (@name) -> super()

  notify: (event) ->
    console.log "#{@name} notifies its subscribers of #{event}:"
    @emit event, event.toUpperCase()
    @


class Sub
  '''
  Subscriber with various listener methods.

  '''
  constructor: (@name) ->

  watch: (show) =>
    console.log " * #{@name} is now watching #{show}"

  read: (magazine) =>
    console.log " * #{@name} is now reading #{magazine}" 


# create instances
#
# publisher
acme = new Pub('Acme Media')   
#
# subscribers
joe = new Sub('Joe')
bob = new Sub('Bob')
ann = new Sub('Ann')

# set up subscriptions (register callbacks listening for specified events)
acme
  .on('glee', ann.watch)
  .on('glee', bob.watch)
  .on('vogue', ann.read)
  .on('gun & garden', bob.read)
  .on('gun & garden', joe.read)
  .on('sons of anarchy', bob.watch)
  .on('sons of anarchy', joe.watch)

# notify subscribers
events = ['vogue', 'gun & garden', 'glee', 'sons of anarchy']
acme.notify(event) for event in events
