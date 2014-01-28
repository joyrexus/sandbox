pipe = require 'ldj-pipe'

pipe.through (d) -> 
    if d.timestamp
      i = d.hands[0]
      [d.id, d.timestamp, i.palmPosition[1], i.palmVelocity[1]]
