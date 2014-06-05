We were initially following this tutorial: [Poor Man's Firebase: LevelDB, REST, and WebSockets](http://procbits.com/2014/01/06/poor-mans-firebase-leveldb-rest-and-websockets).

We basically wanted to see how to expose a leveldb datastore over http.

Looks like the main tool for this is Julian Gruber's [multilevel-http](https://github.com/juliangruber/multilevel-http). 

Multilevel gives us a server ([`server.js`](server.js)), which provides a RESTful endpoint for interacting with our datastore, and a node client API ([`client.coffee`](client.coffee)).  

Alternatively, we can access the REST endpoint via a web page making ajax/xhr calls ([`client.html`](client.html)).  It's still not clear me how authentication would work in this scheme.

Note that the ajax stuff happens in `bundle.js`, which gets generated from
`main.coffee` via `npm run-script build`.
