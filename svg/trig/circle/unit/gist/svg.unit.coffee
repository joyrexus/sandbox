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
  defaultCircleStyle:
    fill: "aliceblue"
    stroke: "steelblue"
    'stroke-width': 10

  defaultPointStyle:
    fill: "#999"
    stroke: "aliceblue"
    'stroke-width': 2

  constructor: (@cx, @cy, @radius=100, @degrees=false, @draw) ->
    margin = @defaultPointStyle['stroke-width']
    @diameter = @radius * 2
    @disc = @draw.circle(@diameter+margin)
      .attr(@defaultCircleStyle)
      .center(@cx, @cy)
    super(@cx, @cy, @draw)

  # convert angle in degrees to x coord on unit circle
  _x: (θ) -> 
    θ = deg2rad(θ) if @degrees 
    @cx + Math.cos(-θ) * @radius

  # convert angle in degrees to y coord on unit circle
  _y: (θ) -> 
    θ = deg2rad(θ) if @degrees 
    @cy + Math.sin(-θ) * @radius

  moveTo: (θ) -> 
    @lineTo(θ, "none")
    @

  lineTo: (θ, color) -> 
    super(@_x(θ), @_y(θ), color)
    @

  markPoint: (size=10, style) -> 
    style or= @defaultPointStyle
    @draw.circle(size).attr(style).center(@x, @y)
    @


extension = 
  unitCircle: (x, y, r, d) -> new  UnitCircle x, y, r, d, @

SVG.extend(SVG.Doc, extension)
