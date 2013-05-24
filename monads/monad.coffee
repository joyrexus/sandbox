MONAD = (modifier) ->
  prototype = Object.create null
  prototype.is_monad = true

  unit = (value) ->
    monad = Object.create prototype
    monad.bind = (func, args...) -> func(value, args...)
    modifier(monad, value) if typeof modifier is 'function'
    monad

  unit.method = (name, func) -> 
    prototype[name] = func
    unit

  unit.lift_value = (name, func) ->
    prototype[name] = (args...) ->
      @bind(func, args...)
    unit

  unit.lift = (name, func) ->
    prototype[name] = (args...) ->
      result = @bind(func, args...)
      if result and result.is_monad then result else unit result
    unit

  unit
