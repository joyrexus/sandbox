There's been plenty of discussion in the CoffeeScript community about the value and viability of adding **getter** and **setter** syntax for `Object` properties.  

For the Javascript background, see the MDN articles on the [`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/get) and [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/set) operators and their guide to [working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

On the CoffeeScript side, see the discussion in issues [#64](https://github.com/jashkenas/coffee-script/issues/64), [#451](https://github.com/jashkenas/coffee-script/issues/451), and [#1165](https://github.com/jashkenas/coffee-script/issues/1165/).

The gist of this discussion is that syntactic support is unlikely in
CoffeeScript.  However, there are ways to implement similar functionality using
[`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

What follows is a light edit of [a stackoverflow answer](http://stackoverflow.com/a/11592890/546630) I came across that demonstrates how you might do so. Hat tip to
[@epidemian](http://stackoverflow.com/users/581845/epidemian)!

---

It's not that hard to implement a convenient wrapper function that calls [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) for class declarations.  Here's [one approach](https://github.com/jashkenas/coffee-script/issues/451#issuecomment-2404226):

```coffeescript
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
```
Alternatively, create two different methods:

```coffeescript
Function::getter = (prop, get) ->
  Object.defineProperty @prototype, prop, {get, configurable: yes}

Function::setter = (prop, set) ->
  Object.defineProperty @prototype, prop, {set, configurable: yes}

class Name
  constructor: (@first, @last) ->
  @getter 'name', -> "#{@first} #{@last}"
  @setter 'name', (name) -> [@first, @last] = name.split ' '
```
For plain objects you can just use `Object.defineProperty` (or [`Object.defineProperties`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperties)) on the object itself or wrap it in a utility function:

```coffeescript
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
```


