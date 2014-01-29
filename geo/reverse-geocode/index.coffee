#!/usr/bin/env coffee 
'''
Reverse geocoding demo: find address for given coords.

https://developers.google.com/maps/documentation/geocoding/#ReverseGeocoding
    
'''
req = require 'request'

find = (lat, lng) -> 
  url = "https://maps.googleapis.com/maps/api/geocode/json?" \
      + "latlng=#{lat},#{lng}&sensor=false"
  req url, (err, res, body) -> 
    data = JSON.parse(body)
    console.log data.results[0].formatted_address

latitude = 40.714224
longitude = -73.961452

find latitude, longitude
