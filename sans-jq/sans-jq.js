// Generated by CoffeeScript 1.6.3
(function() {
  var $, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  $ = function(selector) {
    if (selector.match(/^#/)) {
      return document.querySelector(selector);
    } else {
      return document.querySelectorAll(selector);
    }
  };

  $.get = function(url, callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = callback;
    return xhr.send();
  };

  root['$'] = $;

}).call(this);
