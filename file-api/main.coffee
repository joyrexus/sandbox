window.rows = []

# load handler invoked on change event
load = -> 
  File = @files[0]
  return if not File.name.match '\.tsv$'
  file.textContent = File.name
  reader = new FileReader()
  reader.onload = (file) -> 
    @result.split('\n').map (row) -> 
      window.rows.push(row.split('\t')) if row.match /^\d/
    data.textContent = @result
  reader.readAsText File

# click and choose a file to load
chooser.addEventListener('change', load)    
file.addEventListener('click', -> chooser.click())
