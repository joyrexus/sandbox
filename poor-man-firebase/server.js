var levelup = require('levelup')
  , express = require('express')
  , multilevelHttp = require('multilevel-http')
  , http = require('http')

var db = levelup('./mydb.db', {valueEncoding: 'json'})
var app = multilevelHttp.server(db)
app.use(express.static(__dirname));

var server = http.createServer(app)

server.listen(3000, function(){
  console.log('listening on port %d...', 3000)
})
