fs = require 'fs'
csv = require 'csv2'
map = require 'through2-map'

# extract first column of each row
filter = map(objectMode: true, (row) -> row[0] + '\n')

fs.createReadStream('data.csv')
  .pipe(csv())
  .pipe(filter)
  .pipe(process.stdout)



{Readable} = require 'stream'

# a simple transform stream
tx = map((d) -> d.toString().toUpperCase())
 
# a simple source stream
rs = new Readable
rs.push 'the quick brown fox jumps over the lazy dog!\n'
rs.push null 
 
rs.pipe(tx)
  .pipe(process.stdout)   # THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG!
