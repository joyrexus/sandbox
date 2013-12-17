split = require('split')()
trans = require('stream').Transform(decodeStrings: false)
{stdin, stdout} = process

# Some programs like `head` send an error on stdout
# when they don't want any more data
process.stdout.on('error', process.exit)

leap = {}

leap.pipe = (filter) ->
  trans._transform = (data, encoding, done) ->
    if data
      data = JSON.parse data
      if data?.id
        @push JSON.stringify(filter data) + "\n" 
    done()

  stdin
    .pipe(split)
    .pipe(trans)
    .pipe(stdout)

module.exports = leap
