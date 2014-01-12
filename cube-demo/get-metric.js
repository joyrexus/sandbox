var WebSocket = require('ws');
var socket = new WebSocket("ws://localhost:1081/1.0/metric/get");

socket.on('open', function() {
  socket.send(JSON.stringify({
    "expression": "sum(request)",
    "start": "2014-01-01T16:00:00Z",
    "stop": "2014-01-02T17:00:00Z",
    "step": 6e4
  }));
});

socket.on('message', function(data, flags) {
  console.log(JSON.parse(data));
});
