var fs = require('fs');
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
    method: 'POST',
    path: '/submit',
    config: {

        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },

        handler: function (request, reply) {
            var data = request.payload;
            if (data.file) {
                var name = data.file.hapi.filename;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);
                var body = '';

                file.on('error', function (err) { 
                    console.error(err) 
                });

                data.file.pipe(file);

                data.file.on('data', function (data) {
                    body += data
                })

                data.file.on('end', function (err) { 
                    var ret = {
                        description: data.file.description,
                        file: {
                            data: body,
                            filename: data.file.hapi.filename,
                            headers: data.file.hapi.headers
                        }
                    }
                    reply(JSON.stringify(ret));
                })
            }

        }
    }
});

server.start(function () {
    console.log('info', 'Server running at: ' + server.info.uri);
});

