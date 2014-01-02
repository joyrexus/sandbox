#!/usr/bin/env node
var socket = new WebSocket("ws://localhost:1080/1.0/event/put");

socket.onopen = function() {
  socket.send(JSON.stringify({
    "type": "request",
    "time": "2011-09-12T21:33:12Z",
    "data": {
      "host": "web14",
      "path": "/search",
      "query": {
        "q": "flowers"
      },
      "duration_ms": 241,
      "status": 200,
      "user_agent": "Chrome/13.0.782.112"
    }
  }));
};
