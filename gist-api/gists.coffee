#!/usr/bin/env coffee 
###
 
gists - List gists of a user and select one to open.
 
`gists USER` will enumerate the most recent gists of USER:
 
    $ gists joyrexus
    0 Decorator for aliasing class methods.
    1 Powerset implementations in coffeescript.
    2 Sample unix-style filter that reads from STDIN sans args.
    ...
 
You're then prompted to open a particular gist by number:
 
    ... open gist #
 
The selected gist will then be opened in your default browser.
 
###
{exec} = require 'child_process'
request = require 'request'
 
user = if process.argv.length > 2 then process.argv[2] else 'joyrexus'
 
{stdin, stdout, exit} = process
print = console.log
 
ask = (question, format = /.*/, handle) ->
  stdin.resume()
  stdout.write question
  stdin.once 'data', (d) -> 
    input = d.toString() 
    if format.test input then handle input else exit()
 
results = []  # cache results
 
choose = (e, r, gists) -> 
  results = ({id: g.id, desc: g.description} for g in gists)
  print i, g.desc for i, g of results
  callback = (input) -> 
    i = input.toString().trim()
    url = "https://gist.github.com/#{user}/#{results[i].id}" 
    exec "open #{url}", (err, stdout, stderr) -> if err then console.error stderr
    exit()
  ask '\n ... open gist # ', /^\d/, callback
 
options = 
  url:  "https://api.github.com/users/#{user}/gists"
  json: true
 
request.get options, choose
