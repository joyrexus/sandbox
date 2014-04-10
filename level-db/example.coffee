level = require 'levelup'

db = level('data.db', valueEncoding: 'json')

delimiter = '~'

bob = 
  type: 'person'
  number: 1
  name: 'Bob'
  sex: 'M'
  age: 40

key = bob.type + delimiter + bob.number.toString()

display = (err, d) -> console.log d.name, d.age

db.put key, bob, (err) -> db.get('person~1', display)
