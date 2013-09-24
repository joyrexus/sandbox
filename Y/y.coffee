# http://en.wikipedia.org/wiki/Fixed-point_combinator#Y_combinator
# 
#   λf  .  (λx  .  x x)(λy  .  f (λv  . ((y y) v)))
Y = (f) -> ((x) -> x x)((y) -> f ((v) -> (y y) v))

# or ...
    
Y = (f) ->
  p = (h) ->
    (x) -> f(h(h))(x)
  p p


fib = (f) ->
  (n) -> if n == 0 then 1 else n * f(n - 1)
  
console.log Y(fib) i for i in [0 .. 6]    # 1 1 2 6 24 120 720
