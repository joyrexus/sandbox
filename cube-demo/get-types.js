var WebSocket = require('ws');
var socket = new WebSocket("ws://localhost:1081/1.0/types/get");

socket.on('open', function() {
  socket.send(JSON.stringify({}));
});

socket.on('message', function(data, flags) {
  console.log(JSON.parse(data));
});
