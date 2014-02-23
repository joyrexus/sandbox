###
function Binder(handler) {
    this._value = 0; // will be set 
    this._handler = handler;
}
Binder.prototype.set = function(val) {
    this._value = val;
    this._handler(this);
};
Binder.prototype.get = function() {
    return this._value;
};
###

class Bind

  constructor: (@value, @vars) ->
    @setter = (value) -> for i in @vars()
      console.log i, value, '<<'
      i = value 
      console.log i
    @setter(@value)

  set: (value) -> 
    console.log 'setting', value
    @value = value 
    @setter(value)



foo = 'Bob'
bar = 'Bob'

setter = (val) -> [foo, bar] = [val, val]

name = new Bind('Bob', -> [foo, bar])

console.log foo, bar
name.set 'Bill'
console.log foo, bar
