{ok} = require 'assert'

class Greet
  constructor: (@greeting) ->
  thin: -> @greeting
  fat:  => @greeting    # see http://coffeescript.org/#fat-arrow

greet = new Greet 'hi'

ok greet.thin() is 'hi'
ok greet.fat() if 'hi'

# run a function in different context, thereby changing `this`/@
run = (f) -> f()

ok run(greet.thin) is undefined, 'since the thin arrow is context sensitive'
ok run(greet.fat) is 'hi', 'since the fat arrow preserves the original context'
