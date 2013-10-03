class Point
  constructor: (@x, @y) ->

class Vector
  constructor: (@origin, @end) ->

Extras = 
  vector: (v, style) ->
    style or= 
      width: 3
      opacity: .5
      color: '#555'
    V = @line(v.origin.x, v.origin.y, v.end.x, v.end.y)
    V.color = (color) -> V.stroke({'color': color})
    V.stroke(style)

  bug: (x=0, y=0, size=20) ->

    bug = @circle(size)
      .attr("id", "bug")
      .cx(x)
      .cy(y)

    bug.movesTo = (V...) -> 
      chain = -> 
        if V.length
          bug.moveTo V.shift(), chain
      chain()

    bug.moveTo = (V, next) -> 
      @animate(2000, '-').center(V.x, V.y).after(next)

    bug

SVG.extend(SVG.Doc, Extras)

window.Point = Point 
window.Vector = Vector
