#!/usr/bin/env coffee 
'''
Find coords for an address.
    
'''
req = require 'request'
argv = require('optimist').argv

coords = (data) -> 
  console.log data.results[0].geometry.location

find = (address, callback) -> 
  url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&sensor=false"
  req url, (err, res, body) -> callback JSON.parse(body)

address = argv._ or "27 Canterbury Way, Sewanee, TN 37375"
find address, coords
