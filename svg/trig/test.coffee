{test, eq, ok} = require 'testy'

print = console.log 

D2R = Math.PI / 180
R2D = 180 / Math.PI

deg2rad = (d) -> d * D2R
rad2deg = (r) -> r * R2D

test "degrees to radians", ->
  ok 0.01745 < D2R < 0.0175
  ok (90 * D2R) is Math.PI / 2
  ok 1.57 < D2R * 90 < 1.58
  ok deg2rad(90) is Math.PI / 2
  ok 1.57 < deg2rad(90) < 1.58
  ok 180 * D2R is Math.PI

test "radians to degrees", ->
  ok 57.295 < R2D < 57.3
  ok 89.9 < (1.57 * R2D) < 90
  ok (D2R * R2D) is 1
  ok deg2rad(90) is Math.PI / 2
  ok 89.9 < rad2deg(1.57) < 90

test "basic trig funcs", ->
  ok Math.cos(0) is 1
  ok Math.cos(Math.PI) is -1
  ok Math.sin(0) is 0
  ok .841 < Math.sin(1) < .8415
  ok Math.cos(Math.PI / 4) is Math.cos(45 * D2R)
  ok Math.sin(Math.PI / 4) is Math.sin(45 * D2R)

test "ticks", ->
  ticks = (deg2rad(d * 10) for d in [0 .. 36])
  ok ticks.length is 37
  ok ticks[0] is 0

test.status()

