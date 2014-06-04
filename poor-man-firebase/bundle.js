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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2pveXJleHVzL1JlcG9zL3NhbmRib3gvcG9vci1tYW4tZmlyZWJhc2UvbWFpbi5jb2ZmZWUiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMvam95cmV4dXMvUmVwb3Mvc2FuZGJveC9wb29yLW1hbi1maXJlYmFzZS9tYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHFCQUFBOztBQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQUFOLENBQUE7O0FBQUEsT0FFQSxHQUNFO0FBQUEsRUFBQSxHQUFBLEVBQUssc0NBQUw7QUFBQSxFQUNBLElBQUEsRUFBTSxJQUROO0NBSEYsQ0FBQTs7QUFBQSxPQU1BLEdBQVUsU0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosR0FBQTtBQUNSLEVBQUEsSUFBRyxJQUFBLElBQVMsSUFBSSxDQUFDLFVBQUwsS0FBbUIsR0FBL0I7QUFDRSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBSSxDQUFDLElBQWpCLENBQUEsQ0FBQTtXQUNBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLElBQUksQ0FBQyxLQUYxQjtHQUFBLE1BQUE7V0FJRSxPQUFPLENBQUMsR0FBUixDQUFhLG1CQUFBLEdBQWtCLE9BQU8sQ0FBQyxHQUExQixHQUErQixHQUE1QyxFQUpGO0dBRFE7QUFBQSxDQU5WLENBQUE7O0FBQUEsR0FhQSxDQUFJLE9BQUosRUFBYSxPQUFiLENBYkEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbInhociA9IHJlcXVpcmUgXCJ4aHJcIlxuXG5vcHRpb25zID1cbiAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9kYXRhL3BlcnNvbi1qdlwiXG4gIGpzb246IHRydWVcblxuaGFuZGxlciA9IChlcnIsIHJlc3AsIGRhdGEpIC0+XG4gIGlmIHJlc3AgYW5kIHJlc3Auc3RhdHVzQ29kZSBpcyAyMDBcbiAgICBjb25zb2xlLmxvZyBkYXRhLm5hbWVcbiAgICBwZXJzb24uaW5uZXJUZXh0ID0gZGF0YS5uYW1lXG4gIGVsc2VcbiAgICBjb25zb2xlLmxvZyBcIm5vIHJlc3BvbnNlIGZyb20gI3tvcHRpb25zLnVybH0hXCJcblxueGhyIG9wdGlvbnMsIGhhbmRsZXJcbiJdfQ==
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