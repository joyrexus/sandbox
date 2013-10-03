class Cursor
  constructor: (@x=0, @y=0, @draw) ->

  lineTo: (x, y, color="steelblue") -> 
    @draw.line(@x,@y, x,y).attr({stroke: color})
    @x = x
    @y = y
    @

  moveTo: (x, y) -> @lineTo(x, y, "none")

extension = 
  cursor: (x, y) -> new Cursor x, y, @

SVG.extend(SVG.Doc, extension)
