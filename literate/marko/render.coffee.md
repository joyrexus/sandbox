# Render Your Literate Coffeescript

To render your literate coffeescript (`your.coffee.md`) with the default template:

```coffeescript
coffee render.coffee.md your.coffee.md

You can define your own template and use it to render your literate scripts with the `renderLiterate` function.  Example usage:

```coffeescript
template = 'YOUR HTML ... #{data.scripts} ... YOUR HTML'
scripts = ['your.litcoffee', 'more.coffee.md']
page = embedIn(template, scripts)
console.log page
```

Or if you're template is in a file:

```coffeescript
console.log embedInFile('index.cst', ['your.litcoffee'])
```


## Source

    fs = require 'fs'
    {render, renderFile} = require 'minty'

The `embedIn` method takes a template and a list of literate scripts to embed in the template (viz., wherever you place the `data.scripts` variable to be interpolated).

    embedIn = (text, scripts) ->
      data = {}
      source = ''
      for script in scripts
        source += fs.readFileSync(script, 'utf8').toString()
      data.scripts = """
        <script type="text/literate-coffeescript">
        #{source}
        </script>
      """
      render text, data

The `embedInFile` method takes a template file and a list of literate scripts to embed in the template (viz., wherever you place the `data.scripts` variable to be interpolated).

    embedInFile = (file, scripts) ->
      template = fs.readFileSync(file, 'utf8').toString()
      embedIn template, scripts

Default template:

    TEMPLATE = '''<!DOCTYPE html>
      <meta charset="utf-8">
      <script src="http://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js"></script>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.2.9/marked.min.js"></script>
      <link rel="stylesheet" href="style.css">
      <body>
        <div id="embed"></div>
      <script type="text/coffeescript">
        options =
          gfm: true,
          pedantic: false,
          sanitize: false,
        marked.setOptions options
        i = document.scripts.length - 1
        embed.innerHTML = marked document.scripts[i].innerHTML
      </script>
      #{data.scripts}
    '''


## OK, run it

    # embed = (scripts) -> console.log embedIn TEMPLATE, scripts
    embed = (scripts) -> console.log embedInFile 'index.cst', scripts

    scripts = process.argv[2..]
    embed(scripts) if scripts.length
