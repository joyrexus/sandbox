Monads
======

The following is a direct translation of [monad.js](https://github.com/douglascrockford/monad) into Coffeescript.

Crockford writes ...

The `MONAD` function is a macroid that produces monad constructor functions.  It can take an optional modifier function, which is a function that is allowed to modify new monads at the end of the construction processes.

A monad constructor (sometimes called 'unit' or 'return' in some mythologies) comes with three methods, `lift`, `lift_value`, and `method`, all of which can add methods and properties to the monad's prototype.

A monad has a `bind` method that takes a function that receives a value and
is usually expected to return a monad.

Following Crockford, we define the `MONAD` function, which is basically a monad factory. Here's the minimalist version.

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


Here's the enhanced version with the aforementioned adapter methods.

    MONAD = (modifier) ->
      '''
      Each unit constructor has a monad prototype. The prototype will
      contain an `is_monad` property for classification, as well as all 
      inheritable methods.

      Each call to `MONAD` will produce a new unit constructor function.

      '''
      prototype = Object.create null
      prototype.is_monad = true

      unit = (value) ->
        '''
        The unit constructor creates a new monad, adds a bind method to the
        monad, and modifies the resulting monad (if MONAD was passed a
        modifier) before returning it.

        The bind method will deliver the unit's value parameter to a function.

        `bind` takes a function and optional arguments. It calls the function 
        passing the monad's value and bind's optional args.

        '''
        monad = Object.create prototype
        monad.bind = (func, args...) -> func(value, args...)
        modifier(monad, value) if typeof modifier is 'function'
        monad

      unit.method = (name, func) -> 
        '''Add a method to the prototype.'''
        prototype[name] = func
        unit

      unit.lift_value = (name, func) ->
        '''
        Add a method to the prototype that calls bind with the func. 
        This can be used for ajax methods that return values other than monads.
        
        '''
        prototype[name] = (args...) ->
          @bind(func, args...)
        unit

      unit.lift = (name, func) ->
        '''
        Add a method to the prototype that calls bind with the func. 
        If the value returned by the func is not a monad, then make 
        a monad.

        '''
        prototype[name] = (args...) ->
          result = @bind(func, args...)
          if result and result.is_monad then result else unit result
        unit

      unit

Alright, let's try it out.

    id = MONAD()
    monad = id "hi"           # constructs identity monad with value "hi"
    monad.bind console.log    # prints "hi"

    ajax = MONAD().lift "print", console.log
    monad = ajax "bye"
    monad.print()

OK, let's use our macroid to implement the **Maybe** monad.  This is just a matter of supplying the monad constructor with a modifier that modifies the monad's `bind` method so that bound functions do nothing when applied to `null` values.

    PRINT = (args...) -> print x.toUpperCase() for x in args
    ###

    id = MONAD().lift('print', PRINT)
    monad = id null
    monad.print()                 # complains!

    ###
    null_handler = (monad, value) ->
      if not value?
        monad.is_null = true
        monad.bind = -> monad     # modify our bind method so that bound 
                                  # functions do nothing on null values

    maybe = MONAD(null_handler)
      .lift('print', PRINT)

    monad = maybe "ok"
    monad.print()                 # prints "OK"

    monad = maybe null
    monad.print()                 # does nothing and doesn't complain!

