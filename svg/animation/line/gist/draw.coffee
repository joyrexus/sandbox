path = document.querySelector('path')
length = path.getTotalLength()

# clear any previous transition
path.style.transition = path.style.WebkitTransition = 'none'

# set starting positions
path.style.strokeDasharray = "#{length} #{length}"
path.style.strokeDashoffset = length

# trigger a layout so styles are calculated
path.getBoundingClientRect()

path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 2s ease-in-out'

drawn = false

draw = -> 
  drawn = true
  path.style.strokeDasharray = length + ' ' + length
  path.style.strokeDashoffset = '0' 

erase = -> 
  drawn = false
  path.style.strokeDashoffset = length - 20

undo = ->
  if drawn then erase() else draw()

draw()
path.addEventListener("webkitTransitionEnd", undo)
