multilevel = require 'multilevel-http'
db = multilevel.client 'http://localhost:3000/', encoding: 'json'

db.get 'person-jv', encoding: 'json', (err, d) -> console.log d.name

list = ->
  db.readStream(valueEncoding: 'json')
    .on('data', console.log)


list()
