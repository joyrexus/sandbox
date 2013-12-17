Readable = require('stream').Readable

rs = new Readable
rs.push x for x in ['beep\n', 'boop\n', null]
rs.pipe process.stdout 
