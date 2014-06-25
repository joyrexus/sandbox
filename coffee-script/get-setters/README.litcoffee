# Getters and Setters

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/get
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/set

There's been plenty of discussion about the value and viability of adding getter and setter syntax to CoffeeScript.  See issues [#64](https://github.com/jashkenas/coffee-script/issues/64), [#451](https://github.com/jashkenas/coffee-script/issues/451), and [#1165](https://github.com/jashkenas/coffee-script/issues/1165/).

It's not that hard to implement a convenient wrapper function that calls [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) for class declarations.  Here's [one approach](https://github.com/jashkenas/coffee-script/issues/451#issuecomment-2404226):

    Function::property = (prop, desc) ->
      Object.defineProperty @prototype, prop, desc
    
    class Name
      constructor: (@first, @last) ->
      @property 'name',
        get: -> "#{@first} #{@last}"
        set: (name) -> [@first, @last] = name.split ' '

    {ok} = require 'assert'
    
    p = new Name 'Bob', 'Jones'
    ok p.name is 'Bob Jones'
    p.name = 'Bob Smith'
    ok p.last is 'Smith'

Alternatively, create two different methods:

    Function::getter = (prop, get) ->
      Object.defineProperty @prototype, prop, {get, configurable: yes}
    
    Function::setter = (prop, set) ->
      Object.defineProperty @prototype, prop, {set, configurable: yes}
    
    class Name
      constructor: (@first, @last) ->
      @getter 'name', -> "#{@first} #{@last}"
      @setter 'name', (name) -> [@first, @last] = name.split ' '


For plain objects you can just use `Object.defineProperty` (or [`Object.defineProperties`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperties)) on the object itself or wrap it in a utility function:

    objectWithProperties = (obj) ->
      if obj.properties
        Object.defineProperties obj, obj.properties
        delete obj.properties
      obj
    
    rectangle = objectWithProperties
      width: 4
      height: 3
      properties:
        area:
          get: -> @width * @height
    
    ok rectangle.area is 12
    rectangle.width = 5
    ok rectangle.area is 15
