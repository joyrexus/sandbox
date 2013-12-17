#!/usr/bin/env coffee 
WebSocket = require('ws')
stream = new WebSocket 'ws://localhost:8081'
stream.on 'message', (msg) -> console.log msg
