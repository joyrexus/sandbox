#!/usr/bin/env coffee 
'''
Yelp TERM in CITY and render results as geojson

Examples:

  yelp tacos
  yelp --in Louisville brewpubs
  yelp --in Nashville "chinese takeout" | geojsonio

'''
req = require 'request'
queue = require 'queue-async'
config = require 'config'
open = require 'opener'
yelp = require('yelp').createClient config
args = require('optimist')
    .usage('Usage: $0 [--location CITY] TERM')
    .describe('l', 'location to search')
    .alias('l', 'location')
    .alias('l', 'in')
    .describe('m', 'show map of results')
    .alias('m', 'map')

argv = args.argv

if argv.help
  args.showHelp()
  process.exit(0)

coords = (name, address, data) -> 
  loc = data.results[0].geometry.location
  lat = loc.lat
  lon = loc.lng
  feature = 
    type: "Feature"
    properties:
      name: name
      address: address
      lat: "#{lat}"
      lon: "#{lon}"
    geometry:
      type: "Point"
      coordinates: [lon, lat]

find = (name, address, callback, final) -> 
  url = "https://maps.googleapis.com/maps/api/geocode/json?address=\"#{address}\"&sensor=false"
  req url, (err, res, body) -> 
    result = callback name, address, JSON.parse(body)
    final null, result

address = (b) -> 
  b.location.display_address.join(', ')

q = queue(1)

map = (geojson) ->
  try
    url = 'http://geojson.io/#data=data:application/json,' 
    open url + encodeURIComponent(geojson)
  catch e then console.error e

render = (err, data) ->
  q.defer(find, b.name, address(b), coords) for b in data.businesses
  q.awaitAll (err, results) -> 
    output = 
      type: "FeatureCollection"
      features: results
    geojson = JSON.stringify(output)
    if argv.map then map(geojson) else console.log(geojson)

query = 
  term: if argv._.length then argv._ else config.default.term
  location: argv.location or config.default.location

yelp.search query, render
