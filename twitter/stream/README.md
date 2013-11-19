## Map tweets from a place

This is a simple node-based client for listening to a Twitter stream with the [locations](https://dev.twitter.com/docs/streaming-apis/parameters#locations) parameter specified and mapping any tweets heard with [geojson.io](http://geojson.io/).

Before running the `map.coffee` script, place your [app's](https://dev.twitter.com/apps) [OAuth keys](https://dev.twitter.com/docs/auth/oauth/faq) in `keys.json` and run `npm install` to install dependencies (viz., `ntwitter` and `opener`).


### Usage

    map.coffee [place] [time]

For example: 

    map.coffee chicago 5
