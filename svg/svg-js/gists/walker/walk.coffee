d = 20          # diameter of bug and delta/increment for a move
w = 900         # canvas width
h = 500         # canvas height

step = 250      # step time in millisecs

edge =
  north: 0      # x-coord of north edge
  south: h - d
  east:  w - d  # y-coord of east edge
  west:  0

frameStyle = 
  fill: "none"
  stroke: "#555"

draw = SVG('canvas').size(w, h)

draw.rect(w, h).attr(frameStyle)  # canvas frame

drawBlock = -> draw.rect(d, d)    # unit block

cursor = (x, y) -> drawBlock()    # bug maker
  .fill("steelblue")
  .move(x, y)

trail = (x, y) -> drawBlock()     # trail maker
  .fill("#999")
  .move(x, y)
  .back()

# return direction in which to move
direction = ->
  switch Math.floor(Math.random() * 4)
    when 0 then 'N'
    when 1 then 'S'
    when 2 then 'E'
    when 3 then 'W'

# x/y-coordinate deltas for each direction
DELTA = 
  N: {x: 0,  y: d}
  S: {x: 0,  y: -d}
  E: {x: d,  y: 0}
  W: {x: -d, y: 0}
  
# our random walking bug
bug = cursor w/2 - d/2, h/2 - d/2

moveTo = (next) -> 
  bug.front().animate(step).move(next.x, next.y)

jumpTo = (jump) ->
  -> bug.move(jump.x, jump.y)

crossover = (next, jump) ->
  moveTo(next).after(jumpTo jump)

walk = (trailing=true) ->
  x = bug.x()
  y = bug.y()

  trail(x, y) if trailing

  D = DELTA[direction()]  # get increments for x/y shift

  next =                  # next coordinate position
    x: x + D.x
    y: y + D.y

  jump =                  # to be set when crossing
    x: x
    y: y

  # below we check for edge cases (where we've gone over an edge)

  if D.x                      # shifting horizontally
    if next.x > edge.east
      jump.x = edge.west
      crossover next, jump    # jump to west edge

    else if next.x < edge.west
      jump.x = edge.east
      crossover next, jump    # jump to east edge

    else
      moveTo next

  else                        # shifting vertically
    if next.y > edge.south
      jump.y = edge.north
      crossover next, jump    # jump to north edge

    else if next.y < edge.north
      jump.y = edge.south
      crossover next, jump    # jump to south edge

    else
      moveTo next

setInterval walk, step * 2

