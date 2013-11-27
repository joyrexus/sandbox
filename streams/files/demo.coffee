fs = require "fs"
es = require "event-stream"

fs.createReadStream("data.tsv")
  .pipe(es.split('\n'))
  .pipe(es.mapSync((data) -> data.split('\t')))
  .pipe(es.mapSync((data) -> data[1]))
  .pipe(es.join('\n'))
  .pipe(es.wait())
  .pipe(process.stdout)
