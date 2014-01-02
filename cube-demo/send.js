var cube = require("cube");

var client = cube.emitter("ws://localhost:1080");

client.send({
  type: "gesture",
  time: new Date(),
  data: {hands: {x: 1, y: 1, z: 1}}
});

client.close();
