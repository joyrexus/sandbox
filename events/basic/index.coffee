EventEmitter = require('events').EventEmitter


class Person extends EventEmitter

  constructor: (@name) -> super()

  move: (steps) -> @emit 'move', steps

  walk: (steps) -> 
    @emit 'walk'
    @move steps


bob = new Person('Bob')
ann = new Person('Ann')


# register callbacks to respond to events

log = (n) -> console.log "#{@name} moved #{n} steps."

bob.on 'move', log
bob.on 'move', -> console.log "#{@name} falls down!"

ann.on 'move', log
ann.on 'walk', -> console.log "#{@name} walks gracefully!"

# bob.move(5)
ann.walk(8)
