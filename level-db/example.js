var levelup = require('levelup')

/*
levelup('/tmp/dprk.db', function (err, db) {
  db.put('name', 'Kim Jong-un', function (err) {
    db.batch([
        { type: 'put', key: 'spouse', value: 'Ri Sol-ju' }
      , { type: 'put', key: 'dob', value: '8 January 1983' }
      , { type: 'put', key: 'occupation', value: 'Clown' }
    ], function (err) {
      db.createReadStream()
        .on('data', console.log)
        .on('close', function () {
          db.close()
        })
    })
  })
})
*/

function copy (srcdb, destdb, callback) {
  srcdb.createReadStream()
    .pipe(destdb.createWriteStream())
    .on('error', callback)
    .on('close', callback)
}

source = levelup('/tmp/dprk.db');
dest = levelup('data.db');

/*
copy(source, dest, function(err) { 
  if (err) console.log(err)
});
    
*/
dest.createReadStream({end: 'occupation'})
  .on('data', function (data) {
    console.log(data.key, data.value)
  })
  .on('close', function () {
    dest.close()
  });


/*
db.put('key', 'value', function (err) {})

db.del('key', function (err) {})

db.get('key', function (err, value) {})


var db = levelup('data.db', function(err, db) {});
db.put('name', 'Bob', function(err) { 
  db.get('name', 'Bob', function(err, value) { 
    console.log(value);
    db.close();
  });
});

*/

