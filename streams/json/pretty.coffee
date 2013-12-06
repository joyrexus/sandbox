#!/usr/bin/env coffee 
thru = require 'through'
split = require 'split'

filter = ->
  thru (data) -> console.log JSON.parse(data) if data

process.stdin
  .pipe(split())
  .pipe(filter())
