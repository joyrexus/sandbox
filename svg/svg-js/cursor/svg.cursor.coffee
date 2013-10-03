class Cursor
  markerStyle:
    fill: "#999"
    stroke: "aliceblue"
    'stroke-width': 2

  constructor: (@x=0, @y=0, @draw) ->

  lineTo: (x, y, color="steelblue") -> 
    @draw.line(@x,@y, x,y).attr({stroke: color})
    @x = x
    @y = y
    @

  moveTo: (x, y) -> @lineTo(x, y, "none")

  markPoint: (size=10, style) -> 
    style or= @markerStyle
    @draw.circle(size).attr(style).center(@x, @y)
    @

extension = 
  cursor: (x, y) -> new Cursor x, y, @

SVG.extend(SVG.Doc, extension)
