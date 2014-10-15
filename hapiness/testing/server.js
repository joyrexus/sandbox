var Hapi = require("hapi");
var server = new Hapi.Server(8080);
if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;
