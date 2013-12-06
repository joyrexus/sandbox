#!/usr/bin/env coffee 
thru = require 'through'
split = require 'split'

filter = ->

  write = (data) -> 
    if data
      d = JSON.parse(data).author       # queue attributes of interest
      @queue JSON.stringify(d) + "\n"

  end = -> @queue null                  # append EOF string if desired

  thru(write, end)

process.stdin
  .pipe(split())
  .pipe(filter())
  .pipe(process.stdout)
