#!/usr/bin/env coffee 
validate = require 'index'
parse = require 'minimist'

options = 
  alias:
    username: 'u'
    password: 'p'

argv = parse(process.argv, options)

callback = (err, valid, data) ->
  console.log(err.message) if err
  console.log(data.id) if valid

validate(argv.username, argv.password, callback)
