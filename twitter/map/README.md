## Map tweets from a place

This is a very simple node-based client demonstrating how you can use the
Twitter streaming API with the [locations](https://dev.twitter.com/docs/streaming-apis/parameters#locations) parameter specified. It uses [geojson.io](http://geojson.io/) to map any tweets it hears within a user-specified duration.


### Setup

Before running the `map.coffee` script, place your [app's](https://dev.twitter.com/apps) [OAuth keys](https://dev.twitter.com/docs/auth/oauth/faq) in `keys.json` and run `npm install` to install dependencies (viz., `ntwitter` and `opener`).


### Usage

You can optionally specify the `place` from which the tweets should be coming and the `time` to listen in seconds:

    map.coffee [place] [time]

For example, to map tweets coming from Chicago within the next 5 seconds:

    map.coffee chicago 5
