xhr = require "xhr"

options =
  url: "http://localhost:3000/data/person-jv"
  json: true

handler = (err, resp, data) ->
  if resp and resp.statusCode is 200
    console.log data.name
    person.innerText = data.name
  else
    console.log "no response from #{options.url}!"

xhr options, handler
