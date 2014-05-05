fs = require 'fs'
csv = require 'csv2'
thru = require 'through2'

columns = []
result = {}

filter = thru.obj (data, enc, next) ->
  if columns.length < 1
    columns = data
    result[k] = [] for k in columns
  else
    result[k].push(data[i]) for k, i in columns
  next()

fs.createReadStream('data.csv')
  .pipe(csv())
  .pipe(filter)
  .on('end', -> console.log(result))
