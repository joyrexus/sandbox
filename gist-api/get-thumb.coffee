#!/usr/bin/env coffee 
###
Get a Base64 encoded thumbnail using `request`.

See [this block](http://bl.ocks.org/joyrexus/7281926) for the full action.

###
request = require 'request'
 
options = 
  url:  "https://gist.github.com/joyrexus/7271320/raw/bea5afba07366f297828e44fb6b687093a6774b2/thumbnail.png.B64"
  json: false
 
request.get options, console.log
