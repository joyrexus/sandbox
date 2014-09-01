Hapi = require 'hapi'
routes = require 'routes'

server = Hapi.createServer('localhost', 8000)

server.route(routes)

startMessage = -> console.log 'Server running at', server.info.uri

server.start(startMessage)
