parse = require 'minimist'

options = 
  alias:
    host: 'h'
    port: 'p'
  default:
    host: 'ws.rcc.uchicago.edu'
    port: 8000

argv = parse(process.argv.slice(2), options)

argv.host
