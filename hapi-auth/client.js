var request = require('request')

var options = {
  url: 'http://joyrexus.local:3000/test',
  auth: {
    user: 'john',
    password: '123'
  }
}

request(options, function (err, res, body) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir('headers', res.headers)
  console.dir('status code', res.statusCode)
  console.dir(body)
})

