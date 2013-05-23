Monads
======

Following Crockford, we define our macroid.

    MONAD = ->
      unit = (value) ->
        monad = Object.create null
        monad.bind = (func) -> func value
        monad

    identity = MONAD()
    monad = identity "hello world!"   

    print = console.log 
    monad.bind print
    monad.bind (x) -> print x.toUpperCase()


Enhancements.

    MONAD = ->
      prototype = Object.create null
      unit = (value) ->
        monad = Object.create prototype
        monad.bind = (func) -> func value
        monad

    identity = MONAD()
    monad = identity "hello world!"   

    print = console.log 
    monad.bind print
    monad.bind (x) -> print x.toUpperCase()

