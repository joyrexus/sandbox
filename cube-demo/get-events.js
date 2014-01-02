var WebSocket = require('ws');
var socket = new WebSocket("ws://localhost:1081/1.0/event/get");

socket.on('open', function() {
  socket.send(JSON.stringify({
    "expression": "gesture",
    "start": "2014-01-01",
    "stop": "2014-01-03"
  }));
});

socket.on('message', function(data, flags) {
  data = JSON.parse(data);
  if (!data) { 
    socket.close() 
  }
  else {
    console.log(data);
  }
});
