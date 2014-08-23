var parse = require('minimist');

var options = {
  alias: {
    host: 'h',
    port: 'p'
  },
  "default": {
    host: 'ws.rcc.uchicago.edu',
    port: 8000
  }
};

var argv = parse(process.argv.slice(2), options);

console.log(argv.host, argv.port);
