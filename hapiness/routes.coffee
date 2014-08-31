names = [
  first: 'jason'
  last: 'voigt'
 ,
  first: 'robin'
  last: 'weiss'
]

routes = [
  method: 'GET'
  path: '/hello/names'
  handler: (req, reply) -> 
    reply JSON.stringify(names) + "\n"
 ,
  method: 'GET'
  path: '/hello/{first}/{last?}'
  handler: (req, reply) -> 
    {first, last} = req.params
    if last
      reply "hello #{first} #{last}!\n"
    else
      reply "hello #{first}!\n"
 ,
  method: 'POST'
  path: '/hello'
  handler: (req, reply) ->
    name =
      first: req.payload.first
      last: req.payload.last
    names.push(name)
    reply "added #{JSON.stringify name}!\n"
 ,
  method: 'DELETE'
  path: '/hello/{index}'
  handler: (req, reply) ->
    i = req.params.index
    if names.length <= i
      return reply('No name found!\n').code(404)
    name = names[i]
    names.splice(i, 1)
    reply "deleted #{JSON.stringify name}!\n"
]

module.exports = routes
