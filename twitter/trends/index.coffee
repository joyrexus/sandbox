{OAuth} = require 'OAuth'

# put your twitter app generated keys in `keys.json`
my = require 'keys' 

# choose city of interest from command-line
choice = process.argv[2] or "chicago"

# add cities and their WOEID (http://en.wikipedia.org/wiki/WOEID)
place = 
  chicago: 2379574
  nashville: 2457170
  milwaukee: 2451822
  london: 44418
  rome: 721943

url =
  requestToken: 'https://api.twitter.com/oauth/request_token'
  accessToken: 'https://api.twitter.com/oauth/access_token'
  endpoint: 'https://api.twitter.com/1.1/trends/place.json'

oauth = new OAuth(
  url.requestToken,
  url.accessToken,
  my.consumerKey
  my.consumerSecret,
  '1.0A', null, 'HMAC-SHA1'
)

callback = (err, data, res) ->
  console.error(err) if err 
  data = JSON.parse data
  console.log trend.name for trend in data[0].trends

query = "#{url.endpoint}?id=#{place[choice]}"
oauth.get(query, my.accessToken, my.accessTokenSecret, callback)
