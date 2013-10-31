i = document.scripts.length - 1
markdown.innerHTML = marked document.scripts[i].innerHTML
for block in document.querySelectorAll 'code'
  block.className = "prettyprint lang-coffee"

hello = (name) -> "hello #{name}!".toUpperCase()
hi.innerHTML = "<h1>#{hello 'world'}</h1>"
