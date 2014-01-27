d3 = require 'd3'

x = d3.scale.ordinal()
  .domain(["A", "B", "C", "D", "E", "F"])
  .range([0 .. 5])

console.log x('F')

