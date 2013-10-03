Simple demonstration of how to extend [svg.js](http://documentup.com/wout/svg.js#extending-functionality). Our little extension, `svg.unit.js`, enables one to create a [unit circle](http://en.wikipedia.org/wiki/Unit_circle) and move around to various points on it based on a specified angle.

---

Note: moving around a unit circle as our demo use case was largely inspired by Tom MacWright's [Math for Pictures](http://macwright.org/2013/03/05/math-for-pictures.html) post.

---

For example, we can create a unit circle centered at 150, 150 with radius 100 and use degrees as our angle unit of measure:

    w = 300
    h = 300

    draw = SVG('canvas').size(w, h)

    center = 
      x: w/2
      y: w/2

    u = draw.unitCircle(center.x, center.y, radius=100, degrees=true)

Move to 0° on our unit circle and mark the point:

    u.moveTo(0).markPoint()

Draw a line from our last point (at 0°) to 120°:

    u.lineTo(120)

Draw a line from our last point to 240° and mark the point with a marker of
size 10 using `hiliteStyle` for styling:

    hiliteStyle = 
      fill: "orange"
      stroke: "aliceblue"
      'stroke-width': 2

    u.lineTo(240).markPoint(10, hiliteStyle)
