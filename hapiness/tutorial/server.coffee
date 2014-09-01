Hapi = require 'hapi'
Joi = require 'joi'

server = new Hapi.Server(8080, 'localhost')

routes =
  method: 'GET'
  path: '/{id}/jobs'
  config:
    validate: 
      query: 
        size: Joi.string()
                .valid(["big", "medium", "small", "any size"])
                .default("any size")
    handler: (req, rep) ->
      rep """
          <html>
            <body>
            <h1>hello #{req.params.id}!</h1>
            <p>
              You're wondering about #{req.query.size} jobs
            </p>
          """

server.route(routes)

server.start -> console.log "Server started on", server.info.uri
