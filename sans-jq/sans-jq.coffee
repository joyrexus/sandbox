root = exports ? @

$ = (selector) -> 
  if selector.match /^#/
    document.querySelector selector
  else
    document.querySelectorAll selector

$.get = (url, callback) ->
   xhr = new XMLHttpRequest()
   xhr.open "GET", url, true
   xhr.onload = callback
   xhr.send()

root['$'] = $
