Path = require 'path'
Hapi = require 'hapi'
Joi = require 'joi'

options = 
  views:
    engines:
      jade: require 'jade'
    path: Path.join(__dirname, 'views')

server = new Hapi.Server('localhost', 8080, options)

getColor = (name, next) ->
    colors = ["red", "blue", "indigo", "violet", "green"]
    color = colors[Math.floor(Math.random() * colors.length)]
    next(null, color)

server.method("getColor", getColor)

server.route
  method: "GET"
  path: "/static/{path*}"
  handler: 
    directory:
      path: "./public"
      listing: false
      index: false

server.route
  method: 'GET'
  path: '/{id}/jobs'
  config:
    validate: 
      query: 
        size: Joi.string()
                .valid(["big", "medium", "small", "any size"])
                .default("any size")
    handler: (req, reply) ->
      name = req.params.id
      server.methods.getColor name, (err, color) ->
        data =
          id: req.params.id
          size: req.query.size
          color: color
        reply.view('hello', data)


server.start -> console.log "Server started on", server.info.uri
