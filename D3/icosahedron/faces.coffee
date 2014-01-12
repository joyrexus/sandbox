icosahedronFaces = ->
  faces = []
  y = Math.atan2(1, 2) * 180 / Math.PI;
  for x in ((x * 72) for x in [0..4])
    console.log x
    strip = [
      [[x +  0, -90], [x +  0,  -y], [x + 72,  -y]],
      [[x + 36,   y], [x + 72,  -y], [x +  0,  -y]],
      [[x + 36,   y], [x +  0,  -y], [x - 36,   y]],
      [[x + 36,   y], [x - 36,   y], [x - 36,  90]]
    ]
    console.log strip
  faces

icosahedronFaces()
# console.log icosahedronFaces()
