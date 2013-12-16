#!/usr/bin/env coffee 
leap = require 'leap-pipe'

filter = (data) ->
  id: data.id
  hands: data.hands
  timestamp: data.timestamp

leap.pipe(filter)
