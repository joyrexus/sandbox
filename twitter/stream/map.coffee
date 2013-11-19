#!/usr/bin/env coffee 
Twitter = require 'ntwitter'
open = require 'opener'
keys = require 'keys'

spot = process.argv[2] or 'chicago' # tweets from which spot?
time = process.argv[3] or 10        # listen for how many secs?

tweet = new Twitter(keys)

geojson = 
  type: "FeatureCollection"
  features: []

# add your own spots of interest here
bbox = 
  chicago:
    locations: '-87,41,-86,42'   
  nashville:
    locations: '-87,35,-85,36.1'
  nyc:
    locations: '-74,40,-73,41'
  bayarea:
    locations: '-122.75,36.8,-121.75,37.8'

# callback to map tweets from the resulting stream
map = (stream) -> 
  setTimeout(stream.destroy, time * 1000)  # disconnect after x seconds
  stream.on 'data', (data) -> 
    if data.coordinates?
      feature =
        type: "Feature"
        geometry: data.coordinates
        properties:
          text: data.text
      geojson.features.push(feature)
  stream.on 'end', -> 
    open 'http://geojson.io/' +
         '#data=data:application/json,' + 
         encodeURIComponent JSON.stringify(geojson)

# map tweets within specified bounding box
tweet.stream('statuses/filter', bbox[spot], map)
