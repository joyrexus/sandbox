var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');
var Bcrypt = require('bcrypt');

var server = new Hapi.Server(3000);

// database of users
var users = {
    john: {
        username: 'john',   // password is `123`
        password: '$2a$08$ZN/HEdEzrp701X1RGwHSCOQEL2mgpo8Flq71Nj.Zni6KpwGh2uemq',
        name: 'John Doe',
        id: '2133d32a'
    }
};

var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }
    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

server.pack.register(Basic, function (err) {
    if (err) { throw err; }
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({ 
        method: 'GET', 
        path: '/test', 
        config: { auth: 'simple' },
        handler: function (request, reply) { reply('ok!'); }
    });
    server.start(function () {
      console.log('info', 'Server running at: ' + server.info.uri);
      console.log('curl ' + server.info.uri + '/test -H "Authorization: Basic ' + (new Buffer('john:123', 'utf8')).toString('base64') + '"');
    });
});
