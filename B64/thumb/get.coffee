#!/usr/bin/env coffee 
request = require 'request'
 
options = 
  url: "https://gist.github.com/joyrexus/7280524/raw/bea5afba07366f297828e44fb6b687093a6774b2/thumbnail.png.B64"
  json: false

render = (e, r, data) -> console.log data
 
request.get options, render
