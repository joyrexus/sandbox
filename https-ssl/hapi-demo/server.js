var fs = require('fs');
var Hapi = require('hapi');
var path = require('path');

var options = {
  tls: {
    key: fs.readFileSync(path.join(__dirname, "private/key.pem"), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, "private/cert.pem"), 'utf8')
  }
};

var server = new Hapi.Server("localhost", 443, options);

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
