function icosahedronFaces() {
  var faces = [],
      y = Math.atan2(1, 2) * 180 / Math.PI;
  for (var x = 0; x < 360; x += 72) {
    console.log(x);
    faces.push(
      [[x +  0, -90], [x +  0,  -y], [x + 72,  -y]],
      [[x + 36,   y], [x + 72,  -y], [x +  0,  -y]],
      [[x + 36,   y], [x +  0,  -y], [x - 36,   y]],
      [[x + 36,   y], [x - 36,   y], [x - 36,  90]]
    );
  }
  return faces;
}

console.log(icosahedronFaces());
