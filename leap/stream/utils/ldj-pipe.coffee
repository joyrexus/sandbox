split = require('split')()
trans = require('stream').Transform(decodeStrings: false)
{stdin, stdout} = process

# Some programs like `head` send an error on stdout
# when they don't want any more data
process.stdout.on('error', process.exit)

pipe = {}

pipe.through = (filter) ->
  trans._transform = (data, enc, done) ->
    if data
      data = JSON.parse data
      @push JSON.stringify(filter data) + "\n" if data?.id
    done()

  stdin
    .pipe(split)
    .pipe(trans)
    .pipe(stdout)

module.exports = pipe
