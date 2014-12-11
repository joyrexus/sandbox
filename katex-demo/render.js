'use strict';
var fs = require('fs');
var mustache = require('mustache');
var katex = require('katex');

var formula = '\\color{#9C0}c = \\pm\\sqrt{a^2 + \\color{#F44}{b^2} }';
var view = { 
    insert: katex.renderToString(formula)
};

fs.readFile('index.mustache', 'utf-8', function (err, data) {
    if (err) { throw err; }
    var output = mustache.render(data.toString(), view);
    console.log(output);
});
