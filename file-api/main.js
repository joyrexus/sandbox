(function() {
  var load;

  window.rows = [];

  load = function() {
    var File, reader;
    File = this.files[0];
    if (!File.name.match('\.tsv$')) {
      return;
    }
    file.textContent = File.name;
    reader = new FileReader();
    reader.onload = function(file) {
      this.result.split('\n').map(function(row) {
        if (row.match(/^\d/)) {
          window.rows.push(row.split('\t'));
        }
      });
      data.textContent = this.result;
    };
    reader.readAsText(File);
  };

  chooser.addEventListener('change', load);

  file.addEventListener('click', function() {
    chooser.click();
  });

}).call(this);
