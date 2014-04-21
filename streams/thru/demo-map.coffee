fs = require 'fs'
csv = require 'csv2'
map = require 'through2-map'

columns = []
result = {}

iter = (data, i) ->
  if i is 0
    columns = data
    result[k] = [] for k in columns
  else
    console.log result
    result[k].push(data[i]) for k, i in columns

finish = -> console.log('???')

filter = map(objectMode: true, iter, finish)

fs.createReadStream('data.csv')
  .pipe(csv())
  .pipe(filter)
  .on('end', -> console.log '???')
