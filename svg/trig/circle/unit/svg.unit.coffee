D2R = Math.PI / 180
deg2rad = (d) -> d * D2R

class Cursor
  constructor: (@x, @y, @draw) ->

  lineTo: (x, y, color="steelblue") -> 
    @draw.line(@x,@y, x,y).attr({stroke: color})
    @x = x
    @y = y
    @

  moveTo: (x, y) -> @lineTo(x, y, "none")

class UnitCircle extends Cursor
  constructor: (@cx, @cy, @radius=100, @draw) ->
    @diameter = @radius * 2
    @disc = @draw.circle(@diameter+10).center(@cx, @cy)
    super(@cx, @cy, @draw)

  # convert angle in degrees to x coord on unit circle
  _x: (d) -> @cx + Math.cos(deg2rad(-d)) * @radius

  # convert angle in degrees to y coord on unit circle
  _y: (d) -> @cy + Math.sin(deg2rad(-d)) * @radius

  moveTo: (deg) -> 
    @lineTo(deg, "none")
    @

  lineTo: (deg, color) -> 
    super(@_x(deg), @_y(deg), color)
    @

  markPoint: (size=10) -> 
    @draw.circle(size).attr("class", "point").center(@x, @y)
    @


extension = 
  unitCircle: (x, y, r) -> new  UnitCircle x, y, r, @

SVG.extend(SVG.Doc, extension)
