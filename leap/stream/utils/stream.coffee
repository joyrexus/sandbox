#!/usr/bin/env coffee
ws = require('websocket-stream')('ws://localhost:6437')
ws.on('data', (d) -> console.log d)
