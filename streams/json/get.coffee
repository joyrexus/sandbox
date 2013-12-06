#!/usr/bin/env coffee
request = require 'request'
 
url = process.argv[2] # try 'http://registry.npmjs.org/event-stream'

request(url).pipe(process.stdout)
