_ = require 'underscore'
{ok} = require 'assert'

x = ['a', 'b', 'c']
y = ['d', 'e', 'f']

ok _.contains(x, 'c')
ok _.contains(x, 'd') == false
ok _.contains(y, 'd')
ok _.contains(y, 'g') == false

ok _(x).contains 'c'
ok _(x).contains('d') == false
ok _(y).contains 'd'
ok _(y).contains('g') == false


# altering the prototype
Array::contains = (x) ->
  @indexOf(x) != -1

ok x.contains('c')
ok x.contains('d') == false
