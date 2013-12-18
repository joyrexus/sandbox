#!/usr/bin/env coffee 
io = require 'io-through'

filter = (data) ->
  id: data.id
  hands: data.hands
  timestamp: data.timestamp

io.through filter
