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
