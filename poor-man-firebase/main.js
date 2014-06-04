;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var handler, options, xhr;

xhr = require("xhr");

options = {
  url: "http://localhost:3000/data/person-jv",
  json: true
};

handler = function(err, resp, data) {
  if (resp && resp.statusCode === 200) {
    console.log(data.name);
    return person.innerText = data.name;
  } else {
    return console.log("no response from " + options.url + "!");
  }
};

xhr(options, handler);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2pveXJleHVzL1JlcG9zL3NhbmRib3gvcG9vci1tYW4tZmlyZWJhc2UvZ2V0LmNvZmZlZSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb3lyZXh1cy9SZXBvcy9zYW5kYm94L3Bvb3ItbWFuLWZpcmViYXNlL2dldC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxxQkFBQTs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FBTixDQUFBOztBQUFBLE9BRUEsR0FDRTtBQUFBLEVBQUEsR0FBQSxFQUFLLHNDQUFMO0FBQUEsRUFDQSxJQUFBLEVBQU0sSUFETjtDQUhGLENBQUE7O0FBQUEsT0FNQSxHQUFVLFNBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxJQUFaLEdBQUE7QUFDUixFQUFBLElBQUcsSUFBQSxJQUFTLElBQUksQ0FBQyxVQUFMLEtBQW1CLEdBQS9CO0FBQ0UsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUksQ0FBQyxJQUFqQixDQUFBLENBQUE7V0FDQSxNQUFNLENBQUMsU0FBUCxHQUFtQixJQUFJLENBQUMsS0FGMUI7R0FBQSxNQUFBO1dBSUUsT0FBTyxDQUFDLEdBQVIsQ0FBYSxtQkFBQSxHQUFrQixPQUFPLENBQUMsR0FBMUIsR0FBK0IsR0FBNUMsRUFKRjtHQURRO0FBQUEsQ0FOVixDQUFBOztBQUFBLEdBYUEsQ0FBSSxPQUFKLEVBQWEsT0FBYixDQWJBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJ4aHIgPSByZXF1aXJlIFwieGhyXCJcblxub3B0aW9ucyA9XG4gIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvZGF0YS9wZXJzb24tanZcIlxuICBqc29uOiB0cnVlXG5cbmhhbmRsZXIgPSAoZXJyLCByZXNwLCBkYXRhKSAtPlxuICBpZiByZXNwIGFuZCByZXNwLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgY29uc29sZS5sb2cgZGF0YS5uYW1lXG4gICAgcGVyc29uLmlubmVyVGV4dCA9IGRhdGEubmFtZVxuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJubyByZXNwb25zZSBmcm9tICN7b3B0aW9ucy51cmx9IVwiXG5cbnhociBvcHRpb25zLCBoYW5kbGVyXG4iXX0=
},{"xhr":2}],2:[function(require,module,exports){
var window = require("global/window")
var once = require("once")

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ?
        window.XMLHttpRequest : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr && options.cors) {
        xhr = new XDR()
    } else if (!xhr) {
        xhr = new XHR()
    }

    var uri = xhr.url = options.uri || options.url;
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var key

    if ("json" in options) {
        isJson = true
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
    if (options.cors) {
        xhr.withCredentials = true
    }
    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function load() {
        var error = null
        var status = xhr.statusCode = xhr.status
        var body = xhr.body = xhr.response ||
            xhr.responseText || xhr.responseXML

        if (status === 1223) {
            status = 204
        }

        if (status === 0 || (status >= 400 && status < 600)) {
            var message = xhr.responseText ||
                messages[String(xhr.status).charAt(0)]
            error = new Error(message)

            error.statusCode = xhr.status
        }

        if (isJson) {
            try {
                body = xhr.body = JSON.parse(body)
            } catch (e) {}
        }

        callback(error, xhr, body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}

},{"global/window":3,"once":4}],3:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};if (typeof window !== "undefined") {
    module.exports = window
} else if (typeof global !== "undefined") {
    module.exports = global
} else {
    module.exports = {}
}

},{}],4:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}]},{},[1])
;