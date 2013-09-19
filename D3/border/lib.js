d3 = function() {
    var π = Math.PI, ε = 1e-6, d3 = {
        version: "3.0.6"
    }, d3_radians = π / 180, d3_degrees = 180 / π, d3_document = document, d3_window = window;
    function d3_target(d) {
        return d.target;
    }
    function d3_source(d) {
        return d.source;
    }
    var d3_format_decimalPoint = ".", d3_format_thousandsSeparator = ",", d3_format_grouping = [ 3, 3 ];
    if (!Date.now) Date.now = function() {
        return +new Date();
    };
    try {
        d3_document.createElement("div").style.setProperty("opacity", 0, "");
    } catch (error) {
        var d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
        d3_style_prototype.setProperty = function(name, value, priority) {
            d3_style_setProperty.call(this, name, value + "", priority);
        };
    }
    function d3_class(ctor, properties) {
        try {
            for (var key in properties) {
                Object.defineProperty(ctor.prototype, key, {
                    value: properties[key],
                    enumerable: false
                });
            }
        } catch (e) {
            ctor.prototype = properties;
        }
    }
    var d3_array = d3_arraySlice;
    function d3_arrayCopy(pseudoarray) {
        var i = -1, n = pseudoarray.length, array = [];
        while (++i < n) array.push(pseudoarray[i]);
        return array;
    }
    function d3_arraySlice(pseudoarray) {
        return Array.prototype.slice.call(pseudoarray);
    }
    try {
        d3_array(d3_document.documentElement.childNodes)[0].nodeType;
    } catch (e) {
        d3_array = d3_arrayCopy;
    }
    var d3_arraySubclass = [].__proto__ ? function(array, prototype) {
        array.__proto__ = prototype;
    } : function(array, prototype) {
        for (var property in prototype) array[property] = prototype[property];
    };
    d3.map = function(object) {
        var map = new d3_Map();
        for (var key in object) map.set(key, object[key]);
        return map;
    };
    function d3_Map() {}
    d3_class(d3_Map, {
        has: function(key) {
            return d3_map_prefix + key in this;
        },
        get: function(key) {
            return this[d3_map_prefix + key];
        },
        set: function(key, value) {
            return this[d3_map_prefix + key] = value;
        },
        remove: function(key) {
            key = d3_map_prefix + key;
            return key in this && delete this[key];
        },
        keys: function() {
            var keys = [];
            this.forEach(function(key) {
                keys.push(key);
            });
            return keys;
        },
        values: function() {
            var values = [];
            this.forEach(function(key, value) {
                values.push(value);
            });
            return values;
        },
        entries: function() {
            var entries = [];
            this.forEach(function(key, value) {
                entries.push({
                    key: key,
                    value: value
                });
            });
            return entries;
        },
        forEach: function(f) {
            for (var key in this) {
                if (key.charCodeAt(0) === d3_map_prefixCode) {
                    f.call(this, key.substring(1), this[key]);
                }
            }
        }
    });
    var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
    function d3_identity(d) {
        return d;
    }
    function d3_true() {
        return true;
    }
    function d3_functor(v) {
        return typeof v === "function" ? v : function() {
            return v;
        };
    }
    d3.functor = d3_functor;
    d3.rebind = function(target, source) {
        var i = 1, n = arguments.length, method;
        while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
        return target;
    };
    function d3_rebind(target, source, method) {
        return function() {
            var value = method.apply(source, arguments);
            return arguments.length ? target : value;
        };
    }
    d3.ascending = function(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    };
    d3.descending = function(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    };
    d3.mean = function(array, f) {
        var n = array.length, a, m = 0, i = -1, j = 0;
        if (arguments.length === 1) {
            while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
        } else {
            while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
        }
        return j ? m : undefined;
    };
    d3.median = function(array, f) {
        if (arguments.length > 1) array = array.map(f);
        array = array.filter(d3_number);
        return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
    };
    d3.min = function(array, f) {
        var i = -1, n = array.length, a, b;
        if (arguments.length === 1) {
            while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
            while (++i < n) if ((b = array[i]) != null && a > b) a = b;
        } else {
            while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
        }
        return a;
    };
    d3.max = function(array, f) {
        var i = -1, n = array.length, a, b;
        if (arguments.length === 1) {
            while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
            while (++i < n) if ((b = array[i]) != null && b > a) a = b;
        } else {
            while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
        }
        return a;
    };
    d3.extent = function(array, f) {
        var i = -1, n = array.length, a, b, c;
        if (arguments.length === 1) {
            while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
            while (++i < n) if ((b = array[i]) != null) {
                if (a > b) a = b;
                if (c < b) c = b;
            }
        } else {
            while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
                if (a > b) a = b;
                if (c < b) c = b;
            }
        }
        return [ a, c ];
    };
    d3.random = {
        normal: function(µ, σ) {
            var n = arguments.length;
            if (n < 2) σ = 1;
            if (n < 1) µ = 0;
            return function() {
                var x, y, r;
                do {
                    x = Math.random() * 2 - 1;
                    y = Math.random() * 2 - 1;
                    r = x * x + y * y;
                } while (!r || r > 1);
                return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
            };
        },
        logNormal: function() {
            var random = d3.random.normal.apply(d3, arguments);
            return function() {
                return Math.exp(random());
            };
        },
        irwinHall: function(m) {
            return function() {
                for (var s = 0, j = 0; j < m; j++) s += Math.random();
                return s / m;
            };
        }
    };
    function d3_number(x) {
        return x != null && !isNaN(x);
    }
    d3.sum = function(array, f) {
        var s = 0, n = array.length, a, i = -1;
        if (arguments.length === 1) {
            while (++i < n) if (!isNaN(a = +array[i])) s += a;
        } else {
            while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
        }
        return s;
    };
    d3.quantile = function(values, p) {
        var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
        return e ? v + e * (values[h] - v) : v;
    };
    d3.shuffle = function(array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.random() * m-- | 0;
            t = array[m], array[m] = array[i], array[i] = t;
        }
        return array;
    };
    d3.transpose = function(matrix) {
        return d3.zip.apply(d3, matrix);
    };
    d3.zip = function() {
        if (!(n = arguments.length)) return [];
        for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
            for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
                zip[j] = arguments[j][i];
            }
        }
        return zips;
    };
    function d3_zipLength(d) {
        return d.length;
    }
    d3.bisector = function(f) {
        return {
            left: function(a, x, lo, hi) {
                if (arguments.length < 3) lo = 0;
                if (arguments.length < 4) hi = a.length;
                while (lo < hi) {
                    var mid = lo + hi >>> 1;
                    if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
                }
                return lo;
            },
            right: function(a, x, lo, hi) {
                if (arguments.length < 3) lo = 0;
                if (arguments.length < 4) hi = a.length;
                while (lo < hi) {
                    var mid = lo + hi >>> 1;
                    if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
                }
                return lo;
            }
        };
    };
    var d3_bisector = d3.bisector(function(d) {
        return d;
    });
    d3.bisectLeft = d3_bisector.left;
    d3.bisect = d3.bisectRight = d3_bisector.right;
    d3.nest = function() {
        var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
        function map(array, depth) {
            if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
            var i = -1, n = array.length, key = keys[depth++], keyValue, object, valuesByKey = new d3_Map(), values, o = {};
            while (++i < n) {
                if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
                    values.push(object);
                } else {
                    valuesByKey.set(keyValue, [ object ]);
                }
            }
            valuesByKey.forEach(function(keyValue, values) {
                o[keyValue] = map(values, depth);
            });
            return o;
        }
        function entries(map, depth) {
            if (depth >= keys.length) return map;
            var a = [], sortKey = sortKeys[depth++], key;
            for (key in map) {
                a.push({
                    key: key,
                    values: entries(map[key], depth)
                });
            }
            if (sortKey) a.sort(function(a, b) {
                return sortKey(a.key, b.key);
            });
            return a;
        }
        nest.map = function(array) {
            return map(array, 0);
        };
        nest.entries = function(array) {
            return entries(map(array, 0), 0);
        };
        nest.key = function(d) {
            keys.push(d);
            return nest;
        };
        nest.sortKeys = function(order) {
            sortKeys[keys.length - 1] = order;
            return nest;
        };
        nest.sortValues = function(order) {
            sortValues = order;
            return nest;
        };
        nest.rollup = function(f) {
            rollup = f;
            return nest;
        };
        return nest;
    };
    d3.keys = function(map) {
        var keys = [];
        for (var key in map) keys.push(key);
        return keys;
    };
    d3.values = function(map) {
        var values = [];
        for (var key in map) values.push(map[key]);
        return values;
    };
    d3.entries = function(map) {
        var entries = [];
        for (var key in map) entries.push({
            key: key,
            value: map[key]
        });
        return entries;
    };
    d3.permute = function(array, indexes) {
        var permutes = [], i = -1, n = indexes.length;
        while (++i < n) permutes[i] = array[indexes[i]];
        return permutes;
    };
    d3.merge = function(arrays) {
        return Array.prototype.concat.apply([], arrays);
    };
    function d3_collapse(s) {
        return s.trim().replace(/\s+/g, " ");
    }
    d3.range = function(start, stop, step) {
        if (arguments.length < 3) {
            step = 1;
            if (arguments.length < 2) {
                stop = start;
                start = 0;
            }
        }
        if ((stop - start) / step === Infinity) throw new Error("infinite range");
        var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
        start *= k, stop *= k, step *= k;
        if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
        return range;
    };
    function d3_range_integerScale(x) {
        var k = 1;
        while (x * k % 1) k *= 10;
        return k;
    }
    d3.requote = function(s) {
        return s.replace(d3_requote_re, "\\$&");
    };
    var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function(x, n) {
        return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
    };
    d3.xhr = function(url, mimeType, callback) {
        var xhr = {}, dispatch = d3.dispatch("progress", "load", "error"), headers = {}, response = d3_identity, request = new (d3_window.XDomainRequest && /^(http(s)?:)?\/\//.test(url) ? XDomainRequest : XMLHttpRequest)();
        "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
            request.readyState > 3 && respond();
        };
        function respond() {
            var s = request.status;
            !s && request.responseText || s >= 200 && s < 300 || s === 304 ? dispatch.load.call(xhr, response.call(xhr, request)) : dispatch.error.call(xhr, request);
        }
        request.onprogress = function(event) {
            var o = d3.event;
            d3.event = event;
            try {
                dispatch.progress.call(xhr, request);
            } finally {
                d3.event = o;
            }
        };
        xhr.header = function(name, value) {
            name = (name + "").toLowerCase();
            if (arguments.length < 2) return headers[name];
            if (value == null) delete headers[name]; else headers[name] = value + "";
            return xhr;
        };
        xhr.mimeType = function(value) {
            if (!arguments.length) return mimeType;
            mimeType = value == null ? null : value + "";
            return xhr;
        };
        xhr.response = function(value) {
            response = value;
            return xhr;
        };
        [ "get", "post" ].forEach(function(method) {
            xhr[method] = function() {
                return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
            };
        });
        xhr.send = function(method, data, callback) {
            if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
            request.open(method, url, true);
            if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
            if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
            if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
            if (callback != null) xhr.on("error", callback).on("load", function(request) {
                callback(null, request);
            });
            request.send(data == null ? null : data);
            return xhr;
        };
        xhr.abort = function() {
            request.abort();
            return xhr;
        };
        d3.rebind(xhr, dispatch, "on");
        if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
        mimeType = null;
        return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
    };
    function d3_xhr_fixCallback(callback) {
        return callback.length === 1 ? function(error, request) {
            callback(error == null ? request : null);
        } : callback;
    }
    d3.text = function() {
        return d3.xhr.apply(d3, arguments).response(d3_text);
    };
    function d3_text(request) {
        return request.responseText;
    }
    d3.json = function(url, callback) {
        return d3.xhr(url, "application/json", callback).response(d3_json);
    };
    function d3_json(request) {
        return JSON.parse(request.responseText);
    }
    d3.html = function(url, callback) {
        return d3.xhr(url, "text/html", callback).response(d3_html);
    };
    function d3_html(request) {
        var range = d3_document.createRange();
        range.selectNode(d3_document.body);
        return range.createContextualFragment(request.responseText);
    }
    d3.xml = function() {
        return d3.xhr.apply(d3, arguments).response(d3_xml);
    };
    function d3_xml(request) {
        return request.responseXML;
    }
    var d3_nsPrefix = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: d3_nsPrefix,
        qualify: function(name) {
            var i = name.indexOf(":"), prefix = name;
            if (i >= 0) {
                prefix = name.substring(0, i);
                name = name.substring(i + 1);
            }
            return d3_nsPrefix.hasOwnProperty(prefix) ? {
                space: d3_nsPrefix[prefix],
                local: name
            } : name;
        }
    };
    d3.dispatch = function() {
        var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
        while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        return dispatch;
    };
    function d3_dispatch() {}
    d3_dispatch.prototype.on = function(type, listener) {
        var i = type.indexOf("."), name = "";
        if (i > 0) {
            name = type.substring(i + 1);
            type = type.substring(0, i);
        }
        return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    };
    function d3_dispatch_event(dispatch) {
        var listeners = [], listenerByName = new d3_Map();
        function event() {
            var z = listeners, i = -1, n = z.length, l;
            while (++i < n) if (l = z[i].on) l.apply(this, arguments);
            return dispatch;
        }
        event.on = function(name, listener) {
            var l = listenerByName.get(name), i;
            if (arguments.length < 2) return l && l.on;
            if (l) {
                l.on = null;
                listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
                listenerByName.remove(name);
            }
            if (listener) listeners.push(listenerByName.set(name, {
                on: listener
            }));
            return dispatch;
        };
        return event;
    }
    d3.format = function(specifier) {
        var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "", basePrefix = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
        if (precision) precision = +precision.substring(1);
        if (zfill || fill === "0" && align === "=") {
            zfill = fill = "0";
            align = "=";
            if (comma) width -= Math.floor((width - 1) / 4);
        }
        switch (type) {
          case "n":
            comma = true;
            type = "g";
            break;

          case "%":
            scale = 100;
            suffix = "%";
            type = "f";
            break;

          case "p":
            scale = 100;
            suffix = "%";
            type = "r";
            break;

          case "b":
          case "o":
          case "x":
          case "X":
            if (basePrefix) basePrefix = "0" + type.toLowerCase();

          case "c":
          case "d":
            integer = true;
            precision = 0;
            break;

          case "s":
            scale = -1;
            type = "r";
            break;
        }
        if (basePrefix === "#") basePrefix = "";
        if (type == "r" && !precision) type = "g";
        type = d3_format_types.get(type) || d3_format_typeDefault;
        var zcomma = zfill && comma;
        return function(value) {
            if (integer && value % 1) return "";
            var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
            if (scale < 0) {
                var prefix = d3.formatPrefix(value, precision);
                value = prefix.scale(value);
                suffix = prefix.symbol;
            } else {
                value *= scale;
            }
            value = type(value, precision);
            if (!zfill && comma) value = d3_format_group(value);
            var length = basePrefix.length + value.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
            if (zcomma) value = d3_format_group(padding + value);
            if (d3_format_decimalPoint) value.replace(".", d3_format_decimalPoint);
            negative += basePrefix;
            return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix;
        };
    };
    var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;
    var d3_format_types = d3.map({
        b: function(x) {
            return x.toString(2);
        },
        c: function(x) {
            return String.fromCharCode(x);
        },
        o: function(x) {
            return x.toString(8);
        },
        x: function(x) {
            return x.toString(16);
        },
        X: function(x) {
            return x.toString(16).toUpperCase();
        },
        g: function(x, p) {
            return x.toPrecision(p);
        },
        e: function(x, p) {
            return x.toExponential(p);
        },
        f: function(x, p) {
            return x.toFixed(p);
        },
        r: function(x, p) {
            return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
        }
    });
    function d3_format_precision(x, p) {
        return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
    }
    function d3_format_typeDefault(x) {
        return x + "";
    }
    var d3_format_group = d3_identity;
    if (d3_format_grouping) {
        var d3_format_groupingLength = d3_format_grouping.length;
        d3_format_group = function(value) {
            var i = value.lastIndexOf("."), f = i >= 0 ? "." + value.substring(i + 1) : (i = value.length, 
            ""), t = [], j = 0, g = d3_format_grouping[0];
            while (i > 0 && g > 0) {
                t.push(value.substring(i -= g, i + g));
                g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
            }
            return t.reverse().join(d3_format_thousandsSeparator || "") + f;
        };
    }
    var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
    d3.formatPrefix = function(value, precision) {
        var i = 0;
        if (value) {
            if (value < 0) value *= -1;
            if (precision) value = d3.round(value, d3_format_precision(value, precision));
            i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
            i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
        }
        return d3_formatPrefixes[8 + i / 3];
    };
    function d3_formatPrefix(d, i) {
        var k = Math.pow(10, Math.abs(8 - i) * 3);
        return {
            scale: i > 8 ? function(d) {
                return d / k;
            } : function(d) {
                return d * k;
            },
            symbol: d
        };
    }
    var d3_ease_default = function() {
        return d3_identity;
    };
    var d3_ease = d3.map({
        linear: d3_ease_default,
        poly: d3_ease_poly,
        quad: function() {
            return d3_ease_quad;
        },
        cubic: function() {
            return d3_ease_cubic;
        },
        sin: function() {
            return d3_ease_sin;
        },
        exp: function() {
            return d3_ease_exp;
        },
        circle: function() {
            return d3_ease_circle;
        },
        elastic: d3_ease_elastic,
        back: d3_ease_back,
        bounce: function() {
            return d3_ease_bounce;
        }
    });
    var d3_ease_mode = d3.map({
        "in": d3_identity,
        out: d3_ease_reverse,
        "in-out": d3_ease_reflect,
        "out-in": function(f) {
            return d3_ease_reflect(d3_ease_reverse(f));
        }
    });
    d3.ease = function(name) {
        var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
        t = d3_ease.get(t) || d3_ease_default;
        m = d3_ease_mode.get(m) || d3_identity;
        return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
    };
    function d3_ease_clamp(f) {
        return function(t) {
            return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
        };
    }
    function d3_ease_reverse(f) {
        return function(t) {
            return 1 - f(1 - t);
        };
    }
    function d3_ease_reflect(f) {
        return function(t) {
            return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
        };
    }
    function d3_ease_quad(t) {
        return t * t;
    }
    function d3_ease_cubic(t) {
        return t * t * t;
    }
    function d3_ease_cubicInOut(t) {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        var t2 = t * t, t3 = t2 * t;
        return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
    }
    function d3_ease_poly(e) {
        return function(t) {
            return Math.pow(t, e);
        };
    }
    function d3_ease_sin(t) {
        return 1 - Math.cos(t * π / 2);
    }
    function d3_ease_exp(t) {
        return Math.pow(2, 10 * (t - 1));
    }
    function d3_ease_circle(t) {
        return 1 - Math.sqrt(1 - t * t);
    }
    function d3_ease_elastic(a, p) {
        var s;
        if (arguments.length < 2) p = .45;
        if (arguments.length) s = p / (2 * π) * Math.asin(1 / a); else a = 1, s = p / 4;
        return function(t) {
            return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * π / p);
        };
    }
    function d3_ease_back(s) {
        if (!s) s = 1.70158;
        return function(t) {
            return t * t * ((s + 1) * t - s);
        };
    }
    function d3_ease_bounce(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }
    d3.event = null;
    function d3_eventCancel() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
    }
    function d3_eventSource() {
        var e = d3.event, s;
        while (s = e.sourceEvent) e = s;
        return e;
    }
    function d3_eventDispatch(target) {
        var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
        while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        dispatch.of = function(thiz, argumentz) {
            return function(e1) {
                try {
                    var e0 = e1.sourceEvent = d3.event;
                    e1.target = target;
                    d3.event = e1;
                    dispatch[e1.type].apply(thiz, argumentz);
                } finally {
                    d3.event = e0;
                }
            };
        };
        return dispatch;
    }
    d3.transform = function(string) {
        var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
        return (d3.transform = function(string) {
            g.setAttribute("transform", string);
            var t = g.transform.baseVal.consolidate();
            return new d3_transform(t ? t.matrix : d3_transformIdentity);
        })(string);
    };
    function d3_transform(m) {
        var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
        if (r0[0] * r1[1] < r1[0] * r0[1]) {
            r0[0] *= -1;
            r0[1] *= -1;
            kx *= -1;
            kz *= -1;
        }
        this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
        this.translate = [ m.e, m.f ];
        this.scale = [ kx, ky ];
        this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
    }
    d3_transform.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
    };
    function d3_transformDot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    function d3_transformNormalize(a) {
        var k = Math.sqrt(d3_transformDot(a, a));
        if (k) {
            a[0] /= k;
            a[1] /= k;
        }
        return k;
    }
    function d3_transformCombine(a, b, k) {
        a[0] += k * b[0];
        a[1] += k * b[1];
        return a;
    }
    var d3_transformIdentity = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    d3.interpolate = function(a, b) {
        var i = d3.interpolators.length, f;
        while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
        return f;
    };
    d3.interpolateNumber = function(a, b) {
        b -= a;
        return function(t) {
            return a + b * t;
        };
    };
    d3.interpolateRound = function(a, b) {
        b -= a;
        return function(t) {
            return Math.round(a + b * t);
        };
    };
    d3.interpolateString = function(a, b) {
        var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
        d3_interpolate_number.lastIndex = 0;
        for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
            if (m.index) s.push(b.substring(s0, s1 = m.index));
            q.push({
                i: s.length,
                x: m[0]
            });
            s.push(null);
            s0 = d3_interpolate_number.lastIndex;
        }
        if (s0 < b.length) s.push(b.substring(s0));
        for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
            o = q[i];
            if (o.x == m[0]) {
                if (o.i) {
                    if (s[o.i + 1] == null) {
                        s[o.i - 1] += o.x;
                        s.splice(o.i, 1);
                        for (j = i + 1; j < n; ++j) q[j].i--;
                    } else {
                        s[o.i - 1] += o.x + s[o.i + 1];
                        s.splice(o.i, 2);
                        for (j = i + 1; j < n; ++j) q[j].i -= 2;
                    }
                } else {
                    if (s[o.i + 1] == null) {
                        s[o.i] = o.x;
                    } else {
                        s[o.i] = o.x + s[o.i + 1];
                        s.splice(o.i + 1, 1);
                        for (j = i + 1; j < n; ++j) q[j].i--;
                    }
                }
                q.splice(i, 1);
                n--;
                i--;
            } else {
                o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
            }
        }
        while (i < n) {
            o = q.pop();
            if (s[o.i + 1] == null) {
                s[o.i] = o.x;
            } else {
                s[o.i] = o.x + s[o.i + 1];
                s.splice(o.i + 1, 1);
            }
            n--;
        }
        if (s.length === 1) {
            return s[0] == null ? q[0].x : function() {
                return b;
            };
        }
        return function(t) {
            for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
    d3.interpolateTransform = function(a, b) {
        var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
        if (ta[0] != tb[0] || ta[1] != tb[1]) {
            s.push("translate(", null, ",", null, ")");
            q.push({
                i: 1,
                x: d3.interpolateNumber(ta[0], tb[0])
            }, {
                i: 3,
                x: d3.interpolateNumber(ta[1], tb[1])
            });
        } else if (tb[0] || tb[1]) {
            s.push("translate(" + tb + ")");
        } else {
            s.push("");
        }
        if (ra != rb) {
            if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
            q.push({
                i: s.push(s.pop() + "rotate(", null, ")") - 2,
                x: d3.interpolateNumber(ra, rb)
            });
        } else if (rb) {
            s.push(s.pop() + "rotate(" + rb + ")");
        }
        if (wa != wb) {
            q.push({
                i: s.push(s.pop() + "skewX(", null, ")") - 2,
                x: d3.interpolateNumber(wa, wb)
            });
        } else if (wb) {
            s.push(s.pop() + "skewX(" + wb + ")");
        }
        if (ka[0] != kb[0] || ka[1] != kb[1]) {
            n = s.push(s.pop() + "scale(", null, ",", null, ")");
            q.push({
                i: n - 4,
                x: d3.interpolateNumber(ka[0], kb[0])
            }, {
                i: n - 2,
                x: d3.interpolateNumber(ka[1], kb[1])
            });
        } else if (kb[0] != 1 || kb[1] != 1) {
            s.push(s.pop() + "scale(" + kb + ")");
        }
        n = q.length;
        return function(t) {
            var i = -1, o;
            while (++i < n) s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
    d3.interpolateRgb = function(a, b) {
        a = d3.rgb(a);
        b = d3.rgb(b);
        var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
        return function(t) {
            return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
        };
    };
    d3.interpolateHsl = function(a, b) {
        a = d3.hsl(a);
        b = d3.hsl(b);
        var h0 = a.h, s0 = a.s, l0 = a.l, h1 = b.h - h0, s1 = b.s - s0, l1 = b.l - l0;
        if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360;
        return function(t) {
            return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t) + "";
        };
    };
    d3.interpolateLab = function(a, b) {
        a = d3.lab(a);
        b = d3.lab(b);
        var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
        return function(t) {
            return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
        };
    };
    d3.interpolateHcl = function(a, b) {
        a = d3.hcl(a);
        b = d3.hcl(b);
        var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
        if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
        return function(t) {
            return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
        };
    };
    d3.interpolateArray = function(a, b) {
        var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
        for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
        for (;i < na; ++i) c[i] = a[i];
        for (;i < nb; ++i) c[i] = b[i];
        return function(t) {
            for (i = 0; i < n0; ++i) c[i] = x[i](t);
            return c;
        };
    };
    d3.interpolateObject = function(a, b) {
        var i = {}, c = {}, k;
        for (k in a) {
            if (k in b) {
                i[k] = d3_interpolateByName(k)(a[k], b[k]);
            } else {
                c[k] = a[k];
            }
        }
        for (k in b) {
            if (!(k in a)) {
                c[k] = b[k];
            }
        }
        return function(t) {
            for (k in i) c[k] = i[k](t);
            return c;
        };
    };
    var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    function d3_interpolateByName(name) {
        return name == "transform" ? d3.interpolateTransform : d3.interpolate;
    }
    d3.interpolators = [ d3.interpolateObject, function(a, b) {
        return b instanceof Array && d3.interpolateArray(a, b);
    }, function(a, b) {
        return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + "");
    }, function(a, b) {
        return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Color) && d3.interpolateRgb(a, b);
    }, function(a, b) {
        return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b);
    } ];
    function d3_uninterpolateNumber(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function(x) {
            return (x - a) * b;
        };
    }
    function d3_uninterpolateClamp(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function(x) {
            return Math.max(0, Math.min(1, (x - a) * b));
        };
    }
    function d3_Color() {}
    d3_Color.prototype.toString = function() {
        return this.rgb() + "";
    };
    d3.rgb = function(r, g, b) {
        return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
    };
    function d3_rgb(r, g, b) {
        return new d3_Rgb(r, g, b);
    }
    function d3_Rgb(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color();
    d3_rgbPrototype.brighter = function(k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        var r = this.r, g = this.g, b = this.b, i = 30;
        if (!r && !g && !b) return d3_rgb(i, i, i);
        if (r && r < i) r = i;
        if (g && g < i) g = i;
        if (b && b < i) b = i;
        return d3_rgb(Math.min(255, Math.floor(r / k)), Math.min(255, Math.floor(g / k)), Math.min(255, Math.floor(b / k)));
    };
    d3_rgbPrototype.darker = function(k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_rgb(Math.floor(k * this.r), Math.floor(k * this.g), Math.floor(k * this.b));
    };
    d3_rgbPrototype.hsl = function() {
        return d3_rgb_hsl(this.r, this.g, this.b);
    };
    d3_rgbPrototype.toString = function() {
        return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
    };
    function d3_rgb_hex(v) {
        return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
    }
    function d3_rgb_parse(format, rgb, hsl) {
        var r = 0, g = 0, b = 0, m1, m2, name;
        m1 = /([a-z]+)\((.*)\)/i.exec(format);
        if (m1) {
            m2 = m1[2].split(",");
            switch (m1[1]) {
              case "hsl":
                {
                    return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
                }

              case "rgb":
                {
                    return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
                }
            }
        }
        if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
        if (format != null && format.charAt(0) === "#") {
            if (format.length === 4) {
                r = format.charAt(1);
                r += r;
                g = format.charAt(2);
                g += g;
                b = format.charAt(3);
                b += b;
            } else if (format.length === 7) {
                r = format.substring(1, 3);
                g = format.substring(3, 5);
                b = format.substring(5, 7);
            }
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
        }
        return rgb(r, g, b);
    }
    function d3_rgb_hsl(r, g, b) {
        var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
        if (d) {
            s = l < .5 ? d / (max + min) : d / (2 - max - min);
            if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
            h *= 60;
        } else {
            s = h = 0;
        }
        return d3_hsl(h, s, l);
    }
    function d3_rgb_lab(r, g, b) {
        r = d3_rgb_xyz(r);
        g = d3_rgb_xyz(g);
        b = d3_rgb_xyz(b);
        var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
        return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
    }
    function d3_rgb_xyz(r) {
        return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
    }
    function d3_rgb_parseNumber(c) {
        var f = parseFloat(c);
        return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
    }
    var d3_rgb_names = d3.map({
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    });
    d3_rgb_names.forEach(function(key, value) {
        d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
    });
    d3.hsl = function(h, s, l) {
        return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
    };
    function d3_hsl(h, s, l) {
        return new d3_Hsl(h, s, l);
    }
    function d3_Hsl(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
    var d3_hslPrototype = d3_Hsl.prototype = new d3_Color();
    d3_hslPrototype.brighter = function(k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_hsl(this.h, this.s, this.l / k);
    };
    d3_hslPrototype.darker = function(k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_hsl(this.h, this.s, k * this.l);
    };
    d3_hslPrototype.rgb = function() {
        return d3_hsl_rgb(this.h, this.s, this.l);
    };
    function d3_hsl_rgb(h, s, l) {
        var m1, m2;
        h = h % 360;
        if (h < 0) h += 360;
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        l = l < 0 ? 0 : l > 1 ? 1 : l;
        m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
        m1 = 2 * l - m2;
        function v(h) {
            if (h > 360) h -= 360; else if (h < 0) h += 360;
            if (h < 60) return m1 + (m2 - m1) * h / 60;
            if (h < 180) return m2;
            if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
            return m1;
        }
        function vv(h) {
            return Math.round(v(h) * 255);
        }
        return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
    }
    d3.hcl = function(h, c, l) {
        return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
    };
    function d3_hcl(h, c, l) {
        return new d3_Hcl(h, c, l);
    }
    function d3_Hcl(h, c, l) {
        this.h = h;
        this.c = c;
        this.l = l;
    }
    var d3_hclPrototype = d3_Hcl.prototype = new d3_Color();
    d3_hclPrototype.brighter = function(k) {
        return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_hclPrototype.darker = function(k) {
        return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_hclPrototype.rgb = function() {
        return d3_hcl_lab(this.h, this.c, this.l).rgb();
    };
    function d3_hcl_lab(h, c, l) {
        return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
    }
    d3.lab = function(l, a, b) {
        return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
    };
    function d3_lab(l, a, b) {
        return new d3_Lab(l, a, b);
    }
    function d3_Lab(l, a, b) {
        this.l = l;
        this.a = a;
        this.b = b;
    }
    var d3_lab_K = 18;
    var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
    var d3_labPrototype = d3_Lab.prototype = new d3_Color();
    d3_labPrototype.brighter = function(k) {
        return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_labPrototype.darker = function(k) {
        return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_labPrototype.rgb = function() {
        return d3_lab_rgb(this.l, this.a, this.b);
    };
    function d3_lab_rgb(l, a, b) {
        var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
        x = d3_lab_xyz(x) * d3_lab_X;
        y = d3_lab_xyz(y) * d3_lab_Y;
        z = d3_lab_xyz(z) * d3_lab_Z;
        return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
    }
    function d3_lab_hcl(l, a, b) {
        return d3_hcl(Math.atan2(b, a) / π * 180, Math.sqrt(a * a + b * b), l);
    }
    function d3_lab_xyz(x) {
        return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
    }
    function d3_xyz_lab(x) {
        return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
    }
    function d3_xyz_rgb(r) {
        return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
    }
    function d3_selection(groups) {
        d3_arraySubclass(groups, d3_selectionPrototype);
        return groups;
    }
    var d3_select = function(s, n) {
        return n.querySelector(s);
    }, d3_selectAll = function(s, n) {
        return n.querySelectorAll(s);
    }, d3_selectRoot = d3_document.documentElement, d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector, d3_selectMatches = function(n, s) {
        return d3_selectMatcher.call(n, s);
    };
    if (typeof Sizzle === "function") {
        d3_select = function(s, n) {
            return Sizzle(s, n)[0] || null;
        };
        d3_selectAll = function(s, n) {
            return Sizzle.uniqueSort(Sizzle(s, n));
        };
        d3_selectMatches = Sizzle.matchesSelector;
    }
    var d3_selectionPrototype = [];
    d3.selection = function() {
        return d3_selectionRoot;
    };
    d3.selection.prototype = d3_selectionPrototype;
    d3_selectionPrototype.select = function(selector) {
        var subgroups = [], subgroup, subnode, group, node;
        if (typeof selector !== "function") selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = -1, n = group.length; ++i < n; ) {
                if (node = group[i]) {
                    subgroup.push(subnode = selector.call(node, node.__data__, i));
                    if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_selection(subgroups);
    };
    function d3_selection_selector(selector) {
        return function() {
            return d3_select(selector, this);
        };
    }
    d3_selectionPrototype.selectAll = function(selector) {
        var subgroups = [], subgroup, node;
        if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
                if (node = group[i]) {
                    subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
                    subgroup.parentNode = node;
                }
            }
        }
        return d3_selection(subgroups);
    };
    function d3_selection_selectorAll(selector) {
        return function() {
            return d3_selectAll(selector, this);
        };
    }
    d3_selectionPrototype.attr = function(name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") {
                var node = this.node();
                name = d3.ns.qualify(name);
                return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
            }
            for (value in name) this.each(d3_selection_attr(value, name[value]));
            return this;
        }
        return this.each(d3_selection_attr(name, value));
    };
    function d3_selection_attr(name, value) {
        name = d3.ns.qualify(name);
        function attrNull() {
            this.removeAttribute(name);
        }
        function attrNullNS() {
            this.removeAttributeNS(name.space, name.local);
        }
        function attrConstant() {
            this.setAttribute(name, value);
        }
        function attrConstantNS() {
            this.setAttributeNS(name.space, name.local, value);
        }
        function attrFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
        }
        function attrFunctionNS() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
        }
        return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
    }
    d3_selectionPrototype.classed = function(name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") {
                var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
                if (value = node.classList) {
                    while (++i < n) if (!value.contains(name[i])) return false;
                } else {
                    value = node.className;
                    if (value.baseVal != null) value = value.baseVal;
                    while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
                }
                return true;
            }
            for (value in name) this.each(d3_selection_classed(value, name[value]));
            return this;
        }
        return this.each(d3_selection_classed(name, value));
    };
    function d3_selection_classedRe(name) {
        return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
    }
    function d3_selection_classed(name, value) {
        name = name.trim().split(/\s+/).map(d3_selection_classedName);
        var n = name.length;
        function classedConstant() {
            var i = -1;
            while (++i < n) name[i](this, value);
        }
        function classedFunction() {
            var i = -1, x = value.apply(this, arguments);
            while (++i < n) name[i](this, x);
        }
        return typeof value === "function" ? classedFunction : classedConstant;
    }
    function d3_selection_classedName(name) {
        var re = d3_selection_classedRe(name);
        return function(node, value) {
            if (c = node.classList) return value ? c.add(name) : c.remove(name);
            var c = node.className, cb = c.baseVal != null, cv = cb ? c.baseVal : c;
            if (value) {
                re.lastIndex = 0;
                if (!re.test(cv)) {
                    cv = d3_collapse(cv + " " + name);
                    if (cb) c.baseVal = cv; else node.className = cv;
                }
            } else if (cv) {
                cv = d3_collapse(cv.replace(re, " "));
                if (cb) c.baseVal = cv; else node.className = cv;
            }
        };
    }
    d3_selectionPrototype.style = function(name, value, priority) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof name !== "string") {
                if (n < 2) value = "";
                for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
                return this;
            }
            if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
            priority = "";
        }
        return this.each(d3_selection_style(name, value, priority));
    };
    function d3_selection_style(name, value, priority) {
        function styleNull() {
            this.style.removeProperty(name);
        }
        function styleConstant() {
            this.style.setProperty(name, value, priority);
        }
        function styleFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
        }
        return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
    }
    d3_selectionPrototype.property = function(name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") return this.node()[name];
            for (value in name) this.each(d3_selection_property(value, name[value]));
            return this;
        }
        return this.each(d3_selection_property(name, value));
    };
    function d3_selection_property(name, value) {
        function propertyNull() {
            delete this[name];
        }
        function propertyConstant() {
            this[name] = value;
        }
        function propertyFunction() {
            var x = value.apply(this, arguments);
            if (x == null) delete this[name]; else this[name] = x;
        }
        return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
    }
    d3_selectionPrototype.text = function(value) {
        return arguments.length ? this.each(typeof value === "function" ? function() {
            var v = value.apply(this, arguments);
            this.textContent = v == null ? "" : v;
        } : value == null ? function() {
            this.textContent = "";
        } : function() {
            this.textContent = value;
        }) : this.node().textContent;
    };
    d3_selectionPrototype.html = function(value) {
        return arguments.length ? this.each(typeof value === "function" ? function() {
            var v = value.apply(this, arguments);
            this.innerHTML = v == null ? "" : v;
        } : value == null ? function() {
            this.innerHTML = "";
        } : function() {
            this.innerHTML = value;
        }) : this.node().innerHTML;
    };
    d3_selectionPrototype.append = function(name) {
        name = d3.ns.qualify(name);
        function append() {
            return this.appendChild(d3_document.createElementNS(this.namespaceURI, name));
        }
        function appendNS() {
            return this.appendChild(d3_document.createElementNS(name.space, name.local));
        }
        return this.select(name.local ? appendNS : append);
    };
    d3_selectionPrototype.insert = function(name, before) {
        name = d3.ns.qualify(name);
        function insert() {
            return this.insertBefore(d3_document.createElementNS(this.namespaceURI, name), d3_select(before, this));
        }
        function insertNS() {
            return this.insertBefore(d3_document.createElementNS(name.space, name.local), d3_select(before, this));
        }
        return this.select(name.local ? insertNS : insert);
    };
    d3_selectionPrototype.remove = function() {
        return this.each(function() {
            var parent = this.parentNode;
            if (parent) parent.removeChild(this);
        });
    };
    d3_selectionPrototype.data = function(value, key) {
        var i = -1, n = this.length, group, node;
        if (!arguments.length) {
            value = new Array(n = (group = this[0]).length);
            while (++i < n) {
                if (node = group[i]) {
                    value[i] = node.__data__;
                }
            }
            return value;
        }
        function bind(group, groupData) {
            var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
            if (key) {
                var nodeByKeyValue = new d3_Map(), dataByKeyValue = new d3_Map(), keyValues = [], keyValue;
                for (i = -1; ++i < n; ) {
                    keyValue = key.call(node = group[i], node.__data__, i);
                    if (nodeByKeyValue.has(keyValue)) {
                        exitNodes[i] = node;
                    } else {
                        nodeByKeyValue.set(keyValue, node);
                    }
                    keyValues.push(keyValue);
                }
                for (i = -1; ++i < m; ) {
                    keyValue = key.call(groupData, nodeData = groupData[i], i);
                    if (node = nodeByKeyValue.get(keyValue)) {
                        updateNodes[i] = node;
                        node.__data__ = nodeData;
                    } else if (!dataByKeyValue.has(keyValue)) {
                        enterNodes[i] = d3_selection_dataNode(nodeData);
                    }
                    dataByKeyValue.set(keyValue, nodeData);
                    nodeByKeyValue.remove(keyValue);
                }
                for (i = -1; ++i < n; ) {
                    if (nodeByKeyValue.has(keyValues[i])) {
                        exitNodes[i] = group[i];
                    }
                }
            } else {
                for (i = -1; ++i < n0; ) {
                    node = group[i];
                    nodeData = groupData[i];
                    if (node) {
                        node.__data__ = nodeData;
                        updateNodes[i] = node;
                    } else {
                        enterNodes[i] = d3_selection_dataNode(nodeData);
                    }
                }
                for (;i < m; ++i) {
                    enterNodes[i] = d3_selection_dataNode(groupData[i]);
                }
                for (;i < n; ++i) {
                    exitNodes[i] = group[i];
                }
            }
            enterNodes.update = updateNodes;
            enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
            enter.push(enterNodes);
            update.push(updateNodes);
            exit.push(exitNodes);
        }
        var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
        if (typeof value === "function") {
            while (++i < n) {
                bind(group = this[i], value.call(group, group.parentNode.__data__, i));
            }
        } else {
            while (++i < n) {
                bind(group = this[i], value);
            }
        }
        update.enter = function() {
            return enter;
        };
        update.exit = function() {
            return exit;
        };
        return update;
    };
    function d3_selection_dataNode(data) {
        return {
            __data__: data
        };
    }
    d3_selectionPrototype.datum = function(value) {
        return arguments.length ? this.property("__data__", value) : this.property("__data__");
    };
    d3_selectionPrototype.filter = function(filter) {
        var subgroups = [], subgroup, group, node;
        if (typeof filter !== "function") filter = d3_selection_filter(filter);
        for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = 0, n = group.length; i < n; i++) {
                if ((node = group[i]) && filter.call(node, node.__data__, i)) {
                    subgroup.push(node);
                }
            }
        }
        return d3_selection(subgroups);
    };
    function d3_selection_filter(selector) {
        return function() {
            return d3_selectMatches(this, selector);
        };
    }
    d3_selectionPrototype.order = function() {
        for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
                if (node = group[i]) {
                    if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
                    next = node;
                }
            }
        }
        return this;
    };
    d3_selectionPrototype.sort = function(comparator) {
        comparator = d3_selection_sortComparator.apply(this, arguments);
        for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
        return this.order();
    };
    function d3_selection_sortComparator(comparator) {
        if (!arguments.length) comparator = d3.ascending;
        return function(a, b) {
            return !a - !b || comparator(a.__data__, b.__data__);
        };
    }
    d3_selectionPrototype.on = function(type, listener, capture) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof type !== "string") {
                if (n < 2) listener = false;
                for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
                return this;
            }
            if (n < 2) return (n = this.node()["__on" + type]) && n._;
            capture = false;
        }
        return this.each(d3_selection_on(type, listener, capture));
    };
    function d3_selection_on(type, listener, capture) {
        var name = "__on" + type, i = type.indexOf(".");
        if (i > 0) type = type.substring(0, i);
        function onRemove() {
            var wrapper = this[name];
            if (wrapper) {
                this.removeEventListener(type, wrapper, wrapper.$);
                delete this[name];
            }
        }
        function onAdd() {
            var node = this, args = d3_array(arguments);
            onRemove.call(this);
            this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
            wrapper._ = listener;
            function wrapper(e) {
                var o = d3.event;
                d3.event = e;
                args[0] = node.__data__;
                try {
                    listener.apply(node, args);
                } finally {
                    d3.event = o;
                }
            }
        }
        return listener ? onAdd : onRemove;
    }
    d3_selectionPrototype.each = function(callback) {
        return d3_selection_each(this, function(node, i, j) {
            callback.call(node, node.__data__, i, j);
        });
    };
    function d3_selection_each(groups, callback) {
        for (var j = 0, m = groups.length; j < m; j++) {
            for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
                if (node = group[i]) callback(node, i, j);
            }
        }
        return groups;
    }
    d3_selectionPrototype.call = function(callback) {
        var args = d3_array(arguments);
        callback.apply(args[0] = this, args);
        return this;
    };
    d3_selectionPrototype.empty = function() {
        return !this.node();
    };
    d3_selectionPrototype.node = function() {
        for (var j = 0, m = this.length; j < m; j++) {
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                var node = group[i];
                if (node) return node;
            }
        }
        return null;
    };
    d3_selectionPrototype.transition = function() {
        var id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], subgroup, node, transition = Object.create(d3_transitionInherit);
        transition.time = Date.now();
        for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
                if (node = group[i]) d3_transitionNode(node, i, id, transition);
                subgroup.push(node);
            }
        }
        return d3_transition(subgroups, id);
    };
    var d3_selectionRoot = d3_selection([ [ d3_document ] ]);
    d3_selectionRoot[0].parentNode = d3_selectRoot;
    d3.select = function(selector) {
        return typeof selector === "string" ? d3_selectionRoot.select(selector) : d3_selection([ [ selector ] ]);
    };
    d3.selectAll = function(selector) {
        return typeof selector === "string" ? d3_selectionRoot.selectAll(selector) : d3_selection([ d3_array(selector) ]);
    };
    function d3_selection_enter(selection) {
        d3_arraySubclass(selection, d3_selection_enterPrototype);
        return selection;
    }
    var d3_selection_enterPrototype = [];
    d3.selection.enter = d3_selection_enter;
    d3.selection.enter.prototype = d3_selection_enterPrototype;
    d3_selection_enterPrototype.append = d3_selectionPrototype.append;
    d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
    d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
    d3_selection_enterPrototype.node = d3_selectionPrototype.node;
    d3_selection_enterPrototype.select = function(selector) {
        var subgroups = [], subgroup, subnode, upgroup, group, node;
        for (var j = -1, m = this.length; ++j < m; ) {
            upgroup = (group = this[j]).update;
            subgroups.push(subgroup = []);
            subgroup.parentNode = group.parentNode;
            for (var i = -1, n = group.length; ++i < n; ) {
                if (node = group[i]) {
                    subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
                    subnode.__data__ = node.__data__;
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_selection(subgroups);
    };
    function d3_transition(groups, id) {
        d3_arraySubclass(groups, d3_transitionPrototype);
        groups.id = id;
        return groups;
    }
    var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit = {
        ease: d3_ease_cubicInOut,
        delay: 0,
        duration: 250
    };
    d3_transitionPrototype.call = d3_selectionPrototype.call;
    d3_transitionPrototype.empty = d3_selectionPrototype.empty;
    d3_transitionPrototype.node = d3_selectionPrototype.node;
    d3.transition = function(selection) {
        return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition();
    };
    d3.transition.prototype = d3_transitionPrototype;
    function d3_transitionNode(node, i, id, inherit) {
        var lock = node.__transition__ || (node.__transition__ = {
            active: 0,
            count: 0
        }), transition = lock[id];
        if (!transition) {
            var time = inherit.time;
            transition = lock[id] = {
                tween: new d3_Map(),
                event: d3.dispatch("start", "end"),
                time: time,
                ease: inherit.ease,
                delay: inherit.delay,
                duration: inherit.duration
            };
            ++lock.count;
            d3.timer(function(elapsed) {
                var d = node.__data__, ease = transition.ease, event = transition.event, delay = transition.delay, duration = transition.duration, tweened = [];
                return delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time), 1;
                function start(elapsed) {
                    if (lock.active > id) return stop();
                    lock.active = id;
                    event.start.call(node, d, i);
                    transition.tween.forEach(function(key, value) {
                        if (value = value.call(node, d, i)) {
                            tweened.push(value);
                        }
                    });
                    if (!tick(elapsed)) d3.timer(tick, 0, time);
                    return 1;
                }
                function tick(elapsed) {
                    if (lock.active !== id) return stop();
                    var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
                    while (n > 0) {
                        tweened[--n].call(node, e);
                    }
                    if (t >= 1) {
                        stop();
                        event.end.call(node, d, i);
                        return 1;
                    }
                }
                function stop() {
                    if (--lock.count) delete lock[id]; else delete node.__transition__;
                    return 1;
                }
            }, 0, time);
            return transition;
        }
    }
    d3_transitionPrototype.select = function(selector) {
        var id = this.id, subgroups = [], subgroup, subnode, node;
        if (typeof selector !== "function") selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
                if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i))) {
                    if ("__data__" in node) subnode.__data__ = node.__data__;
                    d3_transitionNode(subnode, i, id, node.__transition__[id]);
                    subgroup.push(subnode);
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_transition(subgroups, id);
    };
    d3_transitionPrototype.selectAll = function(selector) {
        var id = this.id, subgroups = [], subgroup, subnodes, node, subnode, transition;
        if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m; ) {
            for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
                if (node = group[i]) {
                    transition = node.__transition__[id];
                    subnodes = selector.call(node, node.__data__, i);
                    subgroups.push(subgroup = []);
                    for (var k = -1, o = subnodes.length; ++k < o; ) {
                        d3_transitionNode(subnode = subnodes[k], k, id, transition);
                        subgroup.push(subnode);
                    }
                }
            }
        }
        return d3_transition(subgroups, id);
    };
    d3_transitionPrototype.filter = function(filter) {
        var subgroups = [], subgroup, group, node;
        if (typeof filter !== "function") filter = d3_selection_filter(filter);
        for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                if ((node = group[i]) && filter.call(node, node.__data__, i)) {
                    subgroup.push(node);
                }
            }
        }
        return d3_transition(subgroups, this.id, this.time).ease(this.ease());
    };
    d3_transitionPrototype.attr = function(nameNS, value) {
        if (arguments.length < 2) {
            for (value in nameNS) this.attr(value, nameNS[value]);
            return this;
        }
        var interpolate = d3_interpolateByName(nameNS), name = d3.ns.qualify(nameNS);
        function attrNull() {
            this.removeAttribute(name);
        }
        function attrNullNS() {
            this.removeAttributeNS(name.space, name.local);
        }
        return d3_transition_tween(this, "attr." + nameNS, value, function(b) {
            function attrString() {
                var a = this.getAttribute(name), i;
                return a !== b && (i = interpolate(a, b), function(t) {
                    this.setAttribute(name, i(t));
                });
            }
            function attrStringNS() {
                var a = this.getAttributeNS(name.space, name.local), i;
                return a !== b && (i = interpolate(a, b), function(t) {
                    this.setAttributeNS(name.space, name.local, i(t));
                });
            }
            return b == null ? name.local ? attrNullNS : attrNull : (b += "", name.local ? attrStringNS : attrString);
        });
    };
    d3_transitionPrototype.attrTween = function(nameNS, tween) {
        var name = d3.ns.qualify(nameNS);
        function attrTween(d, i) {
            var f = tween.call(this, d, i, this.getAttribute(name));
            return f && function(t) {
                this.setAttribute(name, f(t));
            };
        }
        function attrTweenNS(d, i) {
            var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
            return f && function(t) {
                this.setAttributeNS(name.space, name.local, f(t));
            };
        }
        return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.style = function(name, value, priority) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof name !== "string") {
                if (n < 2) value = "";
                for (priority in name) this.style(priority, name[priority], value);
                return this;
            }
            priority = "";
        }
        var interpolate = d3_interpolateByName(name);
        function styleNull() {
            this.style.removeProperty(name);
        }
        return d3_transition_tween(this, "style." + name, value, function(b) {
            function styleString() {
                var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
                return a !== b && (i = interpolate(a, b), function(t) {
                    this.style.setProperty(name, i(t), priority);
                });
            }
            return b == null ? styleNull : (b += "", styleString);
        });
    };
    d3_transitionPrototype.styleTween = function(name, tween, priority) {
        if (arguments.length < 3) priority = "";
        return this.tween("style." + name, function(d, i) {
            var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
            return f && function(t) {
                this.style.setProperty(name, f(t), priority);
            };
        });
    };
    d3_transitionPrototype.text = function(value) {
        return d3_transition_tween(this, "text", value, d3_transition_text);
    };
    function d3_transition_text(b) {
        if (b == null) b = "";
        return function() {
            this.textContent = b;
        };
    }
    d3_transitionPrototype.remove = function() {
        return this.each("end.transition", function() {
            var p;
            if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
        });
    };
    d3_transitionPrototype.ease = function(value) {
        var id = this.id;
        if (arguments.length < 1) return this.node().__transition__[id].ease;
        if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
        return d3_selection_each(this, function(node) {
            node.__transition__[id].ease = value;
        });
    };
    d3_transitionPrototype.delay = function(value) {
        var id = this.id;
        return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
            node.__transition__[id].delay = value.call(node, node.__data__, i, j) | 0;
        } : (value |= 0, function(node) {
            node.__transition__[id].delay = value;
        }));
    };
    d3_transitionPrototype.duration = function(value) {
        var id = this.id;
        return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
            node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j) | 0);
        } : (value = Math.max(1, value | 0), function(node) {
            node.__transition__[id].duration = value;
        }));
    };
    d3_transitionPrototype.each = function(type, listener) {
        var id = this.id;
        if (arguments.length < 2) {
            var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
            d3_transitionInheritId = id;
            d3_selection_each(this, function(node, i, j) {
                d3_transitionInherit = node.__transition__[id];
                type.call(node, node.__data__, i, j);
            });
            d3_transitionInherit = inherit;
            d3_transitionInheritId = inheritId;
        } else {
            d3_selection_each(this, function(node) {
                node.__transition__[id].event.on(type, listener);
            });
        }
        return this;
    };
    d3_transitionPrototype.transition = function() {
        var id0 = this.id, id1 = ++d3_transitionId, subgroups = [], subgroup, group, node, transition;
        for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                if (node = group[i]) {
                    transition = Object.create(node.__transition__[id0]);
                    transition.delay += transition.duration;
                    d3_transitionNode(node, i, id1, transition);
                }
                subgroup.push(node);
            }
        }
        return d3_transition(subgroups, id1);
    };
    d3_transitionPrototype.tween = function(name, tween) {
        var id = this.id;
        if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
        return d3_selection_each(this, tween == null ? function(node) {
            node.__transition__[id].tween.remove(name);
        } : function(node) {
            node.__transition__[id].tween.set(name, tween);
        });
    };
    function d3_transition_tween(groups, name, value, tween) {
        var id = groups.id;
        return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
            node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
        } : (value = tween(value), function(node) {
            node.__transition__[id].tween.set(name, value);
        }));
    }
    var d3_timer_id = 0, d3_timer_byId = {}, d3_timer_queue = null, d3_timer_interval, d3_timer_timeout;
    d3.timer = function(callback, delay, then) {
        if (arguments.length < 3) {
            if (arguments.length < 2) delay = 0; else if (!isFinite(delay)) return;
            then = Date.now();
        }
        var timer = d3_timer_byId[callback.id];
        if (timer && timer.callback === callback) {
            timer.then = then;
            timer.delay = delay;
        } else d3_timer_byId[callback.id = ++d3_timer_id] = d3_timer_queue = {
            callback: callback,
            then: then,
            delay: delay,
            next: d3_timer_queue
        };
        if (!d3_timer_interval) {
            d3_timer_timeout = clearTimeout(d3_timer_timeout);
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
        }
    };
    function d3_timer_step() {
        var elapsed, now = Date.now(), t1 = d3_timer_queue;
        while (t1) {
            elapsed = now - t1.then;
            if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
            t1 = t1.next;
        }
        var delay = d3_timer_flush() - now;
        if (delay > 24) {
            if (isFinite(delay)) {
                clearTimeout(d3_timer_timeout);
                d3_timer_timeout = setTimeout(d3_timer_step, delay);
            }
            d3_timer_interval = 0;
        } else {
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
        }
    }
    d3.timer.flush = function() {
        var elapsed, now = Date.now(), t1 = d3_timer_queue;
        while (t1) {
            elapsed = now - t1.then;
            if (!t1.delay) t1.flush = t1.callback(elapsed);
            t1 = t1.next;
        }
        d3_timer_flush();
    };
    function d3_timer_flush() {
        var t0 = null, t1 = d3_timer_queue, then = Infinity;
        while (t1) {
            if (t1.flush) {
                delete d3_timer_byId[t1.callback.id];
                t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
            } else {
                then = Math.min(then, t1.then + t1.delay);
                t1 = (t0 = t1).next;
            }
        }
        return then;
    }
    var d3_timer_frame = d3_window.requestAnimationFrame || d3_window.webkitRequestAnimationFrame || d3_window.mozRequestAnimationFrame || d3_window.oRequestAnimationFrame || d3_window.msRequestAnimationFrame || function(callback) {
        setTimeout(callback, 17);
    };
    d3.mouse = function(container) {
        return d3_mousePoint(container, d3_eventSource());
    };
    var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
    function d3_mousePoint(container, e) {
        var svg = container.ownerSVGElement || container;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            if (d3_mouse_bug44083 < 0 && (d3_window.scrollX || d3_window.scrollY)) {
                svg = d3.select(d3_document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
                var ctm = svg[0][0].getScreenCTM();
                d3_mouse_bug44083 = !(ctm.f || ctm.e);
                svg.remove();
            }
            if (d3_mouse_bug44083) {
                point.x = e.pageX;
                point.y = e.pageY;
            } else {
                point.x = e.clientX;
                point.y = e.clientY;
            }
            point = point.matrixTransform(container.getScreenCTM().inverse());
            return [ point.x, point.y ];
        }
        var rect = container.getBoundingClientRect();
        return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
    }
    d3.touches = function(container, touches) {
        if (arguments.length < 2) touches = d3_eventSource().touches;
        return touches ? d3_array(touches).map(function(touch) {
            var point = d3_mousePoint(container, touch);
            point.identifier = touch.identifier;
            return point;
        }) : [];
    };
    function d3_noop() {}
    d3.scale = {};
    function d3_scaleExtent(domain) {
        var start = domain[0], stop = domain[domain.length - 1];
        return start < stop ? [ start, stop ] : [ stop, start ];
    }
    function d3_scaleRange(scale) {
        return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
    }
    function d3_scale_nice(domain, nice) {
        var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
        if (x1 < x0) {
            dx = i0, i0 = i1, i1 = dx;
            dx = x0, x0 = x1, x1 = dx;
        }
        if (nice = nice(x1 - x0)) {
            domain[i0] = nice.floor(x0);
            domain[i1] = nice.ceil(x1);
        }
        return domain;
    }
    function d3_scale_niceDefault() {
        return Math;
    }
    d3.scale.linear = function() {
        return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3.interpolate, false);
    };
    function d3_scale_linear(domain, range, interpolate, clamp) {
        var output, input;
        function rescale() {
            var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
            output = linear(domain, range, uninterpolate, interpolate);
            input = linear(range, domain, uninterpolate, d3.interpolate);
            return scale;
        }
        function scale(x) {
            return output(x);
        }
        scale.invert = function(y) {
            return input(y);
        };
        scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = x.map(Number);
            return rescale();
        };
        scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.rangeRound = function(x) {
            return scale.range(x).interpolate(d3.interpolateRound);
        };
        scale.clamp = function(x) {
            if (!arguments.length) return clamp;
            clamp = x;
            return rescale();
        };
        scale.interpolate = function(x) {
            if (!arguments.length) return interpolate;
            interpolate = x;
            return rescale();
        };
        scale.ticks = function(m) {
            return d3_scale_linearTicks(domain, m);
        };
        scale.tickFormat = function(m) {
            return d3_scale_linearTickFormat(domain, m);
        };
        scale.nice = function() {
            d3_scale_nice(domain, d3_scale_linearNice);
            return rescale();
        };
        scale.copy = function() {
            return d3_scale_linear(domain, range, interpolate, clamp);
        };
        return rescale();
    }
    function d3_scale_linearRebind(scale, linear) {
        return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
    }
    function d3_scale_linearNice(dx) {
        dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
        return dx && {
            floor: function(x) {
                return Math.floor(x / dx) * dx;
            },
            ceil: function(x) {
                return Math.ceil(x / dx) * dx;
            }
        };
    }
    function d3_scale_linearTickRange(domain, m) {
        var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
        if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
        extent[0] = Math.ceil(extent[0] / step) * step;
        extent[1] = Math.floor(extent[1] / step) * step + step * .5;
        extent[2] = step;
        return extent;
    }
    function d3_scale_linearTicks(domain, m) {
        return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
    }
    function d3_scale_linearTickFormat(domain, m) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
    }
    function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
        var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
        return function(x) {
            return i(u(x));
        };
    }
    function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
        var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
        if (domain[k] < domain[0]) {
            domain = domain.slice().reverse();
            range = range.slice().reverse();
        }
        while (++j <= k) {
            u.push(uninterpolate(domain[j - 1], domain[j]));
            i.push(interpolate(range[j - 1], range[j]));
        }
        return function(x) {
            var j = d3.bisect(domain, x, 1, k) - 1;
            return i[j](u[j](x));
        };
    }
    d3.scale.log = function() {
        return d3_scale_log(d3.scale.linear(), d3_scale_logp);
    };
    function d3_scale_log(linear, log) {
        var pow = log.pow;
        function scale(x) {
            return linear(log(x));
        }
        scale.invert = function(x) {
            return pow(linear.invert(x));
        };
        scale.domain = function(x) {
            if (!arguments.length) return linear.domain().map(pow);
            log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
            pow = log.pow;
            linear.domain(x.map(log));
            return scale;
        };
        scale.nice = function() {
            linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
            return scale;
        };
        scale.ticks = function() {
            var extent = d3_scaleExtent(linear.domain()), ticks = [];
            if (extent.every(isFinite)) {
                var i = Math.floor(extent[0]), j = Math.ceil(extent[1]), u = pow(extent[0]), v = pow(extent[1]);
                if (log === d3_scale_logn) {
                    ticks.push(pow(i));
                    for (;i++ < j; ) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
                } else {
                    for (;i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
                    ticks.push(pow(i));
                }
                for (i = 0; ticks[i] < u; i++) {}
                for (j = ticks.length; ticks[j - 1] > v; j--) {}
                ticks = ticks.slice(i, j);
            }
            return ticks;
        };
        scale.tickFormat = function(n, format) {
            if (arguments.length < 2) format = d3_scale_logFormat;
            if (!arguments.length) return format;
            var k = Math.max(.1, n / scale.ticks().length), f = log === d3_scale_logn ? (e = -1e-12, 
            Math.floor) : (e = 1e-12, Math.ceil), e;
            return function(d) {
                return d / pow(f(log(d) + e)) <= k ? format(d) : "";
            };
        };
        scale.copy = function() {
            return d3_scale_log(linear.copy(), log);
        };
        return d3_scale_linearRebind(scale, linear);
    }
    var d3_scale_logFormat = d3.format(".0e");
    function d3_scale_logp(x) {
        return Math.log(x < 0 ? 0 : x) / Math.LN10;
    }
    function d3_scale_logn(x) {
        return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
    }
    d3_scale_logp.pow = function(x) {
        return Math.pow(10, x);
    };
    d3_scale_logn.pow = function(x) {
        return -Math.pow(10, -x);
    };
    d3.scale.pow = function() {
        return d3_scale_pow(d3.scale.linear(), 1);
    };
    function d3_scale_pow(linear, exponent) {
        var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
        function scale(x) {
            return linear(powp(x));
        }
        scale.invert = function(x) {
            return powb(linear.invert(x));
        };
        scale.domain = function(x) {
            if (!arguments.length) return linear.domain().map(powb);
            linear.domain(x.map(powp));
            return scale;
        };
        scale.ticks = function(m) {
            return d3_scale_linearTicks(scale.domain(), m);
        };
        scale.tickFormat = function(m) {
            return d3_scale_linearTickFormat(scale.domain(), m);
        };
        scale.nice = function() {
            return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
        };
        scale.exponent = function(x) {
            if (!arguments.length) return exponent;
            var domain = scale.domain();
            powp = d3_scale_powPow(exponent = x);
            powb = d3_scale_powPow(1 / exponent);
            return scale.domain(domain);
        };
        scale.copy = function() {
            return d3_scale_pow(linear.copy(), exponent);
        };
        return d3_scale_linearRebind(scale, linear);
    }
    function d3_scale_powPow(e) {
        return function(x) {
            return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
        };
    }
    d3.scale.sqrt = function() {
        return d3.scale.pow().exponent(.5);
    };
    d3.scale.ordinal = function() {
        return d3_scale_ordinal([], {
            t: "range",
            a: [ [] ]
        });
    };
    function d3_scale_ordinal(domain, ranger) {
        var index, range, rangeBand;
        function scale(x) {
            return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
        }
        function steps(start, step) {
            return d3.range(domain.length).map(function(i) {
                return start + step * i;
            });
        }
        scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = [];
            index = new d3_Map();
            var i = -1, n = x.length, xi;
            while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
            return scale[ranger.t].apply(scale, ranger.a);
        };
        scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            rangeBand = 0;
            ranger = {
                t: "range",
                a: arguments
            };
            return scale;
        };
        scale.rangePoints = function(x, padding) {
            if (arguments.length < 2) padding = 0;
            var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
            range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
            rangeBand = 0;
            ranger = {
                t: "rangePoints",
                a: arguments
            };
            return scale;
        };
        scale.rangeBands = function(x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
            range = steps(start + step * outerPadding, step);
            if (reverse) range.reverse();
            rangeBand = step * (1 - padding);
            ranger = {
                t: "rangeBands",
                a: arguments
            };
            return scale;
        };
        scale.rangeRoundBands = function(x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
            range = steps(start + Math.round(error / 2), step);
            if (reverse) range.reverse();
            rangeBand = Math.round(step * (1 - padding));
            ranger = {
                t: "rangeRoundBands",
                a: arguments
            };
            return scale;
        };
        scale.rangeBand = function() {
            return rangeBand;
        };
        scale.rangeExtent = function() {
            return d3_scaleExtent(ranger.a[0]);
        };
        scale.copy = function() {
            return d3_scale_ordinal(domain, ranger);
        };
        return scale.domain(domain);
    }
    d3.scale.category10 = function() {
        return d3.scale.ordinal().range(d3_category10);
    };
    d3.scale.category20 = function() {
        return d3.scale.ordinal().range(d3_category20);
    };
    d3.scale.category20b = function() {
        return d3.scale.ordinal().range(d3_category20b);
    };
    d3.scale.category20c = function() {
        return d3.scale.ordinal().range(d3_category20c);
    };
    var d3_category10 = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ];
    var d3_category20 = [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5" ];
    var d3_category20b = [ "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6" ];
    var d3_category20c = [ "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9" ];
    d3.scale.quantile = function() {
        return d3_scale_quantile([], []);
    };
    function d3_scale_quantile(domain, range) {
        var thresholds;
        function rescale() {
            var k = 0, q = range.length;
            thresholds = [];
            while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
            return scale;
        }
        function scale(x) {
            if (isNaN(x = +x)) return NaN;
            return range[d3.bisect(thresholds, x)];
        }
        scale.domain = function(x) {
            if (!arguments.length) return domain;
            domain = x.filter(function(d) {
                return !isNaN(d);
            }).sort(d3.ascending);
            return rescale();
        };
        scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.quantiles = function() {
            return thresholds;
        };
        scale.copy = function() {
            return d3_scale_quantile(domain, range);
        };
        return rescale();
    }
    d3.scale.quantize = function() {
        return d3_scale_quantize(0, 1, [ 0, 1 ]);
    };
    function d3_scale_quantize(x0, x1, range) {
        var kx, i;
        function scale(x) {
            return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
        }
        function rescale() {
            kx = range.length / (x1 - x0);
            i = range.length - 1;
            return scale;
        }
        scale.domain = function(x) {
            if (!arguments.length) return [ x0, x1 ];
            x0 = +x[0];
            x1 = +x[x.length - 1];
            return rescale();
        };
        scale.range = function(x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.copy = function() {
            return d3_scale_quantize(x0, x1, range);
        };
        return rescale();
    }
    d3.scale.threshold = function() {
        return d3_scale_threshold([ .5 ], [ 0, 1 ]);
    };
    function d3_scale_threshold(domain, range) {
        function scale(x) {
            return range[d3.bisect(domain, x)];
        }
        scale.domain = function(_) {
            if (!arguments.length) return domain;
            domain = _;
            return scale;
        };
        scale.range = function(_) {
            if (!arguments.length) return range;
            range = _;
            return scale;
        };
        scale.copy = function() {
            return d3_scale_threshold(domain, range);
        };
        return scale;
    }
    d3.scale.identity = function() {
        return d3_scale_identity([ 0, 1 ]);
    };
    function d3_scale_identity(domain) {
        function identity(x) {
            return +x;
        }
        identity.invert = identity;
        identity.domain = identity.range = function(x) {
            if (!arguments.length) return domain;
            domain = x.map(identity);
            return identity;
        };
        identity.ticks = function(m) {
            return d3_scale_linearTicks(domain, m);
        };
        identity.tickFormat = function(m) {
            return d3_scale_linearTickFormat(domain, m);
        };
        identity.copy = function() {
            return d3_scale_identity(domain);
        };
        return identity;
    }
    d3.svg = {};
    d3.svg.arc = function() {
        var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
        function arc() {
            var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, 
            a0 = a1, a1 = da), a1 - a0), df = da < π ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
            return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
        }
        arc.innerRadius = function(v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3_functor(v);
            return arc;
        };
        arc.outerRadius = function(v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3_functor(v);
            return arc;
        };
        arc.startAngle = function(v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return arc;
        };
        arc.endAngle = function(v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return arc;
        };
        arc.centroid = function() {
            var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
            return [ Math.cos(a) * r, Math.sin(a) * r ];
        };
        return arc;
    };
    var d3_svg_arcOffset = -π / 2, d3_svg_arcMax = 2 * π - 1e-6;
    function d3_svg_arcInnerRadius(d) {
        return d.innerRadius;
    }
    function d3_svg_arcOuterRadius(d) {
        return d.outerRadius;
    }
    function d3_svg_arcStartAngle(d) {
        return d.startAngle;
    }
    function d3_svg_arcEndAngle(d) {
        return d.endAngle;
    }
    function d3_svg_line(projection) {
        var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
        function line(data) {
            var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
            function segment() {
                segments.push("M", interpolate(projection(points), tension));
            }
            while (++i < n) {
                if (defined.call(this, d = data[i], i)) {
                    points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
                } else if (points.length) {
                    segment();
                    points = [];
                }
            }
            if (points.length) segment();
            return segments.length ? segments.join("") : null;
        }
        line.x = function(_) {
            if (!arguments.length) return x;
            x = _;
            return line;
        };
        line.y = function(_) {
            if (!arguments.length) return y;
            y = _;
            return line;
        };
        line.defined = function(_) {
            if (!arguments.length) return defined;
            defined = _;
            return line;
        };
        line.interpolate = function(_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            return line;
        };
        line.tension = function(_) {
            if (!arguments.length) return tension;
            tension = _;
            return line;
        };
        return line;
    }
    d3.svg.line = function() {
        return d3_svg_line(d3_identity);
    };
    function d3_svg_lineX(d) {
        return d[0];
    }
    function d3_svg_lineY(d) {
        return d[1];
    }
    var d3_svg_lineInterpolators = d3.map({
        linear: d3_svg_lineLinear,
        "linear-closed": d3_svg_lineLinearClosed,
        "step-before": d3_svg_lineStepBefore,
        "step-after": d3_svg_lineStepAfter,
        basis: d3_svg_lineBasis,
        "basis-open": d3_svg_lineBasisOpen,
        "basis-closed": d3_svg_lineBasisClosed,
        bundle: d3_svg_lineBundle,
        cardinal: d3_svg_lineCardinal,
        "cardinal-open": d3_svg_lineCardinalOpen,
        "cardinal-closed": d3_svg_lineCardinalClosed,
        monotone: d3_svg_lineMonotone
    });
    d3_svg_lineInterpolators.forEach(function(key, value) {
        value.key = key;
        value.closed = /-closed$/.test(key);
    });
    function d3_svg_lineLinear(points) {
        return points.join("L");
    }
    function d3_svg_lineLinearClosed(points) {
        return d3_svg_lineLinear(points) + "Z";
    }
    function d3_svg_lineStepBefore(points) {
        var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
        while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
        return path.join("");
    }
    function d3_svg_lineStepAfter(points) {
        var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
        while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
        return path.join("");
    }
    function d3_svg_lineCardinalOpen(points, tension) {
        return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
    }
    function d3_svg_lineCardinalClosed(points, tension) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
        points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
    }
    function d3_svg_lineCardinal(points, tension) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
    }
    function d3_svg_lineHermite(points, tangents) {
        if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
            return d3_svg_lineLinear(points);
        }
        var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
        if (quad) {
            path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
            p0 = points[1];
            pi = 2;
        }
        if (tangents.length > 1) {
            t = tangents[1];
            p = points[pi];
            pi++;
            path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            for (var i = 2; i < tangents.length; i++, pi++) {
                p = points[pi];
                t = tangents[i];
                path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            }
        }
        if (quad) {
            var lp = points[pi];
            path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
        }
        return path;
    }
    function d3_svg_lineCardinalTangents(points, tension) {
        var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
        while (++i < n) {
            p0 = p1;
            p1 = p2;
            p2 = points[i];
            tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
        }
        return tangents;
    }
    function d3_svg_lineBasis(points) {
        if (points.length < 3) return d3_svg_lineLinear(points);
        var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0 ];
        d3_svg_lineBasisBezier(path, px, py);
        while (++i < n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        i = -1;
        while (++i < 2) {
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }
    function d3_svg_lineBasisOpen(points) {
        if (points.length < 4) return d3_svg_lineLinear(points);
        var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
        while (++i < 3) {
            pi = points[i];
            px.push(pi[0]);
            py.push(pi[1]);
        }
        path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
        --i;
        while (++i < n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }
    function d3_svg_lineBasisClosed(points) {
        var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
        while (++i < 4) {
            pi = points[i % n];
            px.push(pi[0]);
            py.push(pi[1]);
        }
        path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
        --i;
        while (++i < m) {
            pi = points[i % n];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }
    function d3_svg_lineBundle(points, tension) {
        var n = points.length - 1;
        if (n) {
            var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
            while (++i <= n) {
                p = points[i];
                t = i / n;
                p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
                p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
            }
        }
        return d3_svg_lineBasis(points);
    }
    function d3_svg_lineDot4(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
    function d3_svg_lineBasisBezier(path, x, y) {
        path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
    }
    function d3_svg_lineSlope(p0, p1) {
        return (p1[1] - p0[1]) / (p1[0] - p0[0]);
    }
    function d3_svg_lineFiniteDifferences(points) {
        var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
        while (++i < j) {
            m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
        }
        m[i] = d;
        return m;
    }
    function d3_svg_lineMonotoneTangents(points) {
        var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
        while (++i < j) {
            d = d3_svg_lineSlope(points[i], points[i + 1]);
            if (Math.abs(d) < 1e-6) {
                m[i] = m[i + 1] = 0;
            } else {
                a = m[i] / d;
                b = m[i + 1] / d;
                s = a * a + b * b;
                if (s > 9) {
                    s = d * 3 / Math.sqrt(s);
                    m[i] = s * a;
                    m[i + 1] = s * b;
                }
            }
        }
        i = -1;
        while (++i <= j) {
            s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
            tangents.push([ s || 0, m[i] * s || 0 ]);
        }
        return tangents;
    }
    function d3_svg_lineMonotone(points) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
    }
    d3.svg.line.radial = function() {
        var line = d3_svg_line(d3_svg_lineRadial);
        line.radius = line.x, delete line.x;
        line.angle = line.y, delete line.y;
        return line;
    };
    function d3_svg_lineRadial(points) {
        var point, i = -1, n = points.length, r, a;
        while (++i < n) {
            point = points[i];
            r = point[0];
            a = point[1] + d3_svg_arcOffset;
            point[0] = r * Math.cos(a);
            point[1] = r * Math.sin(a);
        }
        return points;
    }
    function d3_svg_area(projection) {
        var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
        function area(data) {
            var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
                return x;
            } : d3_functor(x1), fy1 = y0 === y1 ? function() {
                return y;
            } : d3_functor(y1), x, y;
            function segment() {
                segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
            }
            while (++i < n) {
                if (defined.call(this, d = data[i], i)) {
                    points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
                    points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
                } else if (points0.length) {
                    segment();
                    points0 = [];
                    points1 = [];
                }
            }
            if (points0.length) segment();
            return segments.length ? segments.join("") : null;
        }
        area.x = function(_) {
            if (!arguments.length) return x1;
            x0 = x1 = _;
            return area;
        };
        area.x0 = function(_) {
            if (!arguments.length) return x0;
            x0 = _;
            return area;
        };
        area.x1 = function(_) {
            if (!arguments.length) return x1;
            x1 = _;
            return area;
        };
        area.y = function(_) {
            if (!arguments.length) return y1;
            y0 = y1 = _;
            return area;
        };
        area.y0 = function(_) {
            if (!arguments.length) return y0;
            y0 = _;
            return area;
        };
        area.y1 = function(_) {
            if (!arguments.length) return y1;
            y1 = _;
            return area;
        };
        area.defined = function(_) {
            if (!arguments.length) return defined;
            defined = _;
            return area;
        };
        area.interpolate = function(_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            interpolateReverse = interpolate.reverse || interpolate;
            L = interpolate.closed ? "M" : "L";
            return area;
        };
        area.tension = function(_) {
            if (!arguments.length) return tension;
            tension = _;
            return area;
        };
        return area;
    }
    d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
    d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
    d3.svg.area = function() {
        return d3_svg_area(d3_identity);
    };
    d3.svg.area.radial = function() {
        var area = d3_svg_area(d3_svg_lineRadial);
        area.radius = area.x, delete area.x;
        area.innerRadius = area.x0, delete area.x0;
        area.outerRadius = area.x1, delete area.x1;
        area.angle = area.y, delete area.y;
        area.startAngle = area.y0, delete area.y0;
        area.endAngle = area.y1, delete area.y1;
        return area;
    };
    d3.svg.chord = function() {
        var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
        function chord(d, i) {
            var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
            return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
        }
        function subgroup(self, f, d, i) {
            var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
            return {
                r: r,
                a0: a0,
                a1: a1,
                p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
                p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
            };
        }
        function equals(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1;
        }
        function arc(r, p, a) {
            return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
        }
        function curve(r0, p0, r1, p1) {
            return "Q 0,0 " + p1;
        }
        chord.radius = function(v) {
            if (!arguments.length) return radius;
            radius = d3_functor(v);
            return chord;
        };
        chord.source = function(v) {
            if (!arguments.length) return source;
            source = d3_functor(v);
            return chord;
        };
        chord.target = function(v) {
            if (!arguments.length) return target;
            target = d3_functor(v);
            return chord;
        };
        chord.startAngle = function(v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return chord;
        };
        chord.endAngle = function(v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return chord;
        };
        return chord;
    };
    function d3_svg_chordRadius(d) {
        return d.radius;
    }
    d3.svg.diagonal = function() {
        var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
        function diagonal(d, i) {
            var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
                x: p0.x,
                y: m
            }, {
                x: p3.x,
                y: m
            }, p3 ];
            p = p.map(projection);
            return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
        }
        diagonal.source = function(x) {
            if (!arguments.length) return source;
            source = d3_functor(x);
            return diagonal;
        };
        diagonal.target = function(x) {
            if (!arguments.length) return target;
            target = d3_functor(x);
            return diagonal;
        };
        diagonal.projection = function(x) {
            if (!arguments.length) return projection;
            projection = x;
            return diagonal;
        };
        return diagonal;
    };
    function d3_svg_diagonalProjection(d) {
        return [ d.x, d.y ];
    }
    d3.svg.diagonal.radial = function() {
        var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
        diagonal.projection = function(x) {
            return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
        };
        return diagonal;
    };
    function d3_svg_diagonalRadialProjection(projection) {
        return function() {
            var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
            return [ r * Math.cos(a), r * Math.sin(a) ];
        };
    }
    d3.svg.symbol = function() {
        var type = d3_svg_symbolType, size = d3_svg_symbolSize;
        function symbol(d, i) {
            return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
        }
        symbol.type = function(x) {
            if (!arguments.length) return type;
            type = d3_functor(x);
            return symbol;
        };
        symbol.size = function(x) {
            if (!arguments.length) return size;
            size = d3_functor(x);
            return symbol;
        };
        return symbol;
    };
    function d3_svg_symbolSize() {
        return 64;
    }
    function d3_svg_symbolType() {
        return "circle";
    }
    function d3_svg_symbolCircle(size) {
        var r = Math.sqrt(size / π);
        return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
    }
    var d3_svg_symbols = d3.map({
        circle: d3_svg_symbolCircle,
        cross: function(size) {
            var r = Math.sqrt(size / 5) / 2;
            return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
        },
        diamond: function(size) {
            var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
            return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
        },
        square: function(size) {
            var r = Math.sqrt(size) / 2;
            return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
        },
        "triangle-down": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
        },
        "triangle-up": function(size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
        }
    });
    d3.svg.symbolTypes = d3_svg_symbols.keys();
    var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
    d3.svg.axis = function() {
        var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
        function axis(g) {
            g.each(function() {
                var g = d3.select(this);
                var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
                var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".tick.minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
                var tick = g.selectAll(".tick.major").data(ticks, String), tickEnter = tick.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
                var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
                d3.transition(path));
                var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
                this.__chart__ = scale1;
                tickEnter.append("line");
                tickEnter.append("text");
                var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
                switch (orient) {
                  case "bottom":
                    {
                        tickTransform = d3_svg_axisX;
                        subtickEnter.attr("y2", tickMinorSize);
                        subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
                        lineEnter.attr("y2", tickMajorSize);
                        textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
                        textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        text.attr("dy", ".71em").style("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
                        break;
                    }

                  case "top":
                    {
                        tickTransform = d3_svg_axisX;
                        subtickEnter.attr("y2", -tickMinorSize);
                        subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
                        lineEnter.attr("y2", -tickMajorSize);
                        textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
                        lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
                        textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
                        text.attr("dy", "0em").style("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
                        break;
                    }

                  case "left":
                    {
                        tickTransform = d3_svg_axisY;
                        subtickEnter.attr("x2", -tickMinorSize);
                        subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
                        lineEnter.attr("x2", -tickMajorSize);
                        textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
                        lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
                        textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
                        text.attr("dy", ".32em").style("text-anchor", "end");
                        pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
                        break;
                    }

                  case "right":
                    {
                        tickTransform = d3_svg_axisY;
                        subtickEnter.attr("x2", tickMinorSize);
                        subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
                        lineEnter.attr("x2", tickMajorSize);
                        textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
                        lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
                        textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
                        text.attr("dy", ".32em").style("text-anchor", "start");
                        pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
                        break;
                    }
                }
                if (scale.ticks) {
                    tickEnter.call(tickTransform, scale0);
                    tickUpdate.call(tickTransform, scale1);
                    tickExit.call(tickTransform, scale1);
                    subtickEnter.call(tickTransform, scale0);
                    subtickUpdate.call(tickTransform, scale1);
                    subtickExit.call(tickTransform, scale1);
                } else {
                    var dx = scale1.rangeBand() / 2, x = function(d) {
                        return scale1(d) + dx;
                    };
                    tickEnter.call(tickTransform, x);
                    tickUpdate.call(tickTransform, x);
                }
            });
        }
        axis.scale = function(x) {
            if (!arguments.length) return scale;
            scale = x;
            return axis;
        };
        axis.orient = function(x) {
            if (!arguments.length) return orient;
            orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
            return axis;
        };
        axis.ticks = function() {
            if (!arguments.length) return tickArguments_;
            tickArguments_ = arguments;
            return axis;
        };
        axis.tickValues = function(x) {
            if (!arguments.length) return tickValues;
            tickValues = x;
            return axis;
        };
        axis.tickFormat = function(x) {
            if (!arguments.length) return tickFormat_;
            tickFormat_ = x;
            return axis;
        };
        axis.tickSize = function(x, y) {
            if (!arguments.length) return tickMajorSize;
            var n = arguments.length - 1;
            tickMajorSize = +x;
            tickMinorSize = n > 1 ? +y : tickMajorSize;
            tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
            return axis;
        };
        axis.tickPadding = function(x) {
            if (!arguments.length) return tickPadding;
            tickPadding = +x;
            return axis;
        };
        axis.tickSubdivide = function(x) {
            if (!arguments.length) return tickSubdivide;
            tickSubdivide = +x;
            return axis;
        };
        return axis;
    };
    var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };
    function d3_svg_axisX(selection, x) {
        selection.attr("transform", function(d) {
            return "translate(" + x(d) + ",0)";
        });
    }
    function d3_svg_axisY(selection, y) {
        selection.attr("transform", function(d) {
            return "translate(0," + y(d) + ")";
        });
    }
    function d3_svg_axisSubdivide(scale, ticks, m) {
        subticks = [];
        if (m && ticks.length > 1) {
            var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
            while (++i < n) {
                for (j = m; --j > 0; ) {
                    if ((v = +ticks[i] - j * d) >= extent[0]) {
                        subticks.push(v);
                    }
                }
            }
            for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1]; ) {
                subticks.push(v);
            }
        }
        return subticks;
    }
    d3.svg.brush = function() {
        var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [ [ 0, 0 ], [ 0, 0 ] ], extentDomain;
        function brush(g) {
            g.each(function() {
                var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
                g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
                bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
                fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
                tz.enter().append("g").attr("class", function(d) {
                    return "resize " + d;
                }).style("cursor", function(d) {
                    return d3_svg_brushCursor[d];
                }).append("rect").attr("x", function(d) {
                    return /[ew]$/.test(d) ? -3 : null;
                }).attr("y", function(d) {
                    return /^[ns]/.test(d) ? -3 : null;
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
                tz.style("display", brush.empty() ? "none" : null);
                tz.exit().remove();
                if (x) {
                    e = d3_scaleRange(x);
                    bg.attr("x", e[0]).attr("width", e[1] - e[0]);
                    redrawX(g);
                }
                if (y) {
                    e = d3_scaleRange(y);
                    bg.attr("y", e[0]).attr("height", e[1] - e[0]);
                    redrawY(g);
                }
                redraw(g);
            });
        }
        function redraw(g) {
            g.selectAll(".resize").attr("transform", function(d) {
                return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
            });
        }
        function redrawX(g) {
            g.select(".extent").attr("x", extent[0][0]);
            g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
        }
        function redrawY(g) {
            g.select(".extent").attr("y", extent[0][1]);
            g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
        }
        function brushstart() {
            var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), center, origin = mouse(), offset;
            var w = d3.select(d3_window).on("mousemove.brush", brushmove).on("mouseup.brush", brushend).on("touchmove.brush", brushmove).on("touchend.brush", brushend).on("keydown.brush", keydown).on("keyup.brush", keyup);
            if (dragging) {
                origin[0] = extent[0][0] - origin[0];
                origin[1] = extent[0][1] - origin[1];
            } else if (resizing) {
                var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
                offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
                origin[0] = extent[ex][0];
                origin[1] = extent[ey][1];
            } else if (d3.event.altKey) center = origin.slice();
            g.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d3.select("body").style("cursor", eventTarget.style("cursor"));
            event_({
                type: "brushstart"
            });
            brushmove();
            d3_eventCancel();
            function mouse() {
                var touches = d3.event.changedTouches;
                return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
            }
            function keydown() {
                if (d3.event.keyCode == 32) {
                    if (!dragging) {
                        center = null;
                        origin[0] -= extent[1][0];
                        origin[1] -= extent[1][1];
                        dragging = 2;
                    }
                    d3_eventCancel();
                }
            }
            function keyup() {
                if (d3.event.keyCode == 32 && dragging == 2) {
                    origin[0] += extent[1][0];
                    origin[1] += extent[1][1];
                    dragging = 0;
                    d3_eventCancel();
                }
            }
            function brushmove() {
                var point = mouse(), moved = false;
                if (offset) {
                    point[0] += offset[0];
                    point[1] += offset[1];
                }
                if (!dragging) {
                    if (d3.event.altKey) {
                        if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
                        origin[0] = extent[+(point[0] < center[0])][0];
                        origin[1] = extent[+(point[1] < center[1])][1];
                    } else center = null;
                }
                if (resizingX && move1(point, x, 0)) {
                    redrawX(g);
                    moved = true;
                }
                if (resizingY && move1(point, y, 1)) {
                    redrawY(g);
                    moved = true;
                }
                if (moved) {
                    redraw(g);
                    event_({
                        type: "brush",
                        mode: dragging ? "move" : "resize"
                    });
                }
            }
            function move1(point, scale, i) {
                var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
                if (dragging) {
                    r0 -= position;
                    r1 -= size + position;
                }
                min = Math.max(r0, Math.min(r1, point[i]));
                if (dragging) {
                    max = (min += position) + size;
                } else {
                    if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
                    if (position < min) {
                        max = min;
                        min = position;
                    } else {
                        max = position;
                    }
                }
                if (extent[0][i] !== min || extent[1][i] !== max) {
                    extentDomain = null;
                    extent[0][i] = min;
                    extent[1][i] = max;
                    return true;
                }
            }
            function brushend() {
                brushmove();
                g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
                d3.select("body").style("cursor", null);
                w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
                event_({
                    type: "brushend"
                });
                d3_eventCancel();
            }
        }
        brush.x = function(z) {
            if (!arguments.length) return x;
            x = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
        };
        brush.y = function(z) {
            if (!arguments.length) return y;
            y = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
        };
        brush.extent = function(z) {
            var x0, x1, y0, y1, t;
            if (!arguments.length) {
                z = extentDomain || extent;
                if (x) {
                    x0 = z[0][0], x1 = z[1][0];
                    if (!extentDomain) {
                        x0 = extent[0][0], x1 = extent[1][0];
                        if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
                        if (x1 < x0) t = x0, x0 = x1, x1 = t;
                    }
                }
                if (y) {
                    y0 = z[0][1], y1 = z[1][1];
                    if (!extentDomain) {
                        y0 = extent[0][1], y1 = extent[1][1];
                        if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
                        if (y1 < y0) t = y0, y0 = y1, y1 = t;
                    }
                }
                return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
            }
            extentDomain = [ [ 0, 0 ], [ 0, 0 ] ];
            if (x) {
                x0 = z[0], x1 = z[1];
                if (y) x0 = x0[0], x1 = x1[0];
                extentDomain[0][0] = x0, extentDomain[1][0] = x1;
                if (x.invert) x0 = x(x0), x1 = x(x1);
                if (x1 < x0) t = x0, x0 = x1, x1 = t;
                extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
            }
            if (y) {
                y0 = z[0], y1 = z[1];
                if (x) y0 = y0[1], y1 = y1[1];
                extentDomain[0][1] = y0, extentDomain[1][1] = y1;
                if (y.invert) y0 = y(y0), y1 = y(y1);
                if (y1 < y0) t = y0, y0 = y1, y1 = t;
                extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
            }
            return brush;
        };
        brush.clear = function() {
            extentDomain = null;
            extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
            return brush;
        };
        brush.empty = function() {
            return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
        };
        return d3.rebind(brush, event, "on");
    };
    var d3_svg_brushCursor = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    };
    var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
    d3.behavior = {};
    d3.behavior.drag = function() {
        var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null;
        function drag() {
            this.on("mousedown.drag", mousedown).on("touchstart.drag", mousedown);
        }
        function mousedown() {
            var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, touchId = d3.event.touches ? d3.event.changedTouches[0].identifier : null, offset, origin_ = point(), moved = 0;
            var w = d3.select(d3_window).on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);
            if (origin) {
                offset = origin.apply(target, arguments);
                offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
            } else {
                offset = [ 0, 0 ];
            }
            if (touchId == null) d3_eventCancel();
            event_({
                type: "dragstart"
            });
            function point() {
                var p = target.parentNode;
                return touchId != null ? d3.touches(p).filter(function(p) {
                    return p.identifier === touchId;
                })[0] : d3.mouse(p);
            }
            function dragmove() {
                if (!target.parentNode) return dragend();
                var p = point(), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
                moved |= dx | dy;
                origin_ = p;
                d3_eventCancel();
                event_({
                    type: "drag",
                    x: p[0] + offset[0],
                    y: p[1] + offset[1],
                    dx: dx,
                    dy: dy
                });
            }
            function dragend() {
                event_({
                    type: "dragend"
                });
                if (moved) {
                    d3_eventCancel();
                    if (d3.event.target === eventTarget) w.on("click.drag", click, true);
                }
                w.on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", null).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", null);
            }
            function click() {
                d3_eventCancel();
                w.on("click.drag", null);
            }
        }
        drag.origin = function(x) {
            if (!arguments.length) return origin;
            origin = x;
            return drag;
        };
        return d3.rebind(drag, event, "on");
    };
    d3.behavior.zoom = function() {
        var translate = [ 0, 0 ], translate0, scale = 1, scale0, scaleExtent = d3_behavior_zoomInfinity, event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1, touchtime;
        function zoom() {
            this.on("mousedown.zoom", mousedown).on("mousemove.zoom", mousemove).on(d3_behavior_zoomWheel + ".zoom", mousewheel).on("dblclick.zoom", dblclick).on("touchstart.zoom", touchstart).on("touchmove.zoom", touchmove).on("touchend.zoom", touchstart);
        }
        zoom.translate = function(x) {
            if (!arguments.length) return translate;
            translate = x.map(Number);
            rescale();
            return zoom;
        };
        zoom.scale = function(x) {
            if (!arguments.length) return scale;
            scale = +x;
            rescale();
            return zoom;
        };
        zoom.scaleExtent = function(x) {
            if (!arguments.length) return scaleExtent;
            scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
            return zoom;
        };
        zoom.x = function(z) {
            if (!arguments.length) return x1;
            x1 = z;
            x0 = z.copy();
            translate = [ 0, 0 ];
            scale = 1;
            return zoom;
        };
        zoom.y = function(z) {
            if (!arguments.length) return y1;
            y1 = z;
            y0 = z.copy();
            translate = [ 0, 0 ];
            scale = 1;
            return zoom;
        };
        function location(p) {
            return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
        }
        function point(l) {
            return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
        }
        function scaleTo(s) {
            scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
        }
        function translateTo(p, l) {
            l = point(l);
            translate[0] += p[0] - l[0];
            translate[1] += p[1] - l[1];
        }
        function rescale() {
            if (x1) x1.domain(x0.range().map(function(x) {
                return (x - translate[0]) / scale;
            }).map(x0.invert));
            if (y1) y1.domain(y0.range().map(function(y) {
                return (y - translate[1]) / scale;
            }).map(y0.invert));
        }
        function dispatch(event) {
            rescale();
            d3.event.preventDefault();
            event({
                type: "zoom",
                scale: scale,
                translate: translate
            });
        }
        function mousedown() {
            var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, moved = 0, w = d3.select(d3_window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup), l = location(d3.mouse(target));
            d3_window.focus();
            d3_eventCancel();
            function mousemove() {
                moved = 1;
                translateTo(d3.mouse(target), l);
                dispatch(event_);
            }
            function mouseup() {
                if (moved) d3_eventCancel();
                w.on("mousemove.zoom", null).on("mouseup.zoom", null);
                if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
            }
            function click() {
                d3_eventCancel();
                w.on("click.zoom", null);
            }
        }
        function mousewheel() {
            if (!translate0) translate0 = location(d3.mouse(this));
            scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
            translateTo(d3.mouse(this), translate0);
            dispatch(event.of(this, arguments));
        }
        function mousemove() {
            translate0 = null;
        }
        function dblclick() {
            var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
            scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
            translateTo(p, l);
            dispatch(event.of(this, arguments));
        }
        function touchstart() {
            var touches = d3.touches(this), now = Date.now();
            scale0 = scale;
            translate0 = {};
            touches.forEach(function(t) {
                translate0[t.identifier] = location(t);
            });
            d3_eventCancel();
            if (touches.length === 1) {
                if (now - touchtime < 500) {
                    var p = touches[0], l = location(touches[0]);
                    scaleTo(scale * 2);
                    translateTo(p, l);
                    dispatch(event.of(this, arguments));
                }
                touchtime = now;
            }
        }
        function touchmove() {
            var touches = d3.touches(this), p0 = touches[0], l0 = translate0[p0.identifier];
            if (p1 = touches[1]) {
                var p1, l1 = translate0[p1.identifier];
                p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
                l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
                scaleTo(d3.event.scale * scale0);
            }
            translateTo(p0, l0);
            touchtime = null;
            dispatch(event.of(this, arguments));
        }
        return d3.rebind(zoom, event, "on");
    };
    var d3_behavior_zoomInfinity = [ 0, Infinity ];
    var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in document ? (d3_behavior_zoomDelta = function() {
        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
    }, "wheel") : "onmousewheel" in document ? (d3_behavior_zoomDelta = function() {
        return d3.event.wheelDelta;
    }, "mousewheel") : (d3_behavior_zoomDelta = function() {
        return -d3.event.detail;
    }, "MozMousePixelScroll");
    d3.layout = {};
    d3.layout.bundle = function() {
        return function(links) {
            var paths = [], i = -1, n = links.length;
            while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
            return paths;
        };
    };
    function d3_layout_bundlePath(link) {
        var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
        while (start !== lca) {
            start = start.parent;
            points.push(start);
        }
        var k = points.length;
        while (end !== lca) {
            points.splice(k, 0, end);
            end = end.parent;
        }
        return points;
    }
    function d3_layout_bundleAncestors(node) {
        var ancestors = [], parent = node.parent;
        while (parent != null) {
            ancestors.push(node);
            node = parent;
            parent = parent.parent;
        }
        ancestors.push(node);
        return ancestors;
    }
    function d3_layout_bundleLeastCommonAncestor(a, b) {
        if (a === b) return a;
        var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
        while (aNode === bNode) {
            sharedNode = aNode;
            aNode = aNodes.pop();
            bNode = bNodes.pop();
        }
        return sharedNode;
    }
    d3.layout.chord = function() {
        var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
        function relayout() {
            var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
            chords = [];
            groups = [];
            k = 0, i = -1;
            while (++i < n) {
                x = 0, j = -1;
                while (++j < n) {
                    x += matrix[i][j];
                }
                groupSums.push(x);
                subgroupIndex.push(d3.range(n));
                k += x;
            }
            if (sortGroups) {
                groupIndex.sort(function(a, b) {
                    return sortGroups(groupSums[a], groupSums[b]);
                });
            }
            if (sortSubgroups) {
                subgroupIndex.forEach(function(d, i) {
                    d.sort(function(a, b) {
                        return sortSubgroups(matrix[i][a], matrix[i][b]);
                    });
                });
            }
            k = (2 * π - padding * n) / k;
            x = 0, i = -1;
            while (++i < n) {
                x0 = x, j = -1;
                while (++j < n) {
                    var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
                    subgroups[di + "-" + dj] = {
                        index: di,
                        subindex: dj,
                        startAngle: a0,
                        endAngle: a1,
                        value: v
                    };
                }
                groups[di] = {
                    index: di,
                    startAngle: x0,
                    endAngle: x,
                    value: (x - x0) / k
                };
                x += padding;
            }
            i = -1;
            while (++i < n) {
                j = i - 1;
                while (++j < n) {
                    var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
                    if (source.value || target.value) {
                        chords.push(source.value < target.value ? {
                            source: target,
                            target: source
                        } : {
                            source: source,
                            target: target
                        });
                    }
                }
            }
            if (sortChords) resort();
        }
        function resort() {
            chords.sort(function(a, b) {
                return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
            });
        }
        chord.matrix = function(x) {
            if (!arguments.length) return matrix;
            n = (matrix = x) && matrix.length;
            chords = groups = null;
            return chord;
        };
        chord.padding = function(x) {
            if (!arguments.length) return padding;
            padding = x;
            chords = groups = null;
            return chord;
        };
        chord.sortGroups = function(x) {
            if (!arguments.length) return sortGroups;
            sortGroups = x;
            chords = groups = null;
            return chord;
        };
        chord.sortSubgroups = function(x) {
            if (!arguments.length) return sortSubgroups;
            sortSubgroups = x;
            chords = null;
            return chord;
        };
        chord.sortChords = function(x) {
            if (!arguments.length) return sortChords;
            sortChords = x;
            if (chords) resort();
            return chord;
        };
        chord.chords = function() {
            if (!chords) relayout();
            return chords;
        };
        chord.groups = function() {
            if (!groups) relayout();
            return groups;
        };
        return chord;
    };
    d3.layout.force = function() {
        var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [], distances, strengths, charges;
        function repulse(node) {
            return function(quad, x1, _, x2) {
                if (quad.point !== node) {
                    var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
                    if ((x2 - x1) * dn < theta) {
                        var k = quad.charge * dn * dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                        return true;
                    }
                    if (quad.point && isFinite(dn)) {
                        var k = quad.pointCharge * dn * dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                    }
                }
                return !quad.charge;
            };
        }
        force.tick = function() {
            if ((alpha *= .99) < .005) {
                event.end({
                    type: "end",
                    alpha: alpha = 0
                });
                return true;
            }
            var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
            for (i = 0; i < m; ++i) {
                o = links[i];
                s = o.source;
                t = o.target;
                x = t.x - s.x;
                y = t.y - s.y;
                if (l = x * x + y * y) {
                    l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
                    x *= l;
                    y *= l;
                    t.x -= x * (k = s.weight / (t.weight + s.weight));
                    t.y -= y * k;
                    s.x += x * (k = 1 - k);
                    s.y += y * k;
                }
            }
            if (k = alpha * gravity) {
                x = size[0] / 2;
                y = size[1] / 2;
                i = -1;
                if (k) while (++i < n) {
                    o = nodes[i];
                    o.x += (x - o.x) * k;
                    o.y += (y - o.y) * k;
                }
            }
            if (charge) {
                d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
                i = -1;
                while (++i < n) {
                    if (!(o = nodes[i]).fixed) {
                        q.visit(repulse(o));
                    }
                }
            }
            i = -1;
            while (++i < n) {
                o = nodes[i];
                if (o.fixed) {
                    o.x = o.px;
                    o.y = o.py;
                } else {
                    o.x -= (o.px - (o.px = o.x)) * friction;
                    o.y -= (o.py - (o.py = o.y)) * friction;
                }
            }
            event.tick({
                type: "tick",
                alpha: alpha
            });
        };
        force.nodes = function(x) {
            if (!arguments.length) return nodes;
            nodes = x;
            return force;
        };
        force.links = function(x) {
            if (!arguments.length) return links;
            links = x;
            return force;
        };
        force.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return force;
        };
        force.linkDistance = function(x) {
            if (!arguments.length) return linkDistance;
            linkDistance = typeof x === "function" ? x : +x;
            return force;
        };
        force.distance = force.linkDistance;
        force.linkStrength = function(x) {
            if (!arguments.length) return linkStrength;
            linkStrength = typeof x === "function" ? x : +x;
            return force;
        };
        force.friction = function(x) {
            if (!arguments.length) return friction;
            friction = +x;
            return force;
        };
        force.charge = function(x) {
            if (!arguments.length) return charge;
            charge = typeof x === "function" ? x : +x;
            return force;
        };
        force.gravity = function(x) {
            if (!arguments.length) return gravity;
            gravity = +x;
            return force;
        };
        force.theta = function(x) {
            if (!arguments.length) return theta;
            theta = +x;
            return force;
        };
        force.alpha = function(x) {
            if (!arguments.length) return alpha;
            x = +x;
            if (alpha) {
                if (x > 0) alpha = x; else alpha = 0;
            } else if (x > 0) {
                event.start({
                    type: "start",
                    alpha: alpha = x
                });
                d3.timer(force.tick);
            }
            return force;
        };
        force.start = function() {
            var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
            for (i = 0; i < n; ++i) {
                (o = nodes[i]).index = i;
                o.weight = 0;
            }
            for (i = 0; i < m; ++i) {
                o = links[i];
                if (typeof o.source == "number") o.source = nodes[o.source];
                if (typeof o.target == "number") o.target = nodes[o.target];
                ++o.source.weight;
                ++o.target.weight;
            }
            for (i = 0; i < n; ++i) {
                o = nodes[i];
                if (isNaN(o.x)) o.x = position("x", w);
                if (isNaN(o.y)) o.y = position("y", h);
                if (isNaN(o.px)) o.px = o.x;
                if (isNaN(o.py)) o.py = o.y;
            }
            distances = [];
            if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
            strengths = [];
            if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
            charges = [];
            if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
            function position(dimension, size) {
                var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
                while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
                return Math.random() * size;
            }
            function neighbor() {
                if (!neighbors) {
                    neighbors = [];
                    for (j = 0; j < n; ++j) {
                        neighbors[j] = [];
                    }
                    for (j = 0; j < m; ++j) {
                        var o = links[j];
                        neighbors[o.source.index].push(o.target);
                        neighbors[o.target.index].push(o.source);
                    }
                }
                return neighbors[i];
            }
            return force.resume();
        };
        force.resume = function() {
            return force.alpha(.1);
        };
        force.stop = function() {
            return force.alpha(0);
        };
        force.drag = function() {
            if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
            if (!arguments.length) return drag;
            this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
        };
        function dragmove(d) {
            d.px = d3.event.x, d.py = d3.event.y;
            force.resume();
        }
        return d3.rebind(force, event, "on");
    };
    function d3_layout_forceDragstart(d) {
        d.fixed |= 2;
    }
    function d3_layout_forceDragend(d) {
        d.fixed &= ~6;
    }
    function d3_layout_forceMouseover(d) {
        d.fixed |= 4;
        d.px = d.x, d.py = d.y;
    }
    function d3_layout_forceMouseout(d) {
        d.fixed &= ~4;
    }
    function d3_layout_forceAccumulate(quad, alpha, charges) {
        var cx = 0, cy = 0;
        quad.charge = 0;
        if (!quad.leaf) {
            var nodes = quad.nodes, n = nodes.length, i = -1, c;
            while (++i < n) {
                c = nodes[i];
                if (c == null) continue;
                d3_layout_forceAccumulate(c, alpha, charges);
                quad.charge += c.charge;
                cx += c.charge * c.cx;
                cy += c.charge * c.cy;
            }
        }
        if (quad.point) {
            if (!quad.leaf) {
                quad.point.x += Math.random() - .5;
                quad.point.y += Math.random() - .5;
            }
            var k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k;
            cx += k * quad.point.x;
            cy += k * quad.point.y;
        }
        quad.cx = cx / quad.charge;
        quad.cy = cy / quad.charge;
    }
    var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1;
    d3.layout.partition = function() {
        var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
        function position(node, x, dx, dy) {
            var children = node.children;
            node.x = x;
            node.y = node.depth * dy;
            node.dx = dx;
            node.dy = dy;
            if (children && (n = children.length)) {
                var i = -1, n, c, d;
                dx = node.value ? dx / node.value : 0;
                while (++i < n) {
                    position(c = children[i], x, d = c.value * dx, dy);
                    x += d;
                }
            }
        }
        function depth(node) {
            var children = node.children, d = 0;
            if (children && (n = children.length)) {
                var i = -1, n;
                while (++i < n) d = Math.max(d, depth(children[i]));
            }
            return 1 + d;
        }
        function partition(d, i) {
            var nodes = hierarchy.call(this, d, i);
            position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
            return nodes;
        }
        partition.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return partition;
        };
        return d3_layout_hierarchyRebind(partition, hierarchy);
    };
    d3.layout.pie = function() {
        var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * π;
        function pie(data) {
            var values = data.map(function(d, i) {
                return +value.call(pie, d, i);
            });
            var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
            var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - startAngle) / d3.sum(values);
            var index = d3.range(data.length);
            if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
                return values[j] - values[i];
            } : function(i, j) {
                return sort(data[i], data[j]);
            });
            var arcs = [];
            index.forEach(function(i) {
                var d;
                arcs[i] = {
                    data: data[i],
                    value: d = values[i],
                    startAngle: a,
                    endAngle: a += d * k
                };
            });
            return arcs;
        }
        pie.value = function(x) {
            if (!arguments.length) return value;
            value = x;
            return pie;
        };
        pie.sort = function(x) {
            if (!arguments.length) return sort;
            sort = x;
            return pie;
        };
        pie.startAngle = function(x) {
            if (!arguments.length) return startAngle;
            startAngle = x;
            return pie;
        };
        pie.endAngle = function(x) {
            if (!arguments.length) return endAngle;
            endAngle = x;
            return pie;
        };
        return pie;
    };
    var d3_layout_pieSortByValue = {};
    d3.layout.stack = function() {
        var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
        function stack(data, index) {
            var series = data.map(function(d, i) {
                return values.call(stack, d, i);
            });
            var points = series.map(function(d) {
                return d.map(function(v, i) {
                    return [ x.call(stack, v, i), y.call(stack, v, i) ];
                });
            });
            var orders = order.call(stack, points, index);
            series = d3.permute(series, orders);
            points = d3.permute(points, orders);
            var offsets = offset.call(stack, points, index);
            var n = series.length, m = series[0].length, i, j, o;
            for (j = 0; j < m; ++j) {
                out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
                for (i = 1; i < n; ++i) {
                    out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
                }
            }
            return data;
        }
        stack.values = function(x) {
            if (!arguments.length) return values;
            values = x;
            return stack;
        };
        stack.order = function(x) {
            if (!arguments.length) return order;
            order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
            return stack;
        };
        stack.offset = function(x) {
            if (!arguments.length) return offset;
            offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
            return stack;
        };
        stack.x = function(z) {
            if (!arguments.length) return x;
            x = z;
            return stack;
        };
        stack.y = function(z) {
            if (!arguments.length) return y;
            y = z;
            return stack;
        };
        stack.out = function(z) {
            if (!arguments.length) return out;
            out = z;
            return stack;
        };
        return stack;
    };
    function d3_layout_stackX(d) {
        return d.x;
    }
    function d3_layout_stackY(d) {
        return d.y;
    }
    function d3_layout_stackOut(d, y0, y) {
        d.y0 = y0;
        d.y = y;
    }
    var d3_layout_stackOrders = d3.map({
        "inside-out": function(data) {
            var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
                return max[a] - max[b];
            }), top = 0, bottom = 0, tops = [], bottoms = [];
            for (i = 0; i < n; ++i) {
                j = index[i];
                if (top < bottom) {
                    top += sums[j];
                    tops.push(j);
                } else {
                    bottom += sums[j];
                    bottoms.push(j);
                }
            }
            return bottoms.reverse().concat(tops);
        },
        reverse: function(data) {
            return d3.range(data.length).reverse();
        },
        "default": d3_layout_stackOrderDefault
    });
    var d3_layout_stackOffsets = d3.map({
        silhouette: function(data) {
            var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
                for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                if (o > max) max = o;
                sums.push(o);
            }
            for (j = 0; j < m; ++j) {
                y0[j] = (max - sums[j]) / 2;
            }
            return y0;
        },
        wiggle: function(data) {
            var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
            y0[0] = o = o0 = 0;
            for (j = 1; j < m; ++j) {
                for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
                for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
                    for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
                        s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
                    }
                    s2 += s3 * data[i][j][1];
                }
                y0[j] = o -= s1 ? s2 / s1 * dx : 0;
                if (o < o0) o0 = o;
            }
            for (j = 0; j < m; ++j) y0[j] -= o0;
            return y0;
        },
        expand: function(data) {
            var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
                for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
            }
            for (j = 0; j < m; ++j) y0[j] = 0;
            return y0;
        },
        zero: d3_layout_stackOffsetZero
    });
    function d3_layout_stackOrderDefault(data) {
        return d3.range(data.length);
    }
    function d3_layout_stackOffsetZero(data) {
        var j = -1, m = data[0].length, y0 = [];
        while (++j < m) y0[j] = 0;
        return y0;
    }
    function d3_layout_stackMaxIndex(array) {
        var i = 1, j = 0, v = array[0][1], k, n = array.length;
        for (;i < n; ++i) {
            if ((k = array[i][1]) > v) {
                j = i;
                v = k;
            }
        }
        return j;
    }
    function d3_layout_stackReduceSum(d) {
        return d.reduce(d3_layout_stackSum, 0);
    }
    function d3_layout_stackSum(p, d) {
        return p + d[1];
    }
    d3.layout.histogram = function() {
        var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
        function histogram(data, i) {
            var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
            while (++i < m) {
                bin = bins[i] = [];
                bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
                bin.y = 0;
            }
            if (m > 0) {
                i = -1;
                while (++i < n) {
                    x = values[i];
                    if (x >= range[0] && x <= range[1]) {
                        bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
                        bin.y += k;
                        bin.push(data[i]);
                    }
                }
            }
            return bins;
        }
        histogram.value = function(x) {
            if (!arguments.length) return valuer;
            valuer = x;
            return histogram;
        };
        histogram.range = function(x) {
            if (!arguments.length) return ranger;
            ranger = d3_functor(x);
            return histogram;
        };
        histogram.bins = function(x) {
            if (!arguments.length) return binner;
            binner = typeof x === "number" ? function(range) {
                return d3_layout_histogramBinFixed(range, x);
            } : d3_functor(x);
            return histogram;
        };
        histogram.frequency = function(x) {
            if (!arguments.length) return frequency;
            frequency = !!x;
            return histogram;
        };
        return histogram;
    };
    function d3_layout_histogramBinSturges(range, values) {
        return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
    }
    function d3_layout_histogramBinFixed(range, n) {
        var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
        while (++x <= n) f[x] = m * x + b;
        return f;
    }
    function d3_layout_histogramRange(values) {
        return [ d3.min(values), d3.max(values) ];
    }
    d3.layout.hierarchy = function() {
        var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
        function recurse(node, depth, nodes) {
            var childs = children.call(hierarchy, node, depth);
            node.depth = depth;
            nodes.push(node);
            if (childs && (n = childs.length)) {
                var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
                while (++i < n) {
                    d = recurse(childs[i], j, nodes);
                    d.parent = node;
                    c.push(d);
                    v += d.value;
                }
                if (sort) c.sort(sort);
                if (value) node.value = v;
            } else if (value) {
                node.value = +value.call(hierarchy, node, depth) || 0;
            }
            return node;
        }
        function revalue(node, depth) {
            var children = node.children, v = 0;
            if (children && (n = children.length)) {
                var i = -1, n, j = depth + 1;
                while (++i < n) v += revalue(children[i], j);
            } else if (value) {
                v = +value.call(hierarchy, node, depth) || 0;
            }
            if (value) node.value = v;
            return v;
        }
        function hierarchy(d) {
            var nodes = [];
            recurse(d, 0, nodes);
            return nodes;
        }
        hierarchy.sort = function(x) {
            if (!arguments.length) return sort;
            sort = x;
            return hierarchy;
        };
        hierarchy.children = function(x) {
            if (!arguments.length) return children;
            children = x;
            return hierarchy;
        };
        hierarchy.value = function(x) {
            if (!arguments.length) return value;
            value = x;
            return hierarchy;
        };
        hierarchy.revalue = function(root) {
            revalue(root, 0);
            return root;
        };
        return hierarchy;
    };
    function d3_layout_hierarchyRebind(object, hierarchy) {
        d3.rebind(object, hierarchy, "sort", "children", "value");
        object.nodes = object;
        object.links = d3_layout_hierarchyLinks;
        return object;
    }
    function d3_layout_hierarchyChildren(d) {
        return d.children;
    }
    function d3_layout_hierarchyValue(d) {
        return d.value;
    }
    function d3_layout_hierarchySort(a, b) {
        return b.value - a.value;
    }
    function d3_layout_hierarchyLinks(nodes) {
        return d3.merge(nodes.map(function(parent) {
            return (parent.children || []).map(function(child) {
                return {
                    source: parent,
                    target: child
                };
            });
        }));
    }
    d3.layout.pack = function() {
        var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ];
        function pack(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0];
            root.x = 0;
            root.y = 0;
            d3_layout_treeVisitAfter(root, function(d) {
                d.r = Math.sqrt(d.value);
            });
            d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
            var w = size[0], h = size[1], k = Math.max(2 * root.r / w, 2 * root.r / h);
            if (padding > 0) {
                var dr = padding * k / 2;
                d3_layout_treeVisitAfter(root, function(d) {
                    d.r += dr;
                });
                d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
                d3_layout_treeVisitAfter(root, function(d) {
                    d.r -= dr;
                });
                k = Math.max(2 * root.r / w, 2 * root.r / h);
            }
            d3_layout_packTransform(root, w / 2, h / 2, 1 / k);
            return nodes;
        }
        pack.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return pack;
        };
        pack.padding = function(_) {
            if (!arguments.length) return padding;
            padding = +_;
            return pack;
        };
        return d3_layout_hierarchyRebind(pack, hierarchy);
    };
    function d3_layout_packSort(a, b) {
        return a.value - b.value;
    }
    function d3_layout_packInsert(a, b) {
        var c = a._pack_next;
        a._pack_next = b;
        b._pack_prev = a;
        b._pack_next = c;
        c._pack_prev = b;
    }
    function d3_layout_packSplice(a, b) {
        a._pack_next = b;
        b._pack_prev = a;
    }
    function d3_layout_packIntersects(a, b) {
        var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
        return dr * dr - dx * dx - dy * dy > .001;
    }
    function d3_layout_packSiblings(node) {
        if (!(nodes = node.children) || !(n = nodes.length)) return;
        var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
        function bound(node) {
            xMin = Math.min(node.x - node.r, xMin);
            xMax = Math.max(node.x + node.r, xMax);
            yMin = Math.min(node.y - node.r, yMin);
            yMax = Math.max(node.y + node.r, yMax);
        }
        nodes.forEach(d3_layout_packLink);
        a = nodes[0];
        a.x = -a.r;
        a.y = 0;
        bound(a);
        if (n > 1) {
            b = nodes[1];
            b.x = b.r;
            b.y = 0;
            bound(b);
            if (n > 2) {
                c = nodes[2];
                d3_layout_packPlace(a, b, c);
                bound(c);
                d3_layout_packInsert(a, c);
                a._pack_prev = c;
                d3_layout_packInsert(c, b);
                b = a._pack_next;
                for (i = 3; i < n; i++) {
                    d3_layout_packPlace(a, b, c = nodes[i]);
                    var isect = 0, s1 = 1, s2 = 1;
                    for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
                        if (d3_layout_packIntersects(j, c)) {
                            isect = 1;
                            break;
                        }
                    }
                    if (isect == 1) {
                        for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
                            if (d3_layout_packIntersects(k, c)) {
                                break;
                            }
                        }
                    }
                    if (isect) {
                        if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
                        i--;
                    } else {
                        d3_layout_packInsert(a, c);
                        b = c;
                        bound(c);
                    }
                }
            }
        }
        var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
        for (i = 0; i < n; i++) {
            c = nodes[i];
            c.x -= cx;
            c.y -= cy;
            cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
        }
        node.r = cr;
        nodes.forEach(d3_layout_packUnlink);
    }
    function d3_layout_packLink(node) {
        node._pack_next = node._pack_prev = node;
    }
    function d3_layout_packUnlink(node) {
        delete node._pack_next;
        delete node._pack_prev;
    }
    function d3_layout_packTransform(node, x, y, k) {
        var children = node.children;
        node.x = x += k * node.x;
        node.y = y += k * node.y;
        node.r *= k;
        if (children) {
            var i = -1, n = children.length;
            while (++i < n) d3_layout_packTransform(children[i], x, y, k);
        }
    }
    function d3_layout_packPlace(a, b, c) {
        var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
        if (db && (dx || dy)) {
            var da = b.r + c.r, dc = dx * dx + dy * dy;
            da *= da;
            db *= db;
            var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
            c.x = a.x + x * dx + y * dy;
            c.y = a.y + x * dy - y * dx;
        } else {
            c.x = a.x + db;
            c.y = a.y;
        }
    }
    d3.layout.cluster = function() {
        var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
        function cluster(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
            d3_layout_treeVisitAfter(root, function(node) {
                var children = node.children;
                if (children && children.length) {
                    node.x = d3_layout_clusterX(children);
                    node.y = d3_layout_clusterY(children);
                } else {
                    node.x = previousNode ? x += separation(node, previousNode) : 0;
                    node.y = 0;
                    previousNode = node;
                }
            });
            var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
            d3_layout_treeVisitAfter(root, function(node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0];
                node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
            });
            return nodes;
        }
        cluster.separation = function(x) {
            if (!arguments.length) return separation;
            separation = x;
            return cluster;
        };
        cluster.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return cluster;
        };
        return d3_layout_hierarchyRebind(cluster, hierarchy);
    };
    function d3_layout_clusterY(children) {
        return 1 + d3.max(children, function(child) {
            return child.y;
        });
    }
    function d3_layout_clusterX(children) {
        return children.reduce(function(x, child) {
            return x + child.x;
        }, 0) / children.length;
    }
    function d3_layout_clusterLeft(node) {
        var children = node.children;
        return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
    }
    function d3_layout_clusterRight(node) {
        var children = node.children, n;
        return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
    }
    d3.layout.tree = function() {
        var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
        function tree(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0];
            function firstWalk(node, previousSibling) {
                var children = node.children, layout = node._tree;
                if (children && (n = children.length)) {
                    var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
                    while (++i < n) {
                        child = children[i];
                        firstWalk(child, previousChild);
                        ancestor = apportion(child, previousChild, ancestor);
                        previousChild = child;
                    }
                    d3_layout_treeShift(node);
                    var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
                    if (previousSibling) {
                        layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
                        layout.mod = layout.prelim - midpoint;
                    } else {
                        layout.prelim = midpoint;
                    }
                } else {
                    if (previousSibling) {
                        layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
                    }
                }
            }
            function secondWalk(node, x) {
                node.x = node._tree.prelim + x;
                var children = node.children;
                if (children && (n = children.length)) {
                    var i = -1, n;
                    x += node._tree.mod;
                    while (++i < n) {
                        secondWalk(children[i], x);
                    }
                }
            }
            function apportion(node, previousSibling, ancestor) {
                if (previousSibling) {
                    var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
                    while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
                        vom = d3_layout_treeLeft(vom);
                        vop = d3_layout_treeRight(vop);
                        vop._tree.ancestor = node;
                        shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
                        if (shift > 0) {
                            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
                            sip += shift;
                            sop += shift;
                        }
                        sim += vim._tree.mod;
                        sip += vip._tree.mod;
                        som += vom._tree.mod;
                        sop += vop._tree.mod;
                    }
                    if (vim && !d3_layout_treeRight(vop)) {
                        vop._tree.thread = vim;
                        vop._tree.mod += sim - sop;
                    }
                    if (vip && !d3_layout_treeLeft(vom)) {
                        vom._tree.thread = vip;
                        vom._tree.mod += sip - som;
                        ancestor = node;
                    }
                }
                return ancestor;
            }
            d3_layout_treeVisitAfter(root, function(node, previousSibling) {
                node._tree = {
                    ancestor: node,
                    prelim: 0,
                    mod: 0,
                    change: 0,
                    shift: 0,
                    number: previousSibling ? previousSibling._tree.number + 1 : 0
                };
            });
            firstWalk(root);
            secondWalk(root, -root._tree.prelim);
            var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
            d3_layout_treeVisitAfter(root, function(node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0];
                node.y = node.depth / y1 * size[1];
                delete node._tree;
            });
            return nodes;
        }
        tree.separation = function(x) {
            if (!arguments.length) return separation;
            separation = x;
            return tree;
        };
        tree.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return tree;
        };
        return d3_layout_hierarchyRebind(tree, hierarchy);
    };
    function d3_layout_treeSeparation(a, b) {
        return a.parent == b.parent ? 1 : 2;
    }
    function d3_layout_treeLeft(node) {
        var children = node.children;
        return children && children.length ? children[0] : node._tree.thread;
    }
    function d3_layout_treeRight(node) {
        var children = node.children, n;
        return children && (n = children.length) ? children[n - 1] : node._tree.thread;
    }
    function d3_layout_treeSearch(node, compare) {
        var children = node.children;
        if (children && (n = children.length)) {
            var child, n, i = -1;
            while (++i < n) {
                if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
                    node = child;
                }
            }
        }
        return node;
    }
    function d3_layout_treeRightmost(a, b) {
        return a.x - b.x;
    }
    function d3_layout_treeLeftmost(a, b) {
        return b.x - a.x;
    }
    function d3_layout_treeDeepest(a, b) {
        return a.depth - b.depth;
    }
    function d3_layout_treeVisitAfter(node, callback) {
        function visit(node, previousSibling) {
            var children = node.children;
            if (children && (n = children.length)) {
                var child, previousChild = null, i = -1, n;
                while (++i < n) {
                    child = children[i];
                    visit(child, previousChild);
                    previousChild = child;
                }
            }
            callback(node, previousSibling);
        }
        visit(node, null);
    }
    function d3_layout_treeShift(node) {
        var shift = 0, change = 0, children = node.children, i = children.length, child;
        while (--i >= 0) {
            child = children[i]._tree;
            child.prelim += shift;
            child.mod += shift;
            shift += child.shift + (change += child.change);
        }
    }
    function d3_layout_treeMove(ancestor, node, shift) {
        ancestor = ancestor._tree;
        node = node._tree;
        var change = shift / (node.number - ancestor.number);
        ancestor.change += change;
        node.change -= change;
        node.shift += shift;
        node.prelim += shift;
        node.mod += shift;
    }
    function d3_layout_treeAncestor(vim, node, ancestor) {
        return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
    }
    d3.layout.treemap = function() {
        var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
        function scale(children, k) {
            var i = -1, n = children.length, child, area;
            while (++i < n) {
                area = (child = children[i]).value * (k < 0 ? 0 : k);
                child.area = isNaN(area) || area <= 0 ? 0 : area;
            }
        }
        function squarify(node) {
            var children = node.children;
            if (children && children.length) {
                var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
                scale(remaining, rect.dx * rect.dy / node.value);
                row.area = 0;
                while ((n = remaining.length) > 0) {
                    row.push(child = remaining[n - 1]);
                    row.area += child.area;
                    if (mode !== "squarify" || (score = worst(row, u)) <= best) {
                        remaining.pop();
                        best = score;
                    } else {
                        row.area -= row.pop().area;
                        position(row, u, rect, false);
                        u = Math.min(rect.dx, rect.dy);
                        row.length = row.area = 0;
                        best = Infinity;
                    }
                }
                if (row.length) {
                    position(row, u, rect, true);
                    row.length = row.area = 0;
                }
                children.forEach(squarify);
            }
        }
        function stickify(node) {
            var children = node.children;
            if (children && children.length) {
                var rect = pad(node), remaining = children.slice(), child, row = [];
                scale(remaining, rect.dx * rect.dy / node.value);
                row.area = 0;
                while (child = remaining.pop()) {
                    row.push(child);
                    row.area += child.area;
                    if (child.z != null) {
                        position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
                        row.length = row.area = 0;
                    }
                }
                children.forEach(stickify);
            }
        }
        function worst(row, u) {
            var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
            while (++i < n) {
                if (!(r = row[i].area)) continue;
                if (r < rmin) rmin = r;
                if (r > rmax) rmax = r;
            }
            s *= s;
            u *= u;
            return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
        }
        function position(row, u, rect, flush) {
            var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
            if (u == rect.dx) {
                if (flush || v > rect.dy) v = rect.dy;
                while (++i < n) {
                    o = row[i];
                    o.x = x;
                    o.y = y;
                    o.dy = v;
                    x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
                }
                o.z = true;
                o.dx += rect.x + rect.dx - x;
                rect.y += v;
                rect.dy -= v;
            } else {
                if (flush || v > rect.dx) v = rect.dx;
                while (++i < n) {
                    o = row[i];
                    o.x = x;
                    o.y = y;
                    o.dx = v;
                    y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
                }
                o.z = false;
                o.dy += rect.y + rect.dy - y;
                rect.x += v;
                rect.dx -= v;
            }
        }
        function treemap(d) {
            var nodes = stickies || hierarchy(d), root = nodes[0];
            root.x = 0;
            root.y = 0;
            root.dx = size[0];
            root.dy = size[1];
            if (stickies) hierarchy.revalue(root);
            scale([ root ], root.dx * root.dy / root.value);
            (stickies ? stickify : squarify)(root);
            if (sticky) stickies = nodes;
            return nodes;
        }
        treemap.size = function(x) {
            if (!arguments.length) return size;
            size = x;
            return treemap;
        };
        treemap.padding = function(x) {
            if (!arguments.length) return padding;
            function padFunction(node) {
                var p = x.call(treemap, node, node.depth);
                return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
            }
            function padConstant(node) {
                return d3_layout_treemapPad(node, x);
            }
            var type;
            pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
            padConstant) : padConstant;
            return treemap;
        };
        treemap.round = function(x) {
            if (!arguments.length) return round != Number;
            round = x ? Math.round : Number;
            return treemap;
        };
        treemap.sticky = function(x) {
            if (!arguments.length) return sticky;
            sticky = x;
            stickies = null;
            return treemap;
        };
        treemap.ratio = function(x) {
            if (!arguments.length) return ratio;
            ratio = x;
            return treemap;
        };
        treemap.mode = function(x) {
            if (!arguments.length) return mode;
            mode = x + "";
            return treemap;
        };
        return d3_layout_hierarchyRebind(treemap, hierarchy);
    };
    function d3_layout_treemapPadNull(node) {
        return {
            x: node.x,
            y: node.y,
            dx: node.dx,
            dy: node.dy
        };
    }
    function d3_layout_treemapPad(node, padding) {
        var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
        if (dx < 0) {
            x += dx / 2;
            dx = 0;
        }
        if (dy < 0) {
            y += dy / 2;
            dy = 0;
        }
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy
        };
    }
    function d3_dsv(delimiter, mimeType) {
        var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
        function dsv(url, callback) {
            return d3.xhr(url, mimeType, callback).response(response);
        }
        function response(request) {
            return dsv.parse(request.responseText);
        }
        dsv.parse = function(text) {
            var o;
            return dsv.parseRows(text, function(row) {
                if (o) return o(row);
                o = new Function("d", "return {" + row.map(function(name, i) {
                    return JSON.stringify(name) + ": d[" + i + "]";
                }).join(",") + "}");
            });
        };
        dsv.parseRows = function(text, f) {
            var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
            function token() {
                if (I >= N) return EOF;
                if (eol) return eol = false, EOL;
                var j = I;
                if (text.charCodeAt(j) === 34) {
                    var i = j;
                    while (i++ < N) {
                        if (text.charCodeAt(i) === 34) {
                            if (text.charCodeAt(i + 1) !== 34) break;
                            ++i;
                        }
                    }
                    I = i + 2;
                    var c = text.charCodeAt(i + 1);
                    if (c === 13) {
                        eol = true;
                        if (text.charCodeAt(i + 2) === 10) ++I;
                    } else if (c === 10) {
                        eol = true;
                    }
                    return text.substring(j + 1, i).replace(/""/g, '"');
                }
                while (I < N) {
                    var c = text.charCodeAt(I++), k = 1;
                    if (c === 10) eol = true; else if (c === 13) {
                        eol = true;
                        if (text.charCodeAt(I) === 10) ++I, ++k;
                    } else if (c !== delimiterCode) continue;
                    return text.substring(j, I - k);
                }
                return text.substring(j);
            }
            while ((t = token()) !== EOF) {
                var a = [];
                while (t !== EOL && t !== EOF) {
                    a.push(t);
                    t = token();
                }
                if (f && !(a = f(a, n++))) continue;
                rows.push(a);
            }
            return rows;
        };
        dsv.format = function(rows) {
            return rows.map(formatRow).join("\n");
        };
        function formatRow(row) {
            return row.map(formatValue).join(delimiter);
        }
        function formatValue(text) {
            return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
        }
        return dsv;
    }
    d3.csv = d3_dsv(",", "text/csv");
    d3.tsv = d3_dsv("	", "text/tab-separated-values");
    d3.geo = {};
    d3.geo.stream = function(object, listener) {
        if (d3_geo_streamObjectType.hasOwnProperty(object.type)) {
            d3_geo_streamObjectType[object.type](object, listener);
        } else {
            d3_geo_streamGeometry(object, listener);
        }
    };
    function d3_geo_streamGeometry(geometry, listener) {
        if (d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
            d3_geo_streamGeometryType[geometry.type](geometry, listener);
        }
    }
    var d3_geo_streamObjectType = {
        Feature: function(feature, listener) {
            d3_geo_streamGeometry(feature.geometry, listener);
        },
        FeatureCollection: function(object, listener) {
            var features = object.features, i = -1, n = features.length;
            while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
        }
    };
    var d3_geo_streamGeometryType = {
        Sphere: function(object, listener) {
            listener.sphere();
        },
        Point: function(object, listener) {
            var coordinate = object.coordinates;
            listener.point(coordinate[0], coordinate[1]);
        },
        MultiPoint: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length, coordinate;
            while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
        },
        LineString: function(object, listener) {
            d3_geo_streamLine(object.coordinates, listener, 0);
        },
        MultiLineString: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length;
            while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
        },
        Polygon: function(object, listener) {
            d3_geo_streamPolygon(object.coordinates, listener);
        },
        MultiPolygon: function(object, listener) {
            var coordinates = object.coordinates, i = -1, n = coordinates.length;
            while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
        },
        GeometryCollection: function(object, listener) {
            var geometries = object.geometries, i = -1, n = geometries.length;
            while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
        }
    };
    function d3_geo_streamLine(coordinates, listener, closed) {
        var i = -1, n = coordinates.length - closed, coordinate;
        listener.lineStart();
        while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
        listener.lineEnd();
    }
    function d3_geo_streamPolygon(coordinates, listener) {
        var i = -1, n = coordinates.length;
        listener.polygonStart();
        while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
        listener.polygonEnd();
    }
    function d3_geo_spherical(cartesian) {
        return [ Math.atan2(cartesian[1], cartesian[0]), Math.asin(Math.max(-1, Math.min(1, cartesian[2]))) ];
    }
    function d3_geo_sphericalEqual(a, b) {
        return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
    }
    function d3_geo_cartesian(spherical) {
        var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
        return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
    }
    function d3_geo_cartesianDot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function d3_geo_cartesianCross(a, b) {
        return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
    }
    function d3_geo_cartesianAdd(a, b) {
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
    }
    function d3_geo_cartesianScale(vector, k) {
        return [ vector[0] * k, vector[1] * k, vector[2] * k ];
    }
    function d3_geo_cartesianNormalize(d) {
        var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
        d[0] /= l;
        d[1] /= l;
        d[2] /= l;
    }
    function d3_geo_resample(project) {
        var δ2 = .5, maxDepth = 16;
        function resample(stream) {
            var λ0, x0, y0, a0, b0, c0;
            var resample = {
                point: point,
                lineStart: lineStart,
                lineEnd: lineEnd,
                polygonStart: function() {
                    stream.polygonStart();
                    resample.lineStart = polygonLineStart;
                },
                polygonEnd: function() {
                    stream.polygonEnd();
                    resample.lineStart = lineStart;
                }
            };
            function point(x, y) {
                x = project(x, y);
                stream.point(x[0], x[1]);
            }
            function lineStart() {
                x0 = NaN;
                resample.point = linePoint;
                stream.lineStart();
            }
            function linePoint(λ, φ) {
                var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
                resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
                stream.point(x0, y0);
            }
            function lineEnd() {
                resample.point = point;
                stream.lineEnd();
            }
            function polygonLineStart() {
                var λ00, φ00, x00, y00, a00, b00, c00;
                lineStart();
                resample.point = function(λ, φ) {
                    linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
                    resample.point = linePoint;
                };
                resample.lineEnd = function() {
                    resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
                    resample.lineEnd = lineEnd;
                    lineEnd();
                };
            }
            return resample;
        }
        function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
            var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
            if (d2 > 4 * δ2 && depth--) {
                var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
                if (dz * dz / d2 > δ2 || Math.abs((dx * dx2 + dy * dy2) / d2 - .5) > .3) {
                    resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
                    stream.point(x2, y2);
                    resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
                }
            }
        }
        resample.precision = function(_) {
            if (!arguments.length) return Math.sqrt(δ2);
            maxDepth = (δ2 = _ * _) > 0 && 16;
            return resample;
        };
        return resample;
    }
    d3.geo.albersUsa = function() {
        var lower48 = d3.geo.albers();
        var alaska = d3.geo.albers().rotate([ 160, 0 ]).center([ 0, 60 ]).parallels([ 55, 65 ]);
        var hawaii = d3.geo.albers().rotate([ 160, 0 ]).center([ 0, 20 ]).parallels([ 8, 18 ]);
        var puertoRico = d3.geo.albers().rotate([ 60, 0 ]).center([ 0, 10 ]).parallels([ 8, 18 ]);
        function albersUsa(coordinates) {
            return projection(coordinates)(coordinates);
        }
        function projection(point) {
            var lon = point[0], lat = point[1];
            return lat > 50 ? alaska : lon < -140 ? hawaii : lat < 21 ? puertoRico : lower48;
        }
        albersUsa.scale = function(x) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(x);
            alaska.scale(x * .6);
            hawaii.scale(x);
            puertoRico.scale(x * 1.5);
            return albersUsa.translate(lower48.translate());
        };
        albersUsa.translate = function(x) {
            if (!arguments.length) return lower48.translate();
            var dz = lower48.scale(), dx = x[0], dy = x[1];
            lower48.translate(x);
            alaska.translate([ dx - .4 * dz, dy + .17 * dz ]);
            hawaii.translate([ dx - .19 * dz, dy + .2 * dz ]);
            puertoRico.translate([ dx + .58 * dz, dy + .43 * dz ]);
            return albersUsa;
        };
        return albersUsa.scale(lower48.scale());
    };
    function d3_geo_albers(φ0, φ1) {
        var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
        function albers(λ, φ) {
            var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
            return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
        }
        albers.invert = function(x, y) {
            var ρ0_y = ρ0 - y;
            return [ Math.atan2(x, ρ0_y) / n, Math.asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
        };
        return albers;
    }
    (d3.geo.albers = function() {
        var φ0 = 29.5 * d3_radians, φ1 = 45.5 * d3_radians, m = d3_geo_projectionMutator(d3_geo_albers), p = m(φ0, φ1);
        p.parallels = function(_) {
            if (!arguments.length) return [ φ0 * d3_degrees, φ1 * d3_degrees ];
            return m(φ0 = _[0] * d3_radians, φ1 = _[1] * d3_radians);
        };
        return p.rotate([ 98, 0 ]).center([ 0, 38 ]).scale(1e3);
    }).raw = d3_geo_albers;
    var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
        return Math.sqrt(2 / (1 + cosλcosφ));
    }, function(ρ) {
        return 2 * Math.asin(ρ / 2);
    });
    (d3.geo.azimuthalEqualArea = function() {
        return d3_geo_projection(d3_geo_azimuthalEqualArea);
    }).raw = d3_geo_azimuthalEqualArea;
    var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
        var c = Math.acos(cosλcosφ);
        return c && c / Math.sin(c);
    }, d3_identity);
    (d3.geo.azimuthalEquidistant = function() {
        return d3_geo_projection(d3_geo_azimuthalEquidistant);
    }).raw = d3_geo_azimuthalEquidistant;
    d3.geo.bounds = d3_geo_bounds(d3_identity);
    function d3_geo_bounds(projectStream) {
        var x0, y0, x1, y1;
        var bound = {
            point: boundPoint,
            lineStart: d3_noop,
            lineEnd: d3_noop,
            polygonStart: function() {
                bound.lineEnd = boundPolygonLineEnd;
            },
            polygonEnd: function() {
                bound.point = boundPoint;
            }
        };
        function boundPoint(x, y) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
        }
        function boundPolygonLineEnd() {
            bound.point = bound.lineEnd = d3_noop;
        }
        return function(feature) {
            y1 = x1 = -(x0 = y0 = Infinity);
            d3.geo.stream(feature, projectStream(bound));
            return [ [ x0, y0 ], [ x1, y1 ] ];
        };
    }
    d3.geo.centroid = function(object) {
        d3_geo_centroidDimension = d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
        d3.geo.stream(object, d3_geo_centroid);
        var m;
        if (d3_geo_centroidW && Math.abs(m = Math.sqrt(d3_geo_centroidX * d3_geo_centroidX + d3_geo_centroidY * d3_geo_centroidY + d3_geo_centroidZ * d3_geo_centroidZ)) > ε) {
            return [ Math.atan2(d3_geo_centroidY, d3_geo_centroidX) * d3_degrees, Math.asin(Math.max(-1, Math.min(1, d3_geo_centroidZ / m))) * d3_degrees ];
        }
    };
    var d3_geo_centroidDimension, d3_geo_centroidW, d3_geo_centroidX, d3_geo_centroidY, d3_geo_centroidZ;
    var d3_geo_centroid = {
        sphere: function() {
            if (d3_geo_centroidDimension < 2) {
                d3_geo_centroidDimension = 2;
                d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
            }
        },
        point: d3_geo_centroidPoint,
        lineStart: d3_geo_centroidLineStart,
        lineEnd: d3_geo_centroidLineEnd,
        polygonStart: function() {
            if (d3_geo_centroidDimension < 2) {
                d3_geo_centroidDimension = 2;
                d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
            }
            d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
        },
        polygonEnd: function() {
            d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
        }
    };
    function d3_geo_centroidPoint(λ, φ) {
        if (d3_geo_centroidDimension) return;
        ++d3_geo_centroidW;
        λ *= d3_radians;
        var cosφ = Math.cos(φ *= d3_radians);
        d3_geo_centroidX += (cosφ * Math.cos(λ) - d3_geo_centroidX) / d3_geo_centroidW;
        d3_geo_centroidY += (cosφ * Math.sin(λ) - d3_geo_centroidY) / d3_geo_centroidW;
        d3_geo_centroidZ += (Math.sin(φ) - d3_geo_centroidZ) / d3_geo_centroidW;
    }
    function d3_geo_centroidRingStart() {
        var λ00, φ00;
        d3_geo_centroidDimension = 1;
        d3_geo_centroidLineStart();
        d3_geo_centroidDimension = 2;
        var linePoint = d3_geo_centroid.point;
        d3_geo_centroid.point = function(λ, φ) {
            linePoint(λ00 = λ, φ00 = φ);
        };
        d3_geo_centroid.lineEnd = function() {
            d3_geo_centroid.point(λ00, φ00);
            d3_geo_centroidLineEnd();
            d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
        };
    }
    function d3_geo_centroidLineStart() {
        var x0, y0, z0;
        if (d3_geo_centroidDimension > 1) return;
        if (d3_geo_centroidDimension < 1) {
            d3_geo_centroidDimension = 1;
            d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
        }
        d3_geo_centroid.point = function(λ, φ) {
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians);
            x0 = cosφ * Math.cos(λ);
            y0 = cosφ * Math.sin(λ);
            z0 = Math.sin(φ);
            d3_geo_centroid.point = nextPoint;
        };
        function nextPoint(λ, φ) {
            λ *= d3_radians;
            var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
            d3_geo_centroidW += w;
            d3_geo_centroidX += w * (x0 + (x0 = x));
            d3_geo_centroidY += w * (y0 + (y0 = y));
            d3_geo_centroidZ += w * (z0 + (z0 = z));
        }
    }
    function d3_geo_centroidLineEnd() {
        d3_geo_centroid.point = d3_geo_centroidPoint;
    }
    d3.geo.circle = function() {
        var origin = [ 0, 0 ], angle, precision = 6, interpolate;
        function circle() {
            var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
            interpolate(null, null, 1, {
                point: function(x, y) {
                    ring.push(x = rotate(x, y));
                    x[0] *= d3_degrees, x[1] *= d3_degrees;
                }
            });
            return {
                type: "Polygon",
                coordinates: [ ring ]
            };
        }
        circle.origin = function(x) {
            if (!arguments.length) return origin;
            origin = x;
            return circle;
        };
        circle.angle = function(x) {
            if (!arguments.length) return angle;
            interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
            return circle;
        };
        circle.precision = function(_) {
            if (!arguments.length) return precision;
            interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
            return circle;
        };
        return circle.angle(90);
    };
    function d3_geo_circleInterpolate(radians, precision) {
        var cr = Math.cos(radians), sr = Math.sin(radians);
        return function(from, to, direction, listener) {
            if (from != null) {
                from = d3_geo_circleAngle(cr, from);
                to = d3_geo_circleAngle(cr, to);
                if (direction > 0 ? from < to : from > to) from += direction * 2 * π;
            } else {
                from = radians + direction * 2 * π;
                to = radians;
            }
            var point;
            for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
                listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
            }
        };
    }
    function d3_geo_circleAngle(cr, point) {
        var a = d3_geo_cartesian(point);
        a[0] -= cr;
        d3_geo_cartesianNormalize(a);
        var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
        return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
    }
    function d3_geo_clip(pointVisible, clipLine, interpolate) {
        return function(listener) {
            var line = clipLine(listener);
            var clip = {
                point: point,
                lineStart: lineStart,
                lineEnd: lineEnd,
                polygonStart: function() {
                    clip.point = pointRing;
                    clip.lineStart = ringStart;
                    clip.lineEnd = ringEnd;
                    invisible = false;
                    invisibleArea = visibleArea = 0;
                    segments = [];
                    listener.polygonStart();
                },
                polygonEnd: function() {
                    clip.point = point;
                    clip.lineStart = lineStart;
                    clip.lineEnd = lineEnd;
                    segments = d3.merge(segments);
                    if (segments.length) {
                        d3_geo_clipPolygon(segments, interpolate, listener);
                    } else if (visibleArea < -ε || invisible && invisibleArea < -ε) {
                        listener.lineStart();
                        interpolate(null, null, 1, listener);
                        listener.lineEnd();
                    }
                    listener.polygonEnd();
                    segments = null;
                },
                sphere: function() {
                    listener.polygonStart();
                    listener.lineStart();
                    interpolate(null, null, 1, listener);
                    listener.lineEnd();
                    listener.polygonEnd();
                }
            };
            function point(λ, φ) {
                if (pointVisible(λ, φ)) listener.point(λ, φ);
            }
            function pointLine(λ, φ) {
                line.point(λ, φ);
            }
            function lineStart() {
                clip.point = pointLine;
                line.lineStart();
            }
            function lineEnd() {
                clip.point = point;
                line.lineEnd();
            }
            var segments, visibleArea, invisibleArea, invisible;
            var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), ring;
            function pointRing(λ, φ) {
                ringListener.point(λ, φ);
                ring.push([ λ, φ ]);
            }
            function ringStart() {
                ringListener.lineStart();
                ring = [];
            }
            function ringEnd() {
                pointRing(ring[0][0], ring[0][1]);
                ringListener.lineEnd();
                var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
                if (!n) {
                    invisible = true;
                    invisibleArea += d3_geo_clipAreaRing(ring, -1);
                    ring = null;
                    return;
                }
                ring = null;
                if (clean & 1) {
                    segment = ringSegments[0];
                    visibleArea += d3_geo_clipAreaRing(segment, 1);
                    var n = segment.length - 1, i = -1, point;
                    listener.lineStart();
                    while (++i < n) listener.point((point = segment[i])[0], point[1]);
                    listener.lineEnd();
                    return;
                }
                if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
                segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
            }
            return clip;
        };
    }
    function d3_geo_clipPolygon(segments, interpolate, listener) {
        var subject = [], clip = [];
        segments.forEach(function(segment) {
            var n = segment.length;
            if (n <= 1) return;
            var p0 = segment[0], p1 = segment[n - 1], a = {
                point: p0,
                points: segment,
                other: null,
                visited: false,
                entry: true,
                subject: true
            }, b = {
                point: p0,
                points: [ p0 ],
                other: a,
                visited: false,
                entry: false,
                subject: false
            };
            a.other = b;
            subject.push(a);
            clip.push(b);
            a = {
                point: p1,
                points: [ p1 ],
                other: null,
                visited: false,
                entry: false,
                subject: true
            };
            b = {
                point: p1,
                points: [ p1 ],
                other: a,
                visited: false,
                entry: true,
                subject: false
            };
            a.other = b;
            subject.push(a);
            clip.push(b);
        });
        clip.sort(d3_geo_clipSort);
        d3_geo_clipLinkCircular(subject);
        d3_geo_clipLinkCircular(clip);
        if (!subject.length) return;
        var start = subject[0], current, points, point;
        while (1) {
            current = start;
            while (current.visited) if ((current = current.next) === start) return;
            points = current.points;
            listener.lineStart();
            do {
                current.visited = current.other.visited = true;
                if (current.entry) {
                    if (current.subject) {
                        for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
                    } else {
                        interpolate(current.point, current.next.point, 1, listener);
                    }
                    current = current.next;
                } else {
                    if (current.subject) {
                        points = current.prev.points;
                        for (var i = points.length; --i >= 0; ) listener.point((point = points[i])[0], point[1]);
                    } else {
                        interpolate(current.point, current.prev.point, -1, listener);
                    }
                    current = current.prev;
                }
                current = current.other;
                points = current.points;
            } while (!current.visited);
            listener.lineEnd();
        }
    }
    function d3_geo_clipLinkCircular(array) {
        if (!(n = array.length)) return;
        var n, i = 0, a = array[0], b;
        while (++i < n) {
            a.next = b = array[i];
            b.prev = a;
            a = b;
        }
        a.next = b = array[0];
        b.prev = a;
    }
    function d3_geo_clipSort(a, b) {
        return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1]) - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
    }
    function d3_geo_clipSegmentLength1(segment) {
        return segment.length > 1;
    }
    function d3_geo_clipBufferListener() {
        var lines = [], line;
        return {
            lineStart: function() {
                lines.push(line = []);
            },
            point: function(λ, φ) {
                line.push([ λ, φ ]);
            },
            lineEnd: d3_noop,
            buffer: function() {
                var buffer = lines;
                lines = [];
                line = null;
                return buffer;
            }
        };
    }
    function d3_geo_clipAreaRing(ring, invisible) {
        if (!(n = ring.length)) return 0;
        var n, i = 0, area = 0, p = ring[0], λ = p[0], φ = p[1], cosφ = Math.cos(φ), x0 = Math.atan2(invisible * Math.sin(λ) * cosφ, Math.sin(φ)), y0 = 1 - invisible * Math.cos(λ) * cosφ, x1 = x0, x, y;
        while (++i < n) {
            p = ring[i];
            cosφ = Math.cos(φ = p[1]);
            x = Math.atan2(invisible * Math.sin(λ = p[0]) * cosφ, Math.sin(φ));
            y = 1 - invisible * Math.cos(λ) * cosφ;
            if (Math.abs(y0 - 2) < ε && Math.abs(y - 2) < ε) continue;
            if (Math.abs(y) < ε || Math.abs(y0) < ε) {} else if (Math.abs(Math.abs(x - x0) - π) < ε) {
                if (y + y0 > 2) area += 4 * (x - x0);
            } else if (Math.abs(y0 - 2) < ε) area += 4 * (x - x1); else area += ((3 * π + x - x0) % (2 * π) - π) * (y0 + y);
            x1 = x0, x0 = x, y0 = y;
        }
        return area;
    }
    var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate);
    function d3_geo_clipAntimeridianLine(listener) {
        var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
        return {
            lineStart: function() {
                listener.lineStart();
                clean = 1;
            },
            point: function(λ1, φ1) {
                var sλ1 = λ1 > 0 ? π : -π, dλ = Math.abs(λ1 - λ0);
                if (Math.abs(dλ - π) < ε) {
                    listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
                    listener.point(sλ0, φ0);
                    listener.lineEnd();
                    listener.lineStart();
                    listener.point(sλ1, φ0);
                    listener.point(λ1, φ0);
                    clean = 0;
                } else if (sλ0 !== sλ1 && dλ >= π) {
                    if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
                    if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
                    φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
                    listener.point(sλ0, φ0);
                    listener.lineEnd();
                    listener.lineStart();
                    listener.point(sλ1, φ0);
                    clean = 0;
                }
                listener.point(λ0 = λ1, φ0 = φ1);
                sλ0 = sλ1;
            },
            lineEnd: function() {
                listener.lineEnd();
                λ0 = φ0 = NaN;
            },
            clean: function() {
                return 2 - clean;
            }
        };
    }
    function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
        var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
        return Math.abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
    }
    function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
        var φ;
        if (from == null) {
            φ = direction * π / 2;
            listener.point(-π, φ);
            listener.point(0, φ);
            listener.point(π, φ);
            listener.point(π, 0);
            listener.point(π, -φ);
            listener.point(0, -φ);
            listener.point(-π, -φ);
            listener.point(-π, 0);
            listener.point(-π, φ);
        } else if (Math.abs(from[0] - to[0]) > ε) {
            var s = (from[0] < to[0] ? 1 : -1) * π;
            φ = direction * s / 2;
            listener.point(-s, φ);
            listener.point(0, φ);
            listener.point(s, φ);
        } else {
            listener.point(to[0], to[1]);
        }
    }
    function d3_geo_clipCircle(degrees) {
        var radians = degrees * d3_radians, cr = Math.cos(radians), interpolate = d3_geo_circleInterpolate(radians, 6 * d3_radians);
        return d3_geo_clip(visible, clipLine, interpolate);
        function visible(λ, φ) {
            return Math.cos(λ) * Math.cos(φ) > cr;
        }
        function clipLine(listener) {
            var point0, v0, v00, clean;
            return {
                lineStart: function() {
                    v00 = v0 = false;
                    clean = 1;
                },
                point: function(λ, φ) {
                    var point1 = [ λ, φ ], point2, v = visible(λ, φ);
                    if (!point0 && (v00 = v0 = v)) listener.lineStart();
                    if (v !== v0) {
                        point2 = intersect(point0, point1);
                        if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
                            point1[0] += ε;
                            point1[1] += ε;
                            v = visible(point1[0], point1[1]);
                        }
                    }
                    if (v !== v0) {
                        clean = 0;
                        if (v0 = v) {
                            listener.lineStart();
                            point2 = intersect(point1, point0);
                            listener.point(point2[0], point2[1]);
                        } else {
                            point2 = intersect(point0, point1);
                            listener.point(point2[0], point2[1]);
                            listener.lineEnd();
                        }
                        point0 = point2;
                    }
                    if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) listener.point(point1[0], point1[1]);
                    point0 = point1;
                },
                lineEnd: function() {
                    if (v0) listener.lineEnd();
                    point0 = null;
                },
                clean: function() {
                    return clean | (v00 && v0) << 1;
                }
            };
        }
        function intersect(a, b) {
            var pa = d3_geo_cartesian(a, 0), pb = d3_geo_cartesian(b, 0);
            var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
            if (!determinant) return a;
            var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
            d3_geo_cartesianAdd(A, B);
            var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t = Math.sqrt(w * w - uu * (d3_geo_cartesianDot(A, A) - 1)), q = d3_geo_cartesianScale(u, (-w - t) / uu);
            d3_geo_cartesianAdd(q, A);
            return d3_geo_spherical(q);
        }
    }
    function d3_geo_compose(a, b) {
        function compose(x, y) {
            return x = a(x, y), b(x[0], x[1]);
        }
        if (a.invert && b.invert) compose.invert = function(x, y) {
            return x = b.invert(x, y), x && a.invert(x[0], x[1]);
        };
        return compose;
    }
    function d3_geo_equirectangular(λ, φ) {
        return [ λ, φ ];
    }
    (d3.geo.equirectangular = function() {
        return d3_geo_projection(d3_geo_equirectangular).scale(250 / π);
    }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
    var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
        return 1 / cosλcosφ;
    }, Math.atan);
    (d3.geo.gnomonic = function() {
        return d3_geo_projection(d3_geo_gnomonic);
    }).raw = d3_geo_gnomonic;
    d3.geo.graticule = function() {
        var x1, x0, y1, y0, dx = 22.5, dy = dx, x, y, precision = 2.5;
        function graticule() {
            return {
                type: "MultiLineString",
                coordinates: lines()
            };
        }
        function lines() {
            return d3.range(Math.ceil(x0 / dx) * dx, x1, dx).map(x).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).map(y));
        }
        graticule.lines = function() {
            return lines().map(function(coordinates) {
                return {
                    type: "LineString",
                    coordinates: coordinates
                };
            });
        };
        graticule.outline = function() {
            return {
                type: "Polygon",
                coordinates: [ x(x0).concat(y(y1).slice(1), x(x1).reverse().slice(1), y(y0).reverse().slice(1)) ]
            };
        };
        graticule.extent = function(_) {
            if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
            x0 = +_[0][0], x1 = +_[1][0];
            y0 = +_[0][1], y1 = +_[1][1];
            if (x0 > x1) _ = x0, x0 = x1, x1 = _;
            if (y0 > y1) _ = y0, y0 = y1, y1 = _;
            return graticule.precision(precision);
        };
        graticule.step = function(_) {
            if (!arguments.length) return [ dx, dy ];
            dx = +_[0], dy = +_[1];
            return graticule;
        };
        graticule.precision = function(_) {
            if (!arguments.length) return precision;
            precision = +_;
            x = d3_geo_graticuleX(y0, y1, precision);
            y = d3_geo_graticuleY(x0, x1, precision);
            return graticule;
        };
        return graticule.extent([ [ -180 + ε, -90 + ε ], [ 180 - ε, 90 - ε ] ]);
    };
    function d3_geo_graticuleX(y0, y1, dy) {
        var y = d3.range(y0, y1 - ε, dy).concat(y1);
        return function(x) {
            return y.map(function(y) {
                return [ x, y ];
            });
        };
    }
    function d3_geo_graticuleY(x0, x1, dx) {
        var x = d3.range(x0, x1 - ε, dx).concat(x1);
        return function(y) {
            return x.map(function(x) {
                return [ x, y ];
            });
        };
    }
    d3.geo.interpolate = function(source, target) {
        return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
    };
    function d3_geo_interpolate(x0, y0, x1, y1) {
        var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))), k = 1 / Math.sin(d);
        function interpolate(t) {
            var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
            return [ Math.atan2(y, x) / d3_radians, Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians ];
        }
        interpolate.distance = d;
        return interpolate;
    }
    d3.geo.greatArc = function() {
        var source = d3_source, source_, target = d3_target, target_, precision = 6 * d3_radians, interpolate;
        function greatArc() {
            var p0 = source_ || source.apply(this, arguments), p1 = target_ || target.apply(this, arguments), i = interpolate || d3.geo.interpolate(p0, p1), t = 0, dt = precision / i.distance, coordinates = [ p0 ];
            while ((t += dt) < 1) coordinates.push(i(t));
            coordinates.push(p1);
            return {
                type: "LineString",
                coordinates: coordinates
            };
        }
        greatArc.distance = function() {
            return (interpolate || d3.geo.interpolate(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))).distance;
        };
        greatArc.source = function(_) {
            if (!arguments.length) return source;
            source = _, source_ = typeof _ === "function" ? null : _;
            interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
            return greatArc;
        };
        greatArc.target = function(_) {
            if (!arguments.length) return target;
            target = _, target_ = typeof _ === "function" ? null : _;
            interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
            return greatArc;
        };
        greatArc.precision = function(_) {
            if (!arguments.length) return precision / d3_radians;
            precision = _ * d3_radians;
            return greatArc;
        };
        return greatArc;
    };
    function d3_geo_mercator(λ, φ) {
        return [ λ / (2 * π), Math.max(-.5, Math.min(+.5, Math.log(Math.tan(π / 4 + φ / 2)) / (2 * π))) ];
    }
    d3_geo_mercator.invert = function(x, y) {
        return [ 2 * π * x, 2 * Math.atan(Math.exp(2 * π * y)) - π / 2 ];
    };
    (d3.geo.mercator = function() {
        return d3_geo_projection(d3_geo_mercator).scale(500);
    }).raw = d3_geo_mercator;
    var d3_geo_orthographic = d3_geo_azimuthal(function() {
        return 1;
    }, Math.asin);
    (d3.geo.orthographic = function() {
        return d3_geo_projection(d3_geo_orthographic);
    }).raw = d3_geo_orthographic;
    d3.geo.path = function() {
        var pointRadius = 4.5, projection, context, projectStream, contextStream;
        function path(object) {
            if (object) d3.geo.stream(object, projectStream(contextStream.pointRadius(typeof pointRadius === "function" ? +pointRadius.apply(this, arguments) : pointRadius)));
            return contextStream.result();
        }
        path.area = function(object) {
            d3_geo_pathAreaSum = 0;
            d3.geo.stream(object, projectStream(d3_geo_pathArea));
            return d3_geo_pathAreaSum;
        };
        path.centroid = function(object) {
            d3_geo_centroidDimension = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
            d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
            return d3_geo_centroidZ ? [ d3_geo_centroidX / d3_geo_centroidZ, d3_geo_centroidY / d3_geo_centroidZ ] : undefined;
        };
        path.bounds = function(object) {
            return d3_geo_bounds(projectStream)(object);
        };
        path.projection = function(_) {
            if (!arguments.length) return projection;
            projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
            return path;
        };
        path.context = function(_) {
            if (!arguments.length) return context;
            contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
            return path;
        };
        path.pointRadius = function(_) {
            if (!arguments.length) return pointRadius;
            pointRadius = typeof _ === "function" ? _ : +_;
            return path;
        };
        return path.projection(d3.geo.albersUsa()).context(null);
    };
    function d3_geo_pathCircle(radius) {
        return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + +2 * radius + "z";
    }
    function d3_geo_pathProjectStream(project) {
        var resample = d3_geo_resample(function(λ, φ) {
            return project([ λ * d3_degrees, φ * d3_degrees ]);
        });
        return function(stream) {
            stream = resample(stream);
            return {
                point: function(λ, φ) {
                    stream.point(λ * d3_radians, φ * d3_radians);
                },
                sphere: function() {
                    stream.sphere();
                },
                lineStart: function() {
                    stream.lineStart();
                },
                lineEnd: function() {
                    stream.lineEnd();
                },
                polygonStart: function() {
                    stream.polygonStart();
                },
                polygonEnd: function() {
                    stream.polygonEnd();
                }
            };
        };
    }
    function d3_geo_pathBuffer() {
        var pointCircle = d3_geo_pathCircle(4.5), buffer = [];
        var stream = {
            point: point,
            lineStart: function() {
                stream.point = pointLineStart;
            },
            lineEnd: lineEnd,
            polygonStart: function() {
                stream.lineEnd = lineEndPolygon;
            },
            polygonEnd: function() {
                stream.lineEnd = lineEnd;
                stream.point = point;
            },
            pointRadius: function(_) {
                pointCircle = d3_geo_pathCircle(_);
                return stream;
            },
            result: function() {
                if (buffer.length) {
                    var result = buffer.join("");
                    buffer = [];
                    return result;
                }
            }
        };
        function point(x, y) {
            buffer.push("M", x, ",", y, pointCircle);
        }
        function pointLineStart(x, y) {
            buffer.push("M", x, ",", y);
            stream.point = pointLine;
        }
        function pointLine(x, y) {
            buffer.push("L", x, ",", y);
        }
        function lineEnd() {
            stream.point = point;
        }
        function lineEndPolygon() {
            buffer.push("Z");
        }
        return stream;
    }
    function d3_geo_pathContext(context) {
        var pointRadius = 4.5;
        var stream = {
            point: point,
            lineStart: function() {
                stream.point = pointLineStart;
            },
            lineEnd: lineEnd,
            polygonStart: function() {
                stream.lineEnd = lineEndPolygon;
            },
            polygonEnd: function() {
                stream.lineEnd = lineEnd;
                stream.point = point;
            },
            pointRadius: function(_) {
                pointRadius = _;
                return stream;
            },
            result: d3_noop
        };
        function point(x, y) {
            context.moveTo(x, y);
            context.arc(x, y, pointRadius, 0, 2 * π);
        }
        function pointLineStart(x, y) {
            context.moveTo(x, y);
            stream.point = pointLine;
        }
        function pointLine(x, y) {
            context.lineTo(x, y);
        }
        function lineEnd() {
            stream.point = point;
        }
        function lineEndPolygon() {
            context.closePath();
        }
        return stream;
    }
    var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
        point: d3_noop,
        lineStart: d3_noop,
        lineEnd: d3_noop,
        polygonStart: function() {
            d3_geo_pathAreaPolygon = 0;
            d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
        },
        polygonEnd: function() {
            d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
            d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
        }
    };
    function d3_geo_pathAreaRingStart() {
        var x00, y00, x0, y0;
        d3_geo_pathArea.point = function(x, y) {
            d3_geo_pathArea.point = nextPoint;
            x00 = x0 = x, y00 = y0 = y;
        };
        function nextPoint(x, y) {
            d3_geo_pathAreaPolygon += y0 * x - x0 * y;
            x0 = x, y0 = y;
        }
        d3_geo_pathArea.lineEnd = function() {
            nextPoint(x00, y00);
        };
    }
    var d3_geo_pathCentroid = {
        point: d3_geo_pathCentroidPoint,
        lineStart: d3_geo_pathCentroidLineStart,
        lineEnd: d3_geo_pathCentroidLineEnd,
        polygonStart: function() {
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
        },
        polygonEnd: function() {
            d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
            d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
            d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
        }
    };
    function d3_geo_pathCentroidPoint(x, y) {
        if (d3_geo_centroidDimension) return;
        d3_geo_centroidX += x;
        d3_geo_centroidY += y;
        ++d3_geo_centroidZ;
    }
    function d3_geo_pathCentroidLineStart() {
        var x0, y0;
        if (d3_geo_centroidDimension !== 1) {
            if (d3_geo_centroidDimension < 1) {
                d3_geo_centroidDimension = 1;
                d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
            } else return;
        }
        d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint;
            x0 = x, y0 = y;
        };
        function nextPoint(x, y) {
            var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
            d3_geo_centroidX += z * (x0 + x) / 2;
            d3_geo_centroidY += z * (y0 + y) / 2;
            d3_geo_centroidZ += z;
            x0 = x, y0 = y;
        }
    }
    function d3_geo_pathCentroidLineEnd() {
        d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
    }
    function d3_geo_pathCentroidRingStart() {
        var x00, y00, x0, y0;
        if (d3_geo_centroidDimension < 2) {
            d3_geo_centroidDimension = 2;
            d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
        }
        d3_geo_pathCentroid.point = function(x, y) {
            d3_geo_pathCentroid.point = nextPoint;
            x00 = x0 = x, y00 = y0 = y;
        };
        function nextPoint(x, y) {
            var z = y0 * x - x0 * y;
            d3_geo_centroidX += z * (x0 + x);
            d3_geo_centroidY += z * (y0 + y);
            d3_geo_centroidZ += z * 3;
            x0 = x, y0 = y;
        }
        d3_geo_pathCentroid.lineEnd = function() {
            nextPoint(x00, y00);
        };
    }
    d3.geo.area = function(object) {
        d3_geo_areaSum = 0;
        d3.geo.stream(object, d3_geo_area);
        return d3_geo_areaSum;
    };
    var d3_geo_areaSum, d3_geo_areaRingU, d3_geo_areaRingV;
    var d3_geo_area = {
        sphere: function() {
            d3_geo_areaSum += 4 * π;
        },
        point: d3_noop,
        lineStart: d3_noop,
        lineEnd: d3_noop,
        polygonStart: function() {
            d3_geo_areaRingU = 1, d3_geo_areaRingV = 0;
            d3_geo_area.lineStart = d3_geo_areaRingStart;
        },
        polygonEnd: function() {
            var area = 2 * Math.atan2(d3_geo_areaRingV, d3_geo_areaRingU);
            d3_geo_areaSum += area < 0 ? 4 * π + area : area;
            d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
        }
    };
    function d3_geo_areaRingStart() {
        var λ00, φ00, λ0, cosφ0, sinφ0;
        d3_geo_area.point = function(λ, φ) {
            d3_geo_area.point = nextPoint;
            λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
            sinφ0 = Math.sin(φ);
        };
        function nextPoint(λ, φ) {
            λ *= d3_radians;
            φ = φ * d3_radians / 2 + π / 4;
            var dλ = λ - λ0, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u0 = d3_geo_areaRingU, v0 = d3_geo_areaRingV, u = cosφ0 * cosφ + k * Math.cos(dλ), v = k * Math.sin(dλ);
            d3_geo_areaRingU = u0 * u - v0 * v;
            d3_geo_areaRingV = v0 * u + u0 * v;
            λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
        }
        d3_geo_area.lineEnd = function() {
            nextPoint(λ00, φ00);
        };
    }
    d3.geo.projection = d3_geo_projection;
    d3.geo.projectionMutator = d3_geo_projectionMutator;
    function d3_geo_projection(project) {
        return d3_geo_projectionMutator(function() {
            return project;
        })();
    }
    function d3_geo_projectionMutator(projectAt) {
        var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
            x = project(x, y);
            return [ x[0] * k + δx, δy - x[1] * k ];
        }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, clip = d3_geo_clipAntimeridian, clipAngle = null;
        function projection(point) {
            point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
            return [ point[0] * k + δx, δy - point[1] * k ];
        }
        function invert(point) {
            point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
            return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
        }
        projection.stream = function(stream) {
            return d3_geo_projectionRadiansRotate(rotate, clip(projectResample(stream)));
        };
        projection.clipAngle = function(_) {
            if (!arguments.length) return clipAngle;
            clip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle(clipAngle = +_);
            return projection;
        };
        projection.scale = function(_) {
            if (!arguments.length) return k;
            k = +_;
            return reset();
        };
        projection.translate = function(_) {
            if (!arguments.length) return [ x, y ];
            x = +_[0];
            y = +_[1];
            return reset();
        };
        projection.center = function(_) {
            if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
            λ = _[0] % 360 * d3_radians;
            φ = _[1] % 360 * d3_radians;
            return reset();
        };
        projection.rotate = function(_) {
            if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
            δλ = _[0] % 360 * d3_radians;
            δφ = _[1] % 360 * d3_radians;
            δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
            return reset();
        };
        d3.rebind(projection, projectResample, "precision");
        function reset() {
            projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
            var center = project(λ, φ);
            δx = x - center[0] * k;
            δy = y + center[1] * k;
            return projection;
        }
        return function() {
            project = projectAt.apply(this, arguments);
            projection.invert = project.invert && invert;
            return reset();
        };
    }
    function d3_geo_projectionRadiansRotate(rotate, stream) {
        return {
            point: function(x, y) {
                y = rotate(x * d3_radians, y * d3_radians), x = y[0];
                stream.point(x > π ? x - 2 * π : x < -π ? x + 2 * π : x, y[1]);
            },
            sphere: function() {
                stream.sphere();
            },
            lineStart: function() {
                stream.lineStart();
            },
            lineEnd: function() {
                stream.lineEnd();
            },
            polygonStart: function() {
                stream.polygonStart();
            },
            polygonEnd: function() {
                stream.polygonEnd();
            }
        };
    }
    function d3_geo_rotation(δλ, δφ, δγ) {
        return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_equirectangular;
    }
    function d3_geo_forwardRotationλ(δλ) {
        return function(λ, φ) {
            return λ += δλ, [ λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ ];
        };
    }
    function d3_geo_rotationλ(δλ) {
        var rotation = d3_geo_forwardRotationλ(δλ);
        rotation.invert = d3_geo_forwardRotationλ(-δλ);
        return rotation;
    }
    function d3_geo_rotationφγ(δφ, δγ) {
        var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
        function rotation(λ, φ) {
            var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
            return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδγ + y * sinδγ))) ];
        }
        rotation.invert = function(λ, φ) {
            var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
            return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδφ - x * sinδφ))) ];
        };
        return rotation;
    }
    var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
        return 1 / (1 + cosλcosφ);
    }, function(ρ) {
        return 2 * Math.atan(ρ);
    });
    (d3.geo.stereographic = function() {
        return d3_geo_projection(d3_geo_stereographic);
    }).raw = d3_geo_stereographic;
    function d3_geo_azimuthal(scale, angle) {
        function azimuthal(λ, φ) {
            var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
            return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
        }
        azimuthal.invert = function(x, y) {
            var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
            return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
        };
        return azimuthal;
    }
    d3.geom = {};
    d3.geom.hull = function(vertices) {
        if (vertices.length < 3) return [];
        var len = vertices.length, plen = len - 1, points = [], stack = [], i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
        for (i = 1; i < len; ++i) {
            if (vertices[i][1] < vertices[h][1]) {
                h = i;
            } else if (vertices[i][1] == vertices[h][1]) {
                h = vertices[i][0] < vertices[h][0] ? i : h;
            }
        }
        for (i = 0; i < len; ++i) {
            if (i === h) continue;
            y1 = vertices[i][1] - vertices[h][1];
            x1 = vertices[i][0] - vertices[h][0];
            points.push({
                angle: Math.atan2(y1, x1),
                index: i
            });
        }
        points.sort(function(a, b) {
            return a.angle - b.angle;
        });
        a = points[0].angle;
        v = points[0].index;
        u = 0;
        for (i = 1; i < plen; ++i) {
            j = points[i].index;
            if (a == points[i].angle) {
                x1 = vertices[v][0] - vertices[h][0];
                y1 = vertices[v][1] - vertices[h][1];
                x2 = vertices[j][0] - vertices[h][0];
                y2 = vertices[j][1] - vertices[h][1];
                if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
                    points[i].index = -1;
                } else {
                    points[u].index = -1;
                    a = points[i].angle;
                    u = i;
                    v = j;
                }
            } else {
                a = points[i].angle;
                u = i;
                v = j;
            }
        }
        stack.push(h);
        for (i = 0, j = 0; i < 2; ++j) {
            if (points[j].index !== -1) {
                stack.push(points[j].index);
                i++;
            }
        }
        sp = stack.length;
        for (;j < plen; ++j) {
            if (points[j].index === -1) continue;
            while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
                --sp;
            }
            stack[sp++] = points[j].index;
        }
        var poly = [];
        for (i = 0; i < sp; ++i) {
            poly.push(vertices[stack[i]]);
        }
        return poly;
    };
    function d3_geom_hullCCW(i1, i2, i3, v) {
        var t, a, b, c, d, e, f;
        t = v[i1];
        a = t[0];
        b = t[1];
        t = v[i2];
        c = t[0];
        d = t[1];
        t = v[i3];
        e = t[0];
        f = t[1];
        return (f - b) * (c - a) - (d - b) * (e - a) > 0;
    }
    d3.geom.polygon = function(coordinates) {
        coordinates.area = function() {
            var i = 0, n = coordinates.length, area = coordinates[n - 1][1] * coordinates[0][0] - coordinates[n - 1][0] * coordinates[0][1];
            while (++i < n) {
                area += coordinates[i - 1][1] * coordinates[i][0] - coordinates[i - 1][0] * coordinates[i][1];
            }
            return area * .5;
        };
        coordinates.centroid = function(k) {
            var i = -1, n = coordinates.length, x = 0, y = 0, a, b = coordinates[n - 1], c;
            if (!arguments.length) k = -1 / (6 * coordinates.area());
            while (++i < n) {
                a = b;
                b = coordinates[i];
                c = a[0] * b[1] - b[0] * a[1];
                x += (a[0] + b[0]) * c;
                y += (a[1] + b[1]) * c;
            }
            return [ x * k, y * k ];
        };
        coordinates.clip = function(subject) {
            var input, i = -1, n = coordinates.length, j, m, a = coordinates[n - 1], b, c, d;
            while (++i < n) {
                input = subject.slice();
                subject.length = 0;
                b = coordinates[i];
                c = input[(m = input.length) - 1];
                j = -1;
                while (++j < m) {
                    d = input[j];
                    if (d3_geom_polygonInside(d, a, b)) {
                        if (!d3_geom_polygonInside(c, a, b)) {
                            subject.push(d3_geom_polygonIntersect(c, d, a, b));
                        }
                        subject.push(d);
                    } else if (d3_geom_polygonInside(c, a, b)) {
                        subject.push(d3_geom_polygonIntersect(c, d, a, b));
                    }
                    c = d;
                }
                a = b;
            }
            return subject;
        };
        return coordinates;
    };
    function d3_geom_polygonInside(p, a, b) {
        return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
    }
    function d3_geom_polygonIntersect(c, d, a, b) {
        var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
        return [ x1 + ua * x21, y1 + ua * y21 ];
    }
    d3.geom.voronoi = function(vertices) {
        var polygons = vertices.map(function() {
            return [];
        }), Z = 1e6;
        d3_voronoi_tessellate(vertices, function(e) {
            var s1, s2, x1, x2, y1, y2;
            if (e.a === 1 && e.b >= 0) {
                s1 = e.ep.r;
                s2 = e.ep.l;
            } else {
                s1 = e.ep.l;
                s2 = e.ep.r;
            }
            if (e.a === 1) {
                y1 = s1 ? s1.y : -Z;
                x1 = e.c - e.b * y1;
                y2 = s2 ? s2.y : Z;
                x2 = e.c - e.b * y2;
            } else {
                x1 = s1 ? s1.x : -Z;
                y1 = e.c - e.a * x1;
                x2 = s2 ? s2.x : Z;
                y2 = e.c - e.a * x2;
            }
            var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
            polygons[e.region.l.index].push(v1, v2);
            polygons[e.region.r.index].push(v1, v2);
        });
        polygons = polygons.map(function(polygon, i) {
            var cx = vertices[i][0], cy = vertices[i][1], angle = polygon.map(function(v) {
                return Math.atan2(v[0] - cx, v[1] - cy);
            }), order = d3.range(polygon.length).sort(function(a, b) {
                return angle[a] - angle[b];
            });
            return order.filter(function(d, i) {
                return !i || angle[d] - angle[order[i - 1]] > ε;
            }).map(function(d) {
                return polygon[d];
            });
        });
        polygons.forEach(function(polygon, i) {
            var n = polygon.length;
            if (!n) return polygon.push([ -Z, -Z ], [ -Z, Z ], [ Z, Z ], [ Z, -Z ]);
            if (n > 2) return;
            var p0 = vertices[i], p1 = polygon[0], p2 = polygon[1], x0 = p0[0], y0 = p0[1], x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], dx = Math.abs(x2 - x1), dy = y2 - y1;
            if (Math.abs(dy) < ε) {
                var y = y0 < y1 ? -Z : Z;
                polygon.push([ -Z, y ], [ Z, y ]);
            } else if (dx < ε) {
                var x = x0 < x1 ? -Z : Z;
                polygon.push([ x, -Z ], [ x, Z ]);
            } else {
                var y = (x2 - x1) * (y1 - y0) < (x1 - x0) * (y2 - y1) ? Z : -Z, z = Math.abs(dy) - dx;
                if (Math.abs(z) < ε) {
                    polygon.push([ dy < 0 ? y : -y, y ]);
                } else {
                    if (z > 0) y *= -1;
                    polygon.push([ -Z, y ], [ Z, y ]);
                }
            }
        });
        return polygons;
    };
    var d3_voronoi_opposite = {
        l: "r",
        r: "l"
    };
    function d3_voronoi_tessellate(vertices, callback) {
        var Sites = {
            list: vertices.map(function(v, i) {
                return {
                    index: i,
                    x: v[0],
                    y: v[1]
                };
            }).sort(function(a, b) {
                return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
            }),
            bottomSite: null
        };
        var EdgeList = {
            list: [],
            leftEnd: null,
            rightEnd: null,
            init: function() {
                EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
                EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
                EdgeList.leftEnd.r = EdgeList.rightEnd;
                EdgeList.rightEnd.l = EdgeList.leftEnd;
                EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
            },
            createHalfEdge: function(edge, side) {
                return {
                    edge: edge,
                    side: side,
                    vertex: null,
                    l: null,
                    r: null
                };
            },
            insert: function(lb, he) {
                he.l = lb;
                he.r = lb.r;
                lb.r.l = he;
                lb.r = he;
            },
            leftBound: function(p) {
                var he = EdgeList.leftEnd;
                do {
                    he = he.r;
                } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
                he = he.l;
                return he;
            },
            del: function(he) {
                he.l.r = he.r;
                he.r.l = he.l;
                he.edge = null;
            },
            right: function(he) {
                return he.r;
            },
            left: function(he) {
                return he.l;
            },
            leftRegion: function(he) {
                return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
            },
            rightRegion: function(he) {
                return he.edge == null ? Sites.bottomSite : he.edge.region[d3_voronoi_opposite[he.side]];
            }
        };
        var Geom = {
            bisect: function(s1, s2) {
                var newEdge = {
                    region: {
                        l: s1,
                        r: s2
                    },
                    ep: {
                        l: null,
                        r: null
                    }
                };
                var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
                newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
                if (adx > ady) {
                    newEdge.a = 1;
                    newEdge.b = dy / dx;
                    newEdge.c /= dx;
                } else {
                    newEdge.b = 1;
                    newEdge.a = dx / dy;
                    newEdge.c /= dy;
                }
                return newEdge;
            },
            intersect: function(el1, el2) {
                var e1 = el1.edge, e2 = el2.edge;
                if (!e1 || !e2 || e1.region.r == e2.region.r) {
                    return null;
                }
                var d = e1.a * e2.b - e1.b * e2.a;
                if (Math.abs(d) < 1e-10) {
                    return null;
                }
                var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
                if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
                    el = el1;
                    e = e1;
                } else {
                    el = el2;
                    e = e2;
                }
                var rightOfSite = xint >= e.region.r.x;
                if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
                    return null;
                }
                return {
                    x: xint,
                    y: yint
                };
            },
            rightOf: function(he, p) {
                var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
                if (rightOfSite && he.side === "l") {
                    return 1;
                }
                if (!rightOfSite && he.side === "r") {
                    return 0;
                }
                if (e.a === 1) {
                    var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
                    if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
                        above = fast = dyp >= e.b * dxp;
                    } else {
                        above = p.x + p.y * e.b > e.c;
                        if (e.b < 0) {
                            above = !above;
                        }
                        if (!above) {
                            fast = 1;
                        }
                    }
                    if (!fast) {
                        var dxs = topsite.x - e.region.l.x;
                        above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
                        if (e.b < 0) {
                            above = !above;
                        }
                    }
                } else {
                    var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
                    above = t1 * t1 > t2 * t2 + t3 * t3;
                }
                return he.side === "l" ? above : !above;
            },
            endPoint: function(edge, side, site) {
                edge.ep[side] = site;
                if (!edge.ep[d3_voronoi_opposite[side]]) return;
                callback(edge);
            },
            distance: function(s, t) {
                var dx = s.x - t.x, dy = s.y - t.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
        };
        var EventQueue = {
            list: [],
            insert: function(he, site, offset) {
                he.vertex = site;
                he.ystar = site.y + offset;
                for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
                    var next = list[i];
                    if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
                        continue;
                    } else {
                        break;
                    }
                }
                list.splice(i, 0, he);
            },
            del: function(he) {
                for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {}
                ls.splice(i, 1);
            },
            empty: function() {
                return EventQueue.list.length === 0;
            },
            nextEvent: function(he) {
                for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
                    if (ls[i] == he) return ls[i + 1];
                }
                return null;
            },
            min: function() {
                var elem = EventQueue.list[0];
                return {
                    x: elem.vertex.x,
                    y: elem.ystar
                };
            },
            extractMin: function() {
                return EventQueue.list.shift();
            }
        };
        EdgeList.init();
        Sites.bottomSite = Sites.list.shift();
        var newSite = Sites.list.shift(), newIntStar;
        var lbnd, rbnd, llbnd, rrbnd, bisector;
        var bot, top, temp, p, v;
        var e, pm;
        while (true) {
            if (!EventQueue.empty()) {
                newIntStar = EventQueue.min();
            }
            if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
                lbnd = EdgeList.leftBound(newSite);
                rbnd = EdgeList.right(lbnd);
                bot = EdgeList.rightRegion(lbnd);
                e = Geom.bisect(bot, newSite);
                bisector = EdgeList.createHalfEdge(e, "l");
                EdgeList.insert(lbnd, bisector);
                p = Geom.intersect(lbnd, bisector);
                if (p) {
                    EventQueue.del(lbnd);
                    EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
                }
                lbnd = bisector;
                bisector = EdgeList.createHalfEdge(e, "r");
                EdgeList.insert(lbnd, bisector);
                p = Geom.intersect(bisector, rbnd);
                if (p) {
                    EventQueue.insert(bisector, p, Geom.distance(p, newSite));
                }
                newSite = Sites.list.shift();
            } else if (!EventQueue.empty()) {
                lbnd = EventQueue.extractMin();
                llbnd = EdgeList.left(lbnd);
                rbnd = EdgeList.right(lbnd);
                rrbnd = EdgeList.right(rbnd);
                bot = EdgeList.leftRegion(lbnd);
                top = EdgeList.rightRegion(rbnd);
                v = lbnd.vertex;
                Geom.endPoint(lbnd.edge, lbnd.side, v);
                Geom.endPoint(rbnd.edge, rbnd.side, v);
                EdgeList.del(lbnd);
                EventQueue.del(rbnd);
                EdgeList.del(rbnd);
                pm = "l";
                if (bot.y > top.y) {
                    temp = bot;
                    bot = top;
                    top = temp;
                    pm = "r";
                }
                e = Geom.bisect(bot, top);
                bisector = EdgeList.createHalfEdge(e, pm);
                EdgeList.insert(llbnd, bisector);
                Geom.endPoint(e, d3_voronoi_opposite[pm], v);
                p = Geom.intersect(llbnd, bisector);
                if (p) {
                    EventQueue.del(llbnd);
                    EventQueue.insert(llbnd, p, Geom.distance(p, bot));
                }
                p = Geom.intersect(bisector, rrbnd);
                if (p) {
                    EventQueue.insert(bisector, p, Geom.distance(p, bot));
                }
            } else {
                break;
            }
        }
        for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
            callback(lbnd.edge);
        }
    }
    d3.geom.delaunay = function(vertices) {
        var edges = vertices.map(function() {
            return [];
        }), triangles = [];
        d3_voronoi_tessellate(vertices, function(e) {
            edges[e.region.l.index].push(vertices[e.region.r.index]);
        });
        edges.forEach(function(edge, i) {
            var v = vertices[i], cx = v[0], cy = v[1];
            edge.forEach(function(v) {
                v.angle = Math.atan2(v[0] - cx, v[1] - cy);
            });
            edge.sort(function(a, b) {
                return a.angle - b.angle;
            });
            for (var j = 0, m = edge.length - 1; j < m; j++) {
                triangles.push([ v, edge[j], edge[j + 1] ]);
            }
        });
        return triangles;
    };
    d3.geom.quadtree = function(points, x1, y1, x2, y2) {
        var p, i = -1, n = points.length;
        if (arguments.length < 5) {
            if (arguments.length === 3) {
                y2 = y1;
                x2 = x1;
                y1 = x1 = 0;
            } else {
                x1 = y1 = Infinity;
                x2 = y2 = -Infinity;
                while (++i < n) {
                    p = points[i];
                    if (p.x < x1) x1 = p.x;
                    if (p.y < y1) y1 = p.y;
                    if (p.x > x2) x2 = p.x;
                    if (p.y > y2) y2 = p.y;
                }
            }
        }
        var dx = x2 - x1, dy = y2 - y1;
        if (dx > dy) y2 = y1 + dx; else x2 = x1 + dy;
        function insert(n, p, x1, y1, x2, y2) {
            if (isNaN(p.x) || isNaN(p.y)) return;
            if (n.leaf) {
                var v = n.point;
                if (v) {
                    if (Math.abs(v.x - p.x) + Math.abs(v.y - p.y) < .01) {
                        insertChild(n, p, x1, y1, x2, y2);
                    } else {
                        n.point = null;
                        insertChild(n, v, x1, y1, x2, y2);
                        insertChild(n, p, x1, y1, x2, y2);
                    }
                } else {
                    n.point = p;
                }
            } else {
                insertChild(n, p, x1, y1, x2, y2);
            }
        }
        function insertChild(n, p, x1, y1, x2, y2) {
            var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = p.x >= sx, bottom = p.y >= sy, i = (bottom << 1) + right;
            n.leaf = false;
            n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
            if (right) x1 = sx; else x2 = sx;
            if (bottom) y1 = sy; else y2 = sy;
            insert(n, p, x1, y1, x2, y2);
        }
        var root = d3_geom_quadtreeNode();
        root.add = function(p) {
            insert(root, p, x1, y1, x2, y2);
        };
        root.visit = function(f) {
            d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
        };
        points.forEach(root.add);
        return root;
    };
    function d3_geom_quadtreeNode() {
        return {
            leaf: true,
            nodes: [],
            point: null
        };
    }
    function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
        if (!f(node, x1, y1, x2, y2)) {
            var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
            if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
            if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
            if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
            if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
        }
    }
    d3.time = {};
    var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    function d3_time_utc() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
    }
    d3_time_utc.prototype = {
        getDate: function() {
            return this._.getUTCDate();
        },
        getDay: function() {
            return this._.getUTCDay();
        },
        getFullYear: function() {
            return this._.getUTCFullYear();
        },
        getHours: function() {
            return this._.getUTCHours();
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds();
        },
        getMinutes: function() {
            return this._.getUTCMinutes();
        },
        getMonth: function() {
            return this._.getUTCMonth();
        },
        getSeconds: function() {
            return this._.getUTCSeconds();
        },
        getTime: function() {
            return this._.getTime();
        },
        getTimezoneOffset: function() {
            return 0;
        },
        valueOf: function() {
            return this._.valueOf();
        },
        setDate: function() {
            d3_time_prototype.setUTCDate.apply(this._, arguments);
        },
        setDay: function() {
            d3_time_prototype.setUTCDay.apply(this._, arguments);
        },
        setFullYear: function() {
            d3_time_prototype.setUTCFullYear.apply(this._, arguments);
        },
        setHours: function() {
            d3_time_prototype.setUTCHours.apply(this._, arguments);
        },
        setMilliseconds: function() {
            d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
        },
        setMinutes: function() {
            d3_time_prototype.setUTCMinutes.apply(this._, arguments);
        },
        setMonth: function() {
            d3_time_prototype.setUTCMonth.apply(this._, arguments);
        },
        setSeconds: function() {
            d3_time_prototype.setUTCSeconds.apply(this._, arguments);
        },
        setTime: function() {
            d3_time_prototype.setTime.apply(this._, arguments);
        }
    };
    var d3_time_prototype = Date.prototype;
    var d3_time_formatDateTime = "%a %b %e %X %Y", d3_time_formatDate = "%m/%d/%Y", d3_time_formatTime = "%H:%M:%S";
    var d3_time_days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], d3_time_dayAbbreviations = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    d3.time.format = function(template) {
        var n = template.length;
        function format(date) {
            var string = [], i = -1, j = 0, c, p, f;
            while (++i < n) {
                if (template.charCodeAt(i) === 37) {
                    string.push(template.substring(j, i));
                    if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
                    if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
                    string.push(c);
                    j = i + 1;
                }
            }
            string.push(template.substring(j, i));
            return string.join("");
        }
        format.parse = function(string) {
            var d = {
                y: 1900,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0
            }, i = d3_time_parse(d, template, string, 0);
            if (i != string.length) return null;
            if ("p" in d) d.H = d.H % 12 + d.p * 12;
            var date = new d3_time();
            date.setFullYear(d.y, d.m, d.d);
            date.setHours(d.H, d.M, d.S, d.L);
            return date;
        };
        format.toString = function() {
            return template;
        };
        return format;
    };
    function d3_time_parse(date, template, string, j) {
        var c, p, i = 0, n = template.length, m = string.length;
        while (i < n) {
            if (j >= m) return -1;
            c = template.charCodeAt(i++);
            if (c === 37) {
                p = d3_time_parsers[template.charAt(i++)];
                if (!p || (j = p(date, string, j)) < 0) return -1;
            } else if (c != string.charCodeAt(j++)) {
                return -1;
            }
        }
        return j;
    }
    function d3_time_formatRe(names) {
        return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
    }
    function d3_time_formatLookup(names) {
        var map = new d3_Map(), i = -1, n = names.length;
        while (++i < n) map.set(names[i].toLowerCase(), i);
        return map;
    }
    function d3_time_formatPad(value, fill, width) {
        value += "";
        var length = value.length;
        return length < width ? new Array(width - length + 1).join(fill) + value : value;
    }
    var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations);
    var d3_time_formatPads = {
        "-": "",
        _: " ",
        "0": "0"
    };
    var d3_time_formats = {
        a: function(d) {
            return d3_time_dayAbbreviations[d.getDay()];
        },
        A: function(d) {
            return d3_time_days[d.getDay()];
        },
        b: function(d) {
            return d3_time_monthAbbreviations[d.getMonth()];
        },
        B: function(d) {
            return d3_time_months[d.getMonth()];
        },
        c: d3.time.format(d3_time_formatDateTime),
        d: function(d, p) {
            return d3_time_formatPad(d.getDate(), p, 2);
        },
        e: function(d, p) {
            return d3_time_formatPad(d.getDate(), p, 2);
        },
        H: function(d, p) {
            return d3_time_formatPad(d.getHours(), p, 2);
        },
        I: function(d, p) {
            return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
        },
        j: function(d, p) {
            return d3_time_formatPad(1 + d3.time.dayOfYear(d), p, 3);
        },
        L: function(d, p) {
            return d3_time_formatPad(d.getMilliseconds(), p, 3);
        },
        m: function(d, p) {
            return d3_time_formatPad(d.getMonth() + 1, p, 2);
        },
        M: function(d, p) {
            return d3_time_formatPad(d.getMinutes(), p, 2);
        },
        p: function(d) {
            return d.getHours() >= 12 ? "PM" : "AM";
        },
        S: function(d, p) {
            return d3_time_formatPad(d.getSeconds(), p, 2);
        },
        U: function(d, p) {
            return d3_time_formatPad(d3.time.sundayOfYear(d), p, 2);
        },
        w: function(d) {
            return d.getDay();
        },
        W: function(d, p) {
            return d3_time_formatPad(d3.time.mondayOfYear(d), p, 2);
        },
        x: d3.time.format(d3_time_formatDate),
        X: d3.time.format(d3_time_formatTime),
        y: function(d, p) {
            return d3_time_formatPad(d.getFullYear() % 100, p, 2);
        },
        Y: function(d, p) {
            return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
        },
        Z: d3_time_zone,
        "%": function() {
            return "%";
        }
    };
    var d3_time_parsers = {
        a: d3_time_parseWeekdayAbbrev,
        A: d3_time_parseWeekday,
        b: d3_time_parseMonthAbbrev,
        B: d3_time_parseMonth,
        c: d3_time_parseLocaleFull,
        d: d3_time_parseDay,
        e: d3_time_parseDay,
        H: d3_time_parseHour24,
        I: d3_time_parseHour24,
        L: d3_time_parseMilliseconds,
        m: d3_time_parseMonthNumber,
        M: d3_time_parseMinutes,
        p: d3_time_parseAmPm,
        S: d3_time_parseSeconds,
        x: d3_time_parseLocaleDate,
        X: d3_time_parseLocaleTime,
        y: d3_time_parseYear,
        Y: d3_time_parseFullYear
    };
    function d3_time_parseWeekdayAbbrev(date, string, i) {
        d3_time_dayAbbrevRe.lastIndex = 0;
        var n = d3_time_dayAbbrevRe.exec(string.substring(i));
        return n ? i += n[0].length : -1;
    }
    function d3_time_parseWeekday(date, string, i) {
        d3_time_dayRe.lastIndex = 0;
        var n = d3_time_dayRe.exec(string.substring(i));
        return n ? i += n[0].length : -1;
    }
    function d3_time_parseMonthAbbrev(date, string, i) {
        d3_time_monthAbbrevRe.lastIndex = 0;
        var n = d3_time_monthAbbrevRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
    }
    function d3_time_parseMonth(date, string, i) {
        d3_time_monthRe.lastIndex = 0;
        var n = d3_time_monthRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
    }
    function d3_time_parseLocaleFull(date, string, i) {
        return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
    }
    function d3_time_parseLocaleDate(date, string, i) {
        return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
    }
    function d3_time_parseLocaleTime(date, string, i) {
        return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }
    function d3_time_parseFullYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 4));
        return n ? (date.y = +n[0], i += n[0].length) : -1;
    }
    function d3_time_parseYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.y = d3_time_expandYear(+n[0]), i += n[0].length) : -1;
    }
    function d3_time_expandYear(d) {
        return d + (d > 68 ? 1900 : 2e3);
    }
    function d3_time_parseMonthNumber(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
    }
    function d3_time_parseDay(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.d = +n[0], i += n[0].length) : -1;
    }
    function d3_time_parseHour24(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.H = +n[0], i += n[0].length) : -1;
    }
    function d3_time_parseMinutes(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.M = +n[0], i += n[0].length) : -1;
    }
    function d3_time_parseSeconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.S = +n[0], i += n[0].length) : -1;
    }
    function d3_time_parseMilliseconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 3));
        return n ? (date.L = +n[0], i += n[0].length) : -1;
    }
    var d3_time_numberRe = /^\s*\d+/;
    function d3_time_parseAmPm(date, string, i) {
        var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
        return n == null ? -1 : (date.p = n, i);
    }
    var d3_time_amPmLookup = d3.map({
        am: 0,
        pm: 1
    });
    function d3_time_zone(d) {
        var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
        return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
    }
    d3.time.format.utc = function(template) {
        var local = d3.time.format(template);
        function format(date) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time();
                utc._ = date;
                return local(utc);
            } finally {
                d3_time = Date;
            }
        }
        format.parse = function(string) {
            try {
                d3_time = d3_time_utc;
                var date = local.parse(string);
                return date && date._;
            } finally {
                d3_time = Date;
            }
        };
        format.toString = local.toString;
        return format;
    };
    var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;
    function d3_time_formatIsoNative(date) {
        return date.toISOString();
    }
    d3_time_formatIsoNative.parse = function(string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
    };
    d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
    function d3_time_interval(local, step, number) {
        function round(date) {
            var d0 = local(date), d1 = offset(d0, 1);
            return date - d0 < d1 - date ? d0 : d1;
        }
        function ceil(date) {
            step(date = local(new d3_time(date - 1)), 1);
            return date;
        }
        function offset(date, k) {
            step(date = new d3_time(+date), k);
            return date;
        }
        function range(t0, t1, dt) {
            var time = ceil(t0), times = [];
            if (dt > 1) {
                while (time < t1) {
                    if (!(number(time) % dt)) times.push(new Date(+time));
                    step(time, 1);
                }
            } else {
                while (time < t1) times.push(new Date(+time)), step(time, 1);
            }
            return times;
        }
        function range_utc(t0, t1, dt) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time_utc();
                utc._ = t0;
                return range(utc, t1, dt);
            } finally {
                d3_time = Date;
            }
        }
        local.floor = local;
        local.round = round;
        local.ceil = ceil;
        local.offset = offset;
        local.range = range;
        var utc = local.utc = d3_time_interval_utc(local);
        utc.floor = utc;
        utc.round = d3_time_interval_utc(round);
        utc.ceil = d3_time_interval_utc(ceil);
        utc.offset = d3_time_interval_utc(offset);
        utc.range = range_utc;
        return local;
    }
    function d3_time_interval_utc(method) {
        return function(date, k) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time_utc();
                utc._ = date;
                return method(utc, k)._;
            } finally {
                d3_time = Date;
            }
        };
    }
    d3.time.second = d3_time_interval(function(date) {
        return new d3_time(Math.floor(date / 1e3) * 1e3);
    }, function(date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 1e3);
    }, function(date) {
        return date.getSeconds();
    });
    d3.time.seconds = d3.time.second.range;
    d3.time.seconds.utc = d3.time.second.utc.range;
    d3.time.minute = d3_time_interval(function(date) {
        return new d3_time(Math.floor(date / 6e4) * 6e4);
    }, function(date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 6e4);
    }, function(date) {
        return date.getMinutes();
    });
    d3.time.minutes = d3.time.minute.range;
    d3.time.minutes.utc = d3.time.minute.utc.range;
    d3.time.hour = d3_time_interval(function(date) {
        var timezone = date.getTimezoneOffset() / 60;
        return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
    }, function(date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 36e5);
    }, function(date) {
        return date.getHours();
    });
    d3.time.hours = d3.time.hour.range;
    d3.time.hours.utc = d3.time.hour.utc.range;
    d3.time.day = d3_time_interval(function(date) {
        var day = new d3_time(1970, 0);
        day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        return day;
    }, function(date, offset) {
        date.setDate(date.getDate() + offset);
    }, function(date) {
        return date.getDate() - 1;
    });
    d3.time.days = d3.time.day.range;
    d3.time.days.utc = d3.time.day.utc.range;
    d3.time.dayOfYear = function(date) {
        var year = d3.time.year(date);
        return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
    };
    d3_time_daySymbols.forEach(function(day, i) {
        day = day.toLowerCase();
        i = 7 - i;
        var interval = d3.time[day] = d3_time_interval(function(date) {
            (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
            return date;
        }, function(date, offset) {
            date.setDate(date.getDate() + Math.floor(offset) * 7);
        }, function(date) {
            var day = d3.time.year(date).getDay();
            return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
        });
        d3.time[day + "s"] = interval.range;
        d3.time[day + "s"].utc = interval.utc.range;
        d3.time[day + "OfYear"] = function(date) {
            var day = d3.time.year(date).getDay();
            return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
        };
    });
    d3.time.week = d3.time.sunday;
    d3.time.weeks = d3.time.sunday.range;
    d3.time.weeks.utc = d3.time.sunday.utc.range;
    d3.time.weekOfYear = d3.time.sundayOfYear;
    d3.time.month = d3_time_interval(function(date) {
        date = d3.time.day(date);
        date.setDate(1);
        return date;
    }, function(date, offset) {
        date.setMonth(date.getMonth() + offset);
    }, function(date) {
        return date.getMonth();
    });
    d3.time.months = d3.time.month.range;
    d3.time.months.utc = d3.time.month.utc.range;
    d3.time.year = d3_time_interval(function(date) {
        date = d3.time.day(date);
        date.setMonth(0, 1);
        return date;
    }, function(date, offset) {
        date.setFullYear(date.getFullYear() + offset);
    }, function(date) {
        return date.getFullYear();
    });
    d3.time.years = d3.time.year.range;
    d3.time.years.utc = d3.time.year.utc.range;
    function d3_time_scale(linear, methods, format) {
        function scale(x) {
            return linear(x);
        }
        scale.invert = function(x) {
            return d3_time_scaleDate(linear.invert(x));
        };
        scale.domain = function(x) {
            if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
            linear.domain(x);
            return scale;
        };
        scale.nice = function(m) {
            return scale.domain(d3_scale_nice(scale.domain(), function() {
                return m;
            }));
        };
        scale.ticks = function(m, k) {
            var extent = d3_time_scaleExtent(scale.domain());
            if (typeof m !== "function") {
                var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
                if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
                if (!i) return linear.ticks(m).map(d3_time_scaleDate);
                if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
                m = methods[i];
                k = m[1];
                m = m[0].range;
            }
            return m(extent[0], new Date(+extent[1] + 1), k);
        };
        scale.tickFormat = function() {
            return format;
        };
        scale.copy = function() {
            return d3_time_scale(linear.copy(), methods, format);
        };
        return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
    }
    function d3_time_scaleExtent(domain) {
        var start = domain[0], stop = domain[domain.length - 1];
        return start < stop ? [ start, stop ] : [ stop, start ];
    }
    function d3_time_scaleDate(t) {
        return new Date(t);
    }
    function d3_time_scaleFormat(formats) {
        return function(date) {
            var i = formats.length - 1, f = formats[i];
            while (!f[1](date)) f = formats[--i];
            return f[0](date);
        };
    }
    function d3_time_scaleSetYear(y) {
        var d = new Date(y, 0, 1);
        d.setFullYear(y);
        return d;
    }
    function d3_time_scaleGetYear(d) {
        var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
        return y + (d - d0) / (d1 - d0);
    }
    var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
    var d3_time_scaleLocalMethods = [ [ d3.time.second, 1 ], [ d3.time.second, 5 ], [ d3.time.second, 15 ], [ d3.time.second, 30 ], [ d3.time.minute, 1 ], [ d3.time.minute, 5 ], [ d3.time.minute, 15 ], [ d3.time.minute, 30 ], [ d3.time.hour, 1 ], [ d3.time.hour, 3 ], [ d3.time.hour, 6 ], [ d3.time.hour, 12 ], [ d3.time.day, 1 ], [ d3.time.day, 2 ], [ d3.time.week, 1 ], [ d3.time.month, 1 ], [ d3.time.month, 3 ], [ d3.time.year, 1 ] ];
    var d3_time_scaleLocalFormats = [ [ d3.time.format("%Y"), d3_true ], [ d3.time.format("%B"), function(d) {
        return d.getMonth();
    } ], [ d3.time.format("%b %d"), function(d) {
        return d.getDate() != 1;
    } ], [ d3.time.format("%a %d"), function(d) {
        return d.getDay() && d.getDate() != 1;
    } ], [ d3.time.format("%I %p"), function(d) {
        return d.getHours();
    } ], [ d3.time.format("%I:%M"), function(d) {
        return d.getMinutes();
    } ], [ d3.time.format(":%S"), function(d) {
        return d.getSeconds();
    } ], [ d3.time.format(".%L"), function(d) {
        return d.getMilliseconds();
    } ] ];
    var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
    d3_time_scaleLocalMethods.year = function(extent, m) {
        return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
    };
    d3.time.scale = function() {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
    };
    var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
        return [ m[0].utc, m[1] ];
    });
    var d3_time_scaleUTCFormats = [ [ d3.time.format.utc("%Y"), d3_true ], [ d3.time.format.utc("%B"), function(d) {
        return d.getUTCMonth();
    } ], [ d3.time.format.utc("%b %d"), function(d) {
        return d.getUTCDate() != 1;
    } ], [ d3.time.format.utc("%a %d"), function(d) {
        return d.getUTCDay() && d.getUTCDate() != 1;
    } ], [ d3.time.format.utc("%I %p"), function(d) {
        return d.getUTCHours();
    } ], [ d3.time.format.utc("%I:%M"), function(d) {
        return d.getUTCMinutes();
    } ], [ d3.time.format.utc(":%S"), function(d) {
        return d.getUTCSeconds();
    } ], [ d3.time.format.utc(".%L"), function(d) {
        return d.getUTCMilliseconds();
    } ] ];
    var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
    function d3_time_scaleUTCSetYear(y) {
        var d = new Date(Date.UTC(y, 0, 1));
        d.setUTCFullYear(y);
        return d;
    }
    function d3_time_scaleUTCGetYear(d) {
        var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
        return y + (d - d0) / (d1 - d0);
    }
    d3_time_scaleUTCMethods.year = function(extent, m) {
        return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
    };
    d3.time.scale.utc = function() {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
    };
    return d3;
}();

(function() {
    var ε = 1e-6, ε2 = ε * ε, π = Math.PI, sqrtπ = Math.sqrt(π), radians = π / 180, degrees = 180 / π;
    var projection = d3.geo.projection, projectionMutator = d3.geo.projectionMutator;
    function sinci(x) {
        return x ? x / Math.sin(x) : 1;
    }
    function sgn(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    }
    function asqrt(x) {
        return x > 0 ? Math.sqrt(x) : 0;
    }
    function asin(x) {
        return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
    }
    function acos(x) {
        return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
    }
    function tanh(x) {
        x = Math.exp(2 * x);
        return (x - 1) / (x + 1);
    }
    function sinh(x) {
        return .5 * (Math.exp(x) - Math.exp(-x));
    }
    function cosh(x) {
        return .5 * (Math.exp(x) + Math.exp(-x));
    }
    function arsinh(x) {
        return Math.log(x + asqrt(x * x + 1));
    }
    function arcosh(x) {
        return Math.log(x + asqrt(x * x - 1));
    }
    function parallel1Projection(projectAt) {
        var φ0 = 0, m = projectionMutator(projectAt), p = m(φ0);
        p.parallel = function(_) {
            if (!arguments.length) return φ0 / π * 180;
            return m(φ0 = _ * π / 180);
        };
        return p;
    }
    function parallel2Projection(projectAt) {
        var φ0 = 0, φ1 = π / 3, m = projectionMutator(projectAt), p = m(φ0, φ1);
        p.parallels = function(_) {
            if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
            return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
        };
        return p;
    }
    function quincuncialProjection(projectHemisphere) {
        var dx = projectHemisphere(π / 2, 0)[0] - projectHemisphere(-π / 2, 0)[0];
        function projection() {
            var quincuncial = false, m = projectionMutator(projectAt), p = m(quincuncial);
            p.quincuncial = function(_) {
                if (!arguments.length) return quincuncial;
                return m(quincuncial = !!_);
            };
            return p;
        }
        function projectAt(quincuncial) {
            var forward = quincuncial ? function(λ, φ) {
                var t = Math.abs(λ) < π / 2, p = projectHemisphere(t ? λ : λ > 0 ? λ - π : λ + π, φ);
                var x = (p[0] - p[1]) * Math.SQRT1_2, y = (p[0] + p[1]) * Math.SQRT1_2;
                if (t) return [ x, y ];
                var d = dx * Math.SQRT1_2, s = x > 0 ^ y > 0 ? -1 : 1;
                return [ s * x - sgn(y) * d, s * y - sgn(x) * d ];
            } : function(λ, φ) {
                var s = λ > 0 ? -.5 : .5, point = projectHemisphere(λ + s * π, φ);
                point[0] -= s * dx;
                return point;
            };
            if (projectHemisphere.invert) forward.invert = quincuncial ? function(x0, y0) {
                var x = (x0 + y0) * Math.SQRT1_2, y = (y0 - x0) * Math.SQRT1_2, t = Math.abs(x) < .5 * dx && Math.abs(y) < .5 * dx;
                if (!t) {
                    var d = dx * Math.SQRT1_2, s = x > 0 ^ y > 0 ? -1 : 1, x1 = -s * (x0 + (y > 0 ? 1 : -1) * d), y1 = -s * (y0 + (x > 0 ? 1 : -1) * d);
                    x = (-x1 - y1) * Math.SQRT1_2;
                    y = (x1 - y1) * Math.SQRT1_2;
                }
                var p = projectHemisphere.invert(x, y);
                if (!t) p[0] += x > 0 ? π : -π;
                return p;
            } : function(x, y) {
                var s = x > 0 ? -.5 : .5, location = projectHemisphere.invert(x + s * dx, y), λ = location[0] - s * π;
                if (λ < -π) λ += 2 * π; else if (λ > π) λ -= 2 * π;
                location[0] = λ;
                return location;
            };
            return forward;
        }
        projection.raw = projectAt;
        return projection;
    }
    d3.geo.interrupt = function(project) {
        var lobes = [ [ [ [ -π, 0 ], [ 0, π / 2 ], [ π, 0 ] ] ], [ [ [ -π, 0 ], [ 0, -π / 2 ], [ π, 0 ] ] ] ];
        var projection = d3.geo.projection(function(λ, φ) {
            var sign = φ < 0 ? -1 : +1, hemilobes = lobes[+(φ < 0)];
            for (var i = 0, n = hemilobes.length - 1; i < n && λ > hemilobes[i][2][0]; ++i) ;
            var coordinates = project(λ - hemilobes[i][1][0], φ);
            coordinates[0] += project(hemilobes[i][1][0], sign * φ > sign * hemilobes[i][0][1] ? hemilobes[i][0][1] : φ)[0];
            return coordinates;
        });
        var stream_ = projection.stream;
        projection.stream = function(stream) {
            var rotate = projection.rotate(), rotateStream = stream_(stream), sphereStream = (projection.rotate([ 0, 0 ]), 
            stream_(stream));
            projection.rotate(rotate);
            rotateStream.sphere = function() {
                d3.geo.stream(sphere(), sphereStream);
            };
            return rotateStream;
        };
        projection.lobes = function(_) {
            if (!arguments.length) return lobes.map(function(lobes) {
                return lobes.map(function(lobe) {
                    return [ [ lobe[0][0] * 180 / π, lobe[0][1] * 180 / π ], [ lobe[1][0] * 180 / π, lobe[1][1] * 180 / π ], [ lobe[2][0] * 180 / π, lobe[2][1] * 180 / π ] ];
                });
            });
            lobes = _.map(function(lobes) {
                return lobes.map(function(lobe) {
                    return [ [ lobe[0][0] * π / 180, lobe[0][1] * π / 180 ], [ lobe[1][0] * π / 180, lobe[1][1] * π / 180 ], [ lobe[2][0] * π / 180, lobe[2][1] * π / 180 ] ];
                });
            });
            return projection;
        };
        function sphere() {
            var ε = 1e-6, coordinates = [];
            for (var i = 0, n = lobes[0].length; i < n; ++i) {
                var lobe = lobes[0][i], λ0 = lobe[0][0] * 180 / π, φ0 = lobe[0][1] * 180 / π, φ1 = lobe[1][1] * 180 / π, λ2 = lobe[2][0] * 180 / π, φ2 = lobe[2][1] * 180 / π;
                coordinates.push(resample([ [ λ0 + ε, φ0 + ε ], [ λ0 + ε, φ1 - ε ], [ λ2 - ε, φ1 - ε ], [ λ2 - ε, φ2 + ε ] ], 30));
            }
            for (var i = lobes[1].length - 1; i >= 0; --i) {
                var lobe = lobes[1][i], λ0 = lobe[0][0] * 180 / π, φ0 = lobe[0][1] * 180 / π, φ1 = lobe[1][1] * 180 / π, λ2 = lobe[2][0] * 180 / π, φ2 = lobe[2][1] * 180 / π;
                coordinates.push(resample([ [ λ2 - ε, φ2 - ε ], [ λ2 - ε, φ1 + ε ], [ λ0 + ε, φ1 + ε ], [ λ0 + ε, φ0 - ε ] ], 30));
            }
            return {
                type: "Polygon",
                coordinates: [ d3.merge(coordinates) ]
            };
        }
        function resample(coordinates, m) {
            var i = -1, n = coordinates.length, p0 = coordinates[0], p1, dx, dy, resampled = [];
            while (++i < n) {
                p1 = coordinates[i];
                dx = (p1[0] - p0[0]) / m;
                dy = (p1[1] - p0[1]) / m;
                for (var j = 0; j < m; ++j) resampled.push([ p0[0] + j * dx, p0[1] + j * dy ]);
                p0 = p1;
            }
            resampled.push(p1);
            return resampled;
        }
        return projection;
    };
    function ellipticJi(u, v, m) {
        if (!u) {
            var b = ellipticJ(v, 1 - m);
            return [ [ 0, b[0] / b[1] ], [ 1 / b[1], 0 ], [ b[2] / b[1], 0 ] ];
        }
        var a = ellipticJ(u, m);
        if (!v) return [ [ a[0], 0 ], [ a[1], 0 ], [ a[2], 0 ] ];
        var b = ellipticJ(v, 1 - m), denominator = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
        return [ [ a[0] * b[2] / denominator, a[1] * a[2] * b[0] * b[1] / denominator ], [ a[1] * b[1] / denominator, -a[0] * a[2] * b[0] * b[2] / denominator ], [ a[2] * b[1] * b[2] / denominator, -m * a[0] * a[1] * b[0] / denominator ] ];
    }
    function ellipticJ(u, m) {
        var ai, b, φ, t, twon;
        if (m < ε) {
            t = Math.sin(u);
            b = Math.cos(u);
            ai = .25 * m * (u - t * b);
            return [ t - ai * b, b + ai * t, 1 - .5 * m * t * t, u - ai ];
        }
        if (m >= 1 - ε) {
            ai = .25 * (1 - m);
            b = cosh(u);
            t = tanh(u);
            φ = 1 / b;
            twon = b * sinh(u);
            return [ t + ai * (twon - u) / (b * b), φ - ai * t * φ * (twon - u), φ + ai * t * φ * (twon + u), 2 * Math.atan(Math.exp(u)) - π / 2 + ai * (twon - u) / b ];
        }
        var a = [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ], c = [ Math.sqrt(m), 0, 0, 0, 0, 0, 0, 0, 0 ], i = 0;
        b = Math.sqrt(1 - m);
        twon = 1;
        while (Math.abs(c[i] / a[i]) > ε && i < 8) {
            ai = a[i++];
            c[i] = .5 * (ai - b);
            a[i] = .5 * (ai + b);
            b = asqrt(ai * b);
            twon *= 2;
        }
        φ = twon * a[i] * u;
        do {
            t = c[i] * Math.sin(b = φ) / a[i];
            φ = .5 * (asin(t) + φ);
        } while (--i);
        return [ Math.sin(φ), t = Math.cos(φ), t / Math.cos(φ - b), φ ];
    }
    function ellipticFi(φ, ψ, m) {
        var r = Math.abs(φ), i = Math.abs(ψ), sinhψ = sinh(i);
        if (r) {
            var cscφ = 1 / Math.sin(r), cotφ2 = 1 / (Math.tan(r) * Math.tan(r)), b = -(cotφ2 + m * sinhψ * sinhψ * cscφ * cscφ - 1 + m), c = (m - 1) * cotφ2, cotλ2 = .5 * (-b + Math.sqrt(b * b - 4 * c));
            return [ ellipticF(Math.atan(1 / Math.sqrt(cotλ2)), m) * sgn(φ), ellipticF(Math.atan(asqrt((cotλ2 / cotφ2 - 1) / m)), 1 - m) * sgn(ψ) ];
        }
        return [ 0, ellipticF(Math.atan(sinhψ), 1 - m) * sgn(ψ) ];
    }
    function ellipticF(φ, m) {
        if (!m) return φ;
        if (m === 1) return Math.log(Math.tan(φ / 2 + π / 4));
        var a = 1, b = Math.sqrt(1 - m), c = Math.sqrt(m);
        for (var i = 0; Math.abs(c) > ε; i++) {
            if (φ % π) {
                var dφ = Math.atan(b * Math.tan(φ) / a);
                if (dφ < 0) dφ += π;
                φ += dφ + ~~(φ / π) * π;
            } else φ += φ;
            c = (a + b) / 2;
            b = Math.sqrt(a * b);
            c = ((a = c) - b) / 2;
        }
        return φ / (Math.pow(2, i) * a);
    }
    function aitoff(λ, φ) {
        var cosφ = Math.cos(φ), sinciα = sinci(acos(cosφ * Math.cos(λ /= 2)));
        return [ 2 * cosφ * Math.sin(λ) * sinciα, Math.sin(φ) * sinciα ];
    }
    aitoff.invert = function(x, y) {
        var λ = x, φ = y, i = 25;
        do {
            var sinλ = Math.sin(λ), sinλ_2 = Math.sin(λ / 2), cosλ_2 = Math.cos(λ / 2), sinφ = Math.sin(φ), cosφ = Math.cos(φ), sin_2φ = Math.sin(2 * φ), sin2φ = sinφ * sinφ, cos2φ = cosφ * cosφ, sin2λ_2 = sinλ_2 * sinλ_2, C = 1 - cos2φ * cosλ_2 * cosλ_2, E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0, F, fx = 2 * E * cosφ * sinλ_2 - x, fy = E * sinφ - y, δxδλ = F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ), δxδφ = F * (.5 * sinλ * sin_2φ - E * 2 * sinφ * sinλ_2), δyδλ = F * .25 * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ), δyδφ = F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ), denominator = δxδφ * δyδλ - δyδφ * δxδλ;
            if (!denominator) break;
            var δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
            λ -= δλ, φ -= δφ;
        } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
        return [ λ, φ ];
    };
    (d3.geo.aitoff = function() {
        return projection(aitoff);
    }).raw = aitoff;
    function guyou(λ, φ) {
        var k_ = (Math.SQRT2 - 1) / (Math.SQRT2 + 1), k = Math.sqrt(1 - k_ * k_), K = ellipticF(π / 2, k * k), f = -1;
        var ψ = Math.log(Math.tan(π / 4 + Math.abs(φ) / 2)), r = Math.exp(f * ψ) / Math.sqrt(k_), at = guyouComplexAtan(r * Math.cos(f * λ), r * Math.sin(f * λ)), t = ellipticFi(at[0], at[1], k * k);
        return [ -t[1], sgn(φ) * (.5 * K - t[0]) ];
    }
    function guyouComplexAtan(x, y) {
        var x2 = x * x, y_1 = y + 1, t = 1 - x2 - y * y;
        return [ sgn(x) * π / 4 - .5 * Math.atan2(t, 2 * x), -.25 * Math.log(t * t + 4 * x2) + .5 * Math.log(y_1 * y_1 + x2) ];
    }
    function guyouComplexDivide(a, b) {
        var denominator = b[0] * b[0] + b[1] * b[1];
        return [ (a[0] * b[0] + a[1] * b[1]) / denominator, (a[1] * b[0] - a[0] * b[1]) / denominator ];
    }
    guyou.invert = function(x, y) {
        var k_ = (Math.SQRT2 - 1) / (Math.SQRT2 + 1), k = Math.sqrt(1 - k_ * k_), K = ellipticF(π / 2, k * k), f = -1;
        var j = ellipticJi(.5 * K - y, -x, k * k), tn = guyouComplexDivide(j[0], j[1]), λ = Math.atan2(tn[1], tn[0]) / f;
        return [ λ, 2 * Math.atan(Math.exp(.5 / f * Math.log(k_ * tn[0] * tn[0] + k_ * tn[1] * tn[1]))) - π / 2 ];
    };
    d3.geo.guyou = quincuncialProjection(guyou);
    function mollweideBromleyθ(Cp) {
        return function(θ) {
            var Cpsinθ = Cp * Math.sin(θ), i = 30, δ;
            do θ -= δ = (θ + Math.sin(θ) - Cpsinθ) / (1 + Math.cos(θ)); while (Math.abs(δ) > ε && --i > 0);
            return θ / 2;
        };
    }
    function mollweideBromley(Cx, Cy, Cp) {
        var θ = mollweideBromleyθ(Cp);
        function forward(λ, φ) {
            return [ Cx * λ * Math.cos(φ = θ(φ)), Cy * Math.sin(φ) ];
        }
        forward.invert = function(x, y) {
            var θ = asin(y / Cy);
            return [ x / (Cx * Math.cos(θ)), asin((2 * θ + Math.sin(2 * θ)) / Cp) ];
        };
        return forward;
    }
    var mollweideθ = mollweideBromleyθ(π), mollweide = mollweideBromley(2 * Math.SQRT2 / π, Math.SQRT2, π);
    (d3.geo.mollweide = function() {
        return projection(mollweide);
    }).raw = mollweide;
    function sinusoidal(λ, φ) {
        return [ λ * Math.cos(φ), φ ];
    }
    sinusoidal.invert = function(x, y) {
        return [ x / Math.cos(y), y ];
    };
    (d3.geo.sinusoidal = function() {
        return projection(sinusoidal);
    }).raw = sinusoidal;
    var sinuMollweideφ = .7109889596207567, sinuMollweideY = .0528035274542;
    function sinuMollweide(λ, φ) {
        return φ > -sinuMollweideφ ? (λ = mollweide(λ, φ), λ[1] += sinuMollweideY, λ) : sinusoidal(λ, φ);
    }
    sinuMollweide.invert = function(x, y) {
        return y > -sinuMollweideφ ? mollweide.invert(x, y - sinuMollweideY) : sinusoidal.invert(x, y);
    };
    (d3.geo.sinuMollweide = function() {
        return projection(sinuMollweide).rotate([ -20, -55 ]);
    }).raw = sinuMollweide;
    function armadillo(φ0) {
        var sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sφ0 = φ0 > 0 ? 1 : -1, tanφ0 = Math.tan(sφ0 * φ0), k = (1 + sinφ0 - cosφ0) / 2;
        function forward(λ, φ) {
            var cosφ = Math.cos(φ), cosλ = Math.cos(λ /= 2);
            return [ (1 + cosφ) * Math.sin(λ), (sφ0 * φ > -Math.atan2(cosλ, tanφ0) - .001 ? 0 : -sφ0 * 10) + k + Math.sin(φ) * cosφ0 - (1 + cosφ) * sinφ0 * cosλ ];
        }
        forward.invert = function(x, y) {
            var λ = 0, φ = 0, i = 50;
            do {
                var cosλ = Math.cos(λ), sinλ = Math.sin(λ), cosφ = Math.cos(φ), sinφ = Math.sin(φ), A = 1 + cosφ, fx = A * sinλ - x, fy = k + sinφ * cosφ0 - A * sinφ0 * cosλ - y, δxδλ = .5 * A * cosλ, δxδφ = -sinλ * sinφ, δyδλ = .5 * sinφ0 * A * sinλ, δyδφ = cosφ0 * cosφ + sinφ0 * cosλ * sinφ, denominator = δxδφ * δyδλ - δyδφ * δxδλ, δλ = .5 * (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
                λ -= δλ, φ -= δφ;
            } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
            return sφ0 * φ > -Math.atan2(Math.cos(λ), tanφ0) - .001 ? [ λ * 2, φ ] : null;
        };
        return forward;
    }
    function armadilloProjection() {
        var φ0 = π / 9, sφ0 = φ0 > 0 ? 1 : -1, tanφ0 = Math.tan(sφ0 * φ0), m = projectionMutator(armadillo), p = m(φ0), stream_ = p.stream;
        p.parallel = function(_) {
            if (!arguments.length) return φ0 / π * 180;
            tanφ0 = Math.tan((sφ0 = (φ0 = _ * π / 180) > 0 ? 1 : -1) * φ0);
            return m(φ0);
        };
        p.stream = function(stream) {
            var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([ 0, 0 ]), 
            stream_(stream));
            p.rotate(rotate);
            rotateStream.sphere = function() {
                sphereStream.polygonStart(), sphereStream.lineStart();
                for (var λ = sφ0 * -180; sφ0 * λ < 180; λ += sφ0 * 90) sphereStream.point(λ, sφ0 * 90);
                while (sφ0 * (λ -= φ0) >= -180) {
                    sphereStream.point(λ, sφ0 * -Math.atan2(Math.cos(λ * radians / 2), tanφ0) * degrees);
                }
                sphereStream.lineEnd(), sphereStream.polygonEnd();
            };
            return rotateStream;
        };
        return p;
    }
    (d3.geo.armadillo = armadilloProjection).raw = armadillo;
    function august(λ, φ) {
        var tanφ = Math.tan(φ / 2), k = asqrt(1 - tanφ * tanφ), c = 1 + k * Math.cos(λ /= 2), x = Math.sin(λ) * k / c, y = tanφ / c, x2 = x * x, y2 = y * y;
        return [ 4 / 3 * x * (3 + x2 - 3 * y2), 4 / 3 * y * (3 + 3 * x2 - y2) ];
    }
    august.invert = function(x, y) {
        x *= 3 / 8, y *= 3 / 8;
        if (!x && Math.abs(y) > 1) return null;
        var x2 = x * x, y2 = y * y, s = 1 + x2 + y2, sin3η = Math.sqrt(.5 * (s - Math.sqrt(s * s - 4 * y * y))), η = asin(sin3η) / 3, ξ = sin3η ? arcosh(Math.abs(y / sin3η)) / 3 : arsinh(Math.abs(x)) / 3, cosη = Math.cos(η), coshξ = cosh(ξ), d = coshξ * coshξ - cosη * cosη;
        return [ sgn(x) * 2 * Math.atan2(sinh(ξ) * cosη, .25 - d), sgn(y) * 2 * Math.atan2(coshξ * Math.sin(η), .25 + d) ];
    };
    (d3.geo.august = function() {
        return projection(august);
    }).raw = august;
    var bakerφ = Math.log(1 + Math.SQRT2);
    function baker(λ, φ) {
        var φ0 = Math.abs(φ);
        return φ0 < π / 4 ? [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ] : [ λ * Math.cos(φ0) * (2 * Math.SQRT2 - 1 / Math.sin(φ0)), sgn(φ) * (2 * Math.SQRT2 * (φ0 - π / 4) - Math.log(Math.tan(φ0 / 2))) ];
    }
    baker.invert = function(x, y) {
        if ((y0 = Math.abs(y)) < bakerφ) return [ x, 2 * Math.atan(Math.exp(y)) - π / 2 ];
        var sqrt8 = Math.sqrt(8), φ = π / 4, i = 25, δ, y0;
        do {
            var cosφ_2 = Math.cos(φ / 2), tanφ_2 = Math.tan(φ / 2);
            φ -= δ = (sqrt8 * (φ - π / 4) - Math.log(tanφ_2) - y0) / (sqrt8 - .5 * cosφ_2 * cosφ_2 / tanφ_2);
        } while (Math.abs(δ) > ε2 && --i > 0);
        return [ x / (Math.cos(φ) * (sqrt8 - 1 / Math.sin(φ))), sgn(y) * φ ];
    };
    (d3.geo.baker = function() {
        return projection(baker);
    }).raw = baker;
    var berghausAzimuthalEquidistant = d3.geo.azimuthalEquidistant.raw;
    function berghaus(n) {
        var k = 2 * π / n;
        function forward(λ, φ) {
            var p = berghausAzimuthalEquidistant(λ, φ);
            if (Math.abs(λ) > π / 2) {
                var θ = Math.atan2(p[1], p[0]), r = Math.sqrt(p[0] * p[0] + p[1] * p[1]), θ0 = k * Math.round((θ - π / 2) / k) + π / 2, α = Math.atan2(Math.sin(θ -= θ0), 2 - Math.cos(θ));
                θ = θ0 + asin(π / r * Math.sin(α)) - α;
                p[0] = r * Math.cos(θ);
                p[1] = r * Math.sin(θ);
            }
            return p;
        }
        forward.invert = function(x, y) {
            var r = Math.sqrt(x * x + y * y);
            if (r > π / 2) {
                var θ = Math.atan2(y, x), θ0 = k * Math.round((θ - π / 2) / k) + π / 2, s = θ > θ0 ? -1 : 1, A = r * Math.cos(θ0 - θ);
                cotα = 1 / Math.tan(s * Math.acos((A - π) / Math.sqrt(π * (π - 2 * A) + r * r)));
                θ = θ0 + 2 * Math.atan((cotα + s * Math.sqrt(cotα * cotα - 3)) / 3);
                x = r * Math.cos(θ), y = r * Math.sin(θ);
            }
            return berghausAzimuthalEquidistant.invert(x, y);
        };
        return forward;
    }
    function berghausProjection() {
        var n = 5, m = projectionMutator(berghaus), p = m(n), stream_ = p.stream;
        p.lobes = function(_) {
            if (!arguments.length) return n;
            return m(n = +_);
        };
        p.stream = function(stream) {
            var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([ 0, 0 ]), 
            stream_(stream));
            p.rotate(rotate);
            rotateStream.sphere = function() {
                sphereStream.polygonStart(), sphereStream.lineStart();
                var ε = 1e-4;
                for (var i = 0, δ = 360 / n, φ = 90 - 180 / n; i < n; ++i, φ -= δ) {
                    sphereStream.point(180, 0);
                    if (φ < -90) {
                        sphereStream.point(-90, 180 - φ - ε);
                        sphereStream.point(-90, 180 - φ + ε);
                    } else {
                        sphereStream.point(90, φ + ε);
                        sphereStream.point(90, φ - ε);
                    }
                }
                sphereStream.lineEnd(), sphereStream.polygonEnd();
            };
            return rotateStream;
        };
        return p;
    }
    (d3.geo.berghaus = berghausProjection).raw = berghaus;
    function boggs(λ, φ) {
        var k = 2.00276, θ = mollweideθ(φ);
        return [ k * λ / (1 / Math.cos(φ) + 1.11072 / Math.cos(θ)), (φ + Math.SQRT2 * Math.sin(θ)) / k ];
    }
    boggs.invert = function(x, y) {
        var k = 2.00276, ky = k * y, θ = y < 0 ? -π / 4 : π / 4, i = 25, δ, φ;
        do {
            φ = ky - Math.SQRT2 * Math.sin(θ);
            θ -= δ = (Math.sin(2 * θ) + 2 * θ - π * Math.sin(φ)) / (2 * Math.cos(2 * θ) + 2 + π * Math.cos(φ) * Math.SQRT2 * Math.cos(θ));
        } while (Math.abs(δ) > ε && --i > 0);
        φ = ky - Math.SQRT2 * Math.sin(θ);
        return [ x * (1 / Math.cos(φ) + 1.11072 / Math.cos(θ)) / k, φ ];
    };
    (d3.geo.boggs = function() {
        return projection(boggs);
    }).raw = boggs;
    function bonne(φ0) {
        if (!φ0) return sinusoidal;
        var cotφ0 = 1 / Math.tan(φ0);
        function forward(λ, φ) {
            var ρ = cotφ0 + φ0 - φ, E = ρ ? λ * Math.cos(φ) / ρ : ρ;
            return [ ρ * Math.sin(E), cotφ0 - ρ * Math.cos(E) ];
        }
        forward.invert = function(x, y) {
            var ρ = Math.sqrt(x * x + (y = cotφ0 - y) * y), φ = cotφ0 + φ0 - ρ;
            return [ ρ / Math.cos(φ) * Math.atan2(x, y), φ ];
        };
        return forward;
    }
    (d3.geo.bonne = function() {
        return parallel1Projection(bonne).parallel(45);
    }).raw = bonne;
    var bromley = mollweideBromley(1, 4 / π, π);
    (d3.geo.bromley = function() {
        return projection(bromley);
    }).raw = bromley;
    function collignon(λ, φ) {
        var α = asqrt(1 - Math.sin(φ));
        return [ 2 / sqrtπ * λ * α, sqrtπ * (1 - α) ];
    }
    collignon.invert = function(x, y) {
        var λ = (λ = y / sqrtπ - 1) * λ;
        return [ λ > 0 ? x * Math.sqrt(π / λ) / 2 : 0, asin(1 - λ) ];
    };
    (d3.geo.collignon = function() {
        return projection(collignon);
    }).raw = collignon;
    function conicConformal(φ0, φ1) {
        var cosφ0 = Math.cos(φ0), t = function(φ) {
            return Math.tan(π / 4 + φ / 2);
        }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
        if (!n) return conicConformalMercator;
        function forward(λ, φ) {
            var ρ = Math.abs(Math.abs(φ) - π / 2) < ε ? 0 : F / Math.pow(t(φ), n);
            return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
        }
        forward.invert = function(x, y) {
            var ρ0_y = F - y, ρ = sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
            return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - π / 2 ];
        };
        return forward;
    }
    function conicConformalMercator(λ, φ) {
        return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
    }
    conicConformalMercator.invert = function(x, y) {
        return [ x, 2 * Math.atan(Math.exp(y)) - π / 2 ];
    };
    (d3.geo.conicConformal = function() {
        return parallel2Projection(conicConformal);
    }).raw = conicConformal;
    function conicEquidistant(φ0, φ1) {
        var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
        if (Math.abs(n) < ε) return d3.geo.equirectangular.raw;
        function forward(λ, φ) {
            var ρ = G - φ;
            return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
        }
        forward.invert = function(x, y) {
            var ρ0_y = G - y;
            return [ Math.atan2(x, ρ0_y) / n, G - sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
        };
        return forward;
    }
    (d3.geo.conicEquidistant = function() {
        return parallel2Projection(conicEquidistant);
    }).raw = conicEquidistant;
    function craig(φ0) {
        var tanφ0 = Math.tan(φ0);
        function forward(λ, φ) {
            return [ λ, (λ ? λ / Math.sin(λ) : 1) * (Math.sin(φ) * Math.cos(λ) - tanφ0 * Math.cos(φ)) ];
        }
        forward.invert = tanφ0 ? function(x, y) {
            if (x) y *= Math.sin(x) / x;
            var cosλ = Math.cos(x);
            return [ x, 2 * Math.atan2(Math.sqrt(cosλ * cosλ + tanφ0 * tanφ0 - y * y) - cosλ, tanφ0 - y) ];
        } : function(x, y) {
            return [ x, asin(x ? y * Math.tan(x) / x : y) ];
        };
        return forward;
    }
    (d3.geo.craig = function() {
        return parallel1Projection(craig);
    }).raw = craig;
    function craster(λ, φ) {
        var sqrt3 = Math.sqrt(3);
        return [ sqrt3 * λ * (2 * Math.cos(2 * φ / 3) - 1) / sqrtπ, sqrt3 * sqrtπ * Math.sin(φ / 3) ];
    }
    craster.invert = function(x, y) {
        var sqrt3 = Math.sqrt(3), φ = 3 * asin(y / (sqrt3 * sqrtπ));
        return [ sqrtπ * x / (sqrt3 * (2 * Math.cos(2 * φ / 3) - 1)), φ ];
    };
    (d3.geo.craster = function() {
        return projection(craster);
    }).raw = craster;
    function cylindricalEqualArea(φ0) {
        var cosφ0 = Math.cos(φ0);
        function forward(λ, φ) {
            return [ λ * cosφ0, Math.sin(φ) / cosφ0 ];
        }
        forward.invert = function(x, y) {
            return [ x / cosφ0, asin(y * cosφ0) ];
        };
        return forward;
    }
    (d3.geo.cylindricalEqualArea = function() {
        return parallel1Projection(cylindricalEqualArea);
    }).raw = cylindricalEqualArea;
    function eckert1(λ, φ) {
        var α = Math.sqrt(8 / (3 * π));
        return [ α * λ * (1 - Math.abs(φ) / π), α * φ ];
    }
    eckert1.invert = function(x, y) {
        var α = Math.sqrt(8 / (3 * π)), φ = y / α;
        return [ x / (α * (1 - Math.abs(φ) / π)), φ ];
    };
    (d3.geo.eckert1 = function() {
        return projection(eckert1);
    }).raw = eckert1;
    function eckert2(λ, φ) {
        var α = Math.sqrt(4 - 3 * Math.sin(Math.abs(φ)));
        return [ 2 / Math.sqrt(6 * π) * λ * α, sgn(φ) * Math.sqrt(2 * π / 3) * (2 - α) ];
    }
    eckert2.invert = function(x, y) {
        var α = 2 - Math.abs(y) / Math.sqrt(2 * π / 3);
        return [ x * Math.sqrt(6 * π) / (2 * α), sgn(y) * asin((4 - α * α) / 3) ];
    };
    (d3.geo.eckert2 = function() {
        return projection(eckert2);
    }).raw = eckert2;
    function eckert3(λ, φ) {
        var k = Math.sqrt(π * (4 + π));
        return [ 2 / k * λ * (1 + Math.sqrt(1 - 4 * φ * φ / (π * π))), 4 / k * φ ];
    }
    eckert3.invert = function(x, y) {
        var k = Math.sqrt(π * (4 + π)) / 2;
        return [ x * k / (1 + asqrt(1 - y * y * (4 + π) / (4 * π))), y * k / 2 ];
    };
    (d3.geo.eckert3 = function() {
        return projection(eckert3);
    }).raw = eckert3;
    function eckert4(λ, φ) {
        var k = (2 + π / 2) * Math.sin(φ);
        φ /= 2;
        for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
            var cosφ = Math.cos(φ);
            φ -= δ = (φ + Math.sin(φ) * (cosφ + 2) - k) / (2 * cosφ * (1 + cosφ));
        }
        return [ 2 / Math.sqrt(π * (4 + π)) * λ * (1 + Math.cos(φ)), 2 * Math.sqrt(π / (4 + π)) * Math.sin(φ) ];
    }
    eckert4.invert = function(x, y) {
        var j = 2 * Math.sqrt(π / (4 + π)), k = asin(y / cy), c = Math.cos(k);
        return [ x / (2 / Math.sqrt(π * (4 + π)) * (1 + c)), asin((k + y / j * (c + 2)) / (2 + π / 2)) ];
    };
    (d3.geo.eckert4 = function() {
        return projection(eckert4);
    }).raw = eckert4;
    function eckert5(λ, φ) {
        return [ λ * (1 + Math.cos(φ)) / Math.sqrt(2 + π), 2 * φ / Math.sqrt(2 + π) ];
    }
    eckert5.invert = function(x, y) {
        var k = Math.sqrt(2 + π), φ = y * k / 2;
        return [ k * x / (1 + Math.cos(φ)), φ ];
    };
    (d3.geo.eckert5 = function() {
        return projection(eckert5);
    }).raw = eckert5;
    function eckert6(λ, φ) {
        var k = (1 + π / 2) * Math.sin(φ);
        for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
            φ -= δ = (φ + Math.sin(φ) - k) / (1 + Math.cos(φ));
        }
        k = Math.sqrt(2 + π);
        return [ λ * (1 + Math.cos(φ)) / k, 2 * φ / k ];
    }
    eckert6.invert = function(x, y) {
        var j = 1 + π / 2, k = Math.sqrt(j / 2);
        return [ x * 2 * k / (1 + Math.cos(y *= k)), asin((y + Math.sin(y)) / j) ];
    };
    (d3.geo.eckert6 = function() {
        return projection(eckert6);
    }).raw = eckert6;
    function eisenlohr(λ, φ) {
        var s0 = Math.sin(λ /= 2), c0 = Math.cos(λ), k = Math.sqrt(Math.cos(φ)), c1 = Math.cos(φ /= 2), t = Math.sin(φ) / (c1 + Math.SQRT2 * c0 * k), c = Math.sqrt(2 / (1 + t * t)), v = Math.sqrt((Math.SQRT2 * c1 + (c0 + s0) * k) / (Math.SQRT2 * c1 + (c0 - s0) * k));
        return [ eisenlohrK * (c * (v - 1 / v) - 2 * Math.log(v)), eisenlohrK * (c * t * (v + 1 / v) - 2 * Math.atan(t)) ];
    }
    eisenlohr.invert = function(x, y) {
        var p = d3.geo.august.raw.invert(x / 1.2, y * 1.065);
        if (!p) return null;
        var λ = p[0], φ = p[1], i = 20;
        x /= eisenlohrK, y /= eisenlohrK;
        do {
            var _0 = λ / 2, _1 = φ / 2, s0 = Math.sin(_0), c0 = Math.cos(_0), s1 = Math.sin(_1), c1 = Math.cos(_1), cos1 = Math.cos(φ), k = Math.sqrt(cos1), t = s1 / (c1 + Math.SQRT2 * c0 * k), t2 = t * t, c = Math.sqrt(2 / (1 + t2)), v0 = Math.SQRT2 * c1 + (c0 + s0) * k, v1 = Math.SQRT2 * c1 + (c0 - s0) * k, v2 = v0 / v1, v = Math.sqrt(v2), vm1v = v - 1 / v, vp1v = v + 1 / v, fx = c * vm1v - 2 * Math.log(v) - x, fy = c * t * vp1v - 2 * Math.atan(t) - y, δtδλ = s1 && Math.SQRT1_2 * k * s0 * t2 / s1, δtδφ = (Math.SQRT2 * c0 * c1 + k) / (2 * (c1 + Math.SQRT2 * c0 * k) * (c1 + Math.SQRT2 * c0 * k) * k), δcδt = -.5 * t * c * c * c, δcδλ = δcδt * δtδλ, δcδφ = δcδt * δtδφ, A = (A = 2 * c1 + Math.SQRT2 * k * (c0 - s0)) * A * v, δvδλ = (Math.SQRT2 * c0 * c1 * k + cos1) / A, δvδφ = -(Math.SQRT2 * s0 * s1) / (k * A), δxδλ = vm1v * δcδλ - 2 * δvδλ / v + c * (δvδλ + δvδλ / v2), δxδφ = vm1v * δcδφ - 2 * δvδφ / v + c * (δvδφ + δvδφ / v2), δyδλ = t * vp1v * δcδλ - 2 * δtδλ / (1 + t2) + c * vp1v * δtδλ + c * t * (δvδλ - δvδλ / v2), δyδφ = t * vp1v * δcδφ - 2 * δtδφ / (1 + t2) + c * vp1v * δtδφ + c * t * (δvδφ - δvδφ / v2), denominator = δxδφ * δyδλ - δyδφ * δxδλ;
            if (!denominator) break;
            var δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
            λ -= δλ;
            φ = Math.max(-π / 2, Math.min(π / 2, φ - δφ));
        } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
        return Math.abs(Math.abs(φ) - π / 2) < ε ? [ 0, φ ] : i && [ λ, φ ];
    };
    var eisenlohrK = 3 + 2 * Math.SQRT2;
    (d3.geo.eisenlohr = function() {
        return projection(eisenlohr);
    }).raw = eisenlohr;
    function fahey(λ, φ) {
        var t = Math.tan(φ / 2);
        return [ λ * faheyK * asqrt(1 - t * t), (1 + faheyK) * t ];
    }
    fahey.invert = function(x, y) {
        var t = y / (1 + faheyK);
        return [ x ? x / (faheyK * asqrt(1 - t * t)) : 0, 2 * Math.atan(t) ];
    };
    var faheyK = Math.cos(35 * radians);
    (d3.geo.fahey = function() {
        return projection(fahey);
    }).raw = fahey;
    function gringorten(λ, φ) {
        var sλ = sgn(λ), sφ = sgn(φ), cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(sφ * φ);
        λ = Math.abs(Math.atan2(y, z));
        φ = asin(-x);
        if (Math.abs(λ - π / 2) > ε) λ %= π / 2;
        var point = gringortenHexadecant(λ > π / 4 ? π / 2 - λ : λ, Math.abs(φ)), t;
        x = point[0];
        y = point[1];
        if (λ > π / 4) t = x, x = -y, y = -t;
        return [ sλ * x, -sφ * y ];
    }
    function gringortenHexadecant(λ, φ) {
        if (φ === π / 2) return [ 0, 0 ];
        var sinφ = Math.sin(φ), r = sinφ * sinφ, r2 = r * r, j = 1 + r2, k = 1 + 3 * r2, q = 1 - r2, z = asin(1 / Math.sqrt(j)), v = q + r * j * z, p2 = (1 - sinφ) / v, p = Math.sqrt(p2), a2 = p2 * j, a = Math.sqrt(a2), h = p * q;
        if (λ === 0) return [ 0, -(h + r * a) ];
        var cosφ = Math.cos(φ), secφ = 1 / cosφ, drdφ = 2 * sinφ * cosφ, dvdφ = (-3 * r + z * k) * drdφ, dp2dφ = (-v * cosφ - (1 - sinφ) * dvdφ) / (v * v), dpdφ = .5 * dp2dφ / p, dhdφ = q * dpdφ - 2 * r * p * drdφ, dra2dφ = r * j * dp2dφ + p2 * k * drdφ, μ = -secφ * drdφ, ν = -secφ * dra2dφ, ζ = -2 * secφ * dhdφ, Λ = 4 * λ / π;
        if (λ > .222 * π || φ < π / 4 && λ > .175 * π) {
            var x = (h + r * asqrt(a2 * (1 + r2) - h * h)) / (1 + r2);
            if (λ > π / 4) return [ x, x ];
            var x1 = x, x0 = .5 * x, i = 50;
            x = .5 * (x0 + x1);
            do {
                var g = Math.sqrt(a2 - x * x), f = x * (ζ + μ * g) + ν * asin(x / a) - Λ;
                if (!f) break;
                if (f < 0) x0 = x; else x1 = x;
                x = .5 * (x0 + x1);
            } while (Math.abs(x1 - x0) > ε && --i > 0);
        } else {
            var x = ε, i = 25, δ;
            do {
                var x2 = x * x, g = asqrt(a2 - x2), ζμg = ζ + μ * g, f = x * ζμg + ν * asin(x / a) - Λ, df = ζμg + (ν - μ * x2) / g;
                x -= δ = g ? f / df : 0;
            } while (Math.abs(δ) > ε && --i > 0);
        }
        return [ x, -h - r * asqrt(a2 - x * x) ];
    }
    d3.geo.gringorten = quincuncialProjection(gringorten);
    function hammerRetroazimuthal(φ0) {
        var sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), rotate = hammerRetroazimuthalRotation(φ0);
        rotate.invert = hammerRetroazimuthalRotation(-φ0);
        function forward(λ, φ) {
            var p = rotate(λ, φ);
            λ = p[0], φ = p[1];
            var sinφ = Math.sin(φ), cosφ = Math.cos(φ), cosλ = Math.cos(λ), z = acos(sinφ0 * sinφ + cosφ0 * cosφ * cosλ), sinz = Math.sin(z), K = Math.abs(sinz) > ε ? z / sinz : 1;
            return [ K * cosφ0 * Math.sin(λ), (Math.abs(λ) > π / 2 ? K : -K) * (sinφ0 * cosφ - cosφ0 * sinφ * cosλ) ];
        }
        forward.invert = function(x, y) {
            var ρ = Math.sqrt(x * x + y * y), sinz = -Math.sin(ρ), cosz = Math.cos(ρ), a = ρ * cosz, b = -y * sinz, c = ρ * sinφ0, d = asqrt(a * a + b * b - c * c), φ = Math.atan2(a * c + b * d, b * c - a * d), λ = (ρ > π / 2 ? -1 : 1) * Math.atan2(x * sinz, ρ * Math.cos(φ) * cosz + y * Math.sin(φ) * sinz);
            return rotate.invert(λ, φ);
        };
        return forward;
    }
    function hammerRetroazimuthalRotation(φ0) {
        var sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0);
        return function(λ, φ) {
            var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ);
            return [ Math.atan2(y, x * cosφ0 - z * sinφ0), asin(z * cosφ0 + x * sinφ0) ];
        };
    }
    function hammerRetroazimuthalProjection() {
        var φ0 = 0, m = projectionMutator(hammerRetroazimuthal), p = m(φ0), rotate_ = p.rotate, stream_ = p.stream, circle = d3.geo.circle();
        p.parallel = function(_) {
            if (!arguments.length) return φ0 / π * 180;
            var r = p.rotate();
            return m(φ0 = _ * π / 180).rotate(r);
        };
        p.rotate = function(_) {
            if (!arguments.length) return _ = rotate_.call(p), _[1] += φ0 / π * 180, _;
            rotate_.call(p, [ _[0], _[1] - φ0 / π * 180 ]);
            circle.origin([ -_[0], -_[1] ]);
            return p;
        };
        p.stream = function(stream) {
            stream = stream_(stream);
            stream.sphere = function() {
                stream.polygonStart();
                var ε = .01, ring = circle.angle(90 - ε)().coordinates[0], n = ring.length - 1, i = -1, p;
                stream.lineStart();
                while (++i < n) stream.point((p = ring[i])[0], p[1]);
                stream.lineEnd();
                ring = circle.angle(90 + ε)().coordinates[0];
                n = ring.length - 1;
                stream.lineStart();
                while (--i >= 0) stream.point((p = ring[i])[0], p[1]);
                stream.lineEnd();
                stream.polygonEnd();
            };
            return stream;
        };
        return p;
    }
    (d3.geo.hammerRetroazimuthal = hammerRetroazimuthalProjection).raw = hammerRetroazimuthal;
    var hammerAzimuthalEqualArea = d3.geo.azimuthalEqualArea.raw;
    function hammer(A, B) {
        if (arguments.length < 2) B = A;
        if (B === 1) return hammerAzimuthalEqualArea;
        if (B === Infinity) return hammerQuarticAuthalic;
        function forward(λ, φ) {
            var coordinates = hammerAzimuthalEqualArea(λ / B, φ);
            coordinates[0] *= A;
            return coordinates;
        }
        forward.invert = function(x, y) {
            var coordinates = hammerAzimuthalEqualArea.invert(x / A, y);
            coordinates[0] *= B;
            return coordinates;
        };
        return forward;
    }
    function hammerProjection() {
        var B = 2, m = projectionMutator(hammer), p = m(B);
        p.coefficient = function(_) {
            if (!arguments.length) return B;
            return m(B = +_);
        };
        return p;
    }
    function hammerQuarticAuthalic(λ, φ) {
        return [ λ * Math.cos(φ) / Math.cos(φ /= 2), 2 * Math.sin(φ) ];
    }
    hammerQuarticAuthalic.invert = function(x, y) {
        var φ = 2 * asin(y / 2);
        return [ x * Math.cos(φ / 2) / Math.cos(φ), φ ];
    };
    (d3.geo.hammer = hammerProjection).raw = hammer;
    function hatano(λ, φ) {
        var c = Math.sin(φ) * (φ < 0 ? 2.43763 : 2.67595);
        for (var i = 0, δ; i < 20; i++) {
            φ -= δ = (φ + Math.sin(φ) - c) / (1 + Math.cos(φ));
            if (Math.abs(δ) < ε) break;
        }
        return [ .85 * λ * Math.cos(φ *= .5), Math.sin(φ) * (φ < 0 ? 1.93052 : 1.75859) ];
    }
    hatano.invert = function(x, y) {
        var θ = Math.abs(θ = y * (y < 0 ? .5179951515653813 : .5686373742600607)) > 1 - ε ? θ > 0 ? π / 2 : -π / 2 : asin(θ);
        return [ 1.1764705882352942 * x / Math.cos(θ), Math.abs(θ = ((θ += θ) + Math.sin(θ)) * (y < 0 ? .4102345310814193 : .3736990601468637)) > 1 - ε ? θ > 0 ? π / 2 : -π / 2 : asin(θ) ];
    };
    (d3.geo.hatano = function() {
        return projection(hatano);
    }).raw = hatano;
    var healpixParallel = 41 + 48 / 36 + 37 / 3600;
    function healpix(h) {
        var lambert = d3.geo.cylindricalEqualArea.raw(0), φ0 = healpixParallel * π / 180, dx0 = 2 * π, dx1 = d3.geo.collignon.raw(π, φ0)[0] - d3.geo.collignon.raw(-π, φ0)[0], y0 = lambert(0, φ0)[1], y1 = d3.geo.collignon.raw(0, φ0)[1], dy1 = d3.geo.collignon.raw(0, π / 2)[1] - y1, k = 2 * π / h;
        function forward(λ, φ) {
            var point, φ2 = Math.abs(φ);
            if (φ2 > φ0) {
                var i = Math.min(h - 1, Math.max(0, Math.floor((λ + π) / k)));
                λ += π * (h - 1) / h - i * k;
                point = d3.geo.collignon.raw(λ, φ2);
                point[0] = point[0] * dx0 / dx1 - dx0 * (h - 1) / (2 * h) + i * dx0 / h;
                point[1] = y0 + (point[1] - y1) * 4 * dy1 / dx0;
                if (φ < 0) point[1] = -point[1];
            } else {
                point = lambert(λ, φ);
            }
            point[0] /= 2;
            return point;
        }
        forward.invert = function(x, y) {
            x *= 2;
            var y2 = Math.abs(y);
            if (y2 > y0) {
                var i = Math.min(h - 1, Math.max(0, Math.floor((x + π) / k)));
                x = (x + π * (h - 1) / h - i * k) * dx1 / dx0;
                var point = d3.geo.collignon.raw.invert(x, .25 * (y2 - y0) * dx0 / dy1 + y1);
                point[0] -= π * (h - 1) / h - i * k;
                if (y < 0) point[1] = -point[1];
                return point;
            }
            return lambert.invert(x, y);
        };
        return forward;
    }
    function healpixProjection() {
        var n = 2, m = projectionMutator(healpix), p = m(n), stream_ = p.stream;
        p.lobes = function(_) {
            if (!arguments.length) return n;
            return m(n = +_);
        };
        p.stream = function(stream) {
            var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([ 0, 0 ]), 
            stream_(stream));
            p.rotate(rotate);
            rotateStream.sphere = function() {
                d3.geo.stream(sphere(), sphereStream);
            };
            return rotateStream;
        };
        function sphere() {
            var step = 180 / n;
            return {
                type: "Polygon",
                coordinates: [ d3.range(-180, 180 + step / 2, step).map(function(x, i) {
                    return [ x, i & 1 ? 90 - 1e-6 : healpixParallel ];
                }).concat(d3.range(180, -180 - step / 2, -step).map(function(x, i) {
                    return [ x, i & 1 ? -90 + 1e-6 : -healpixParallel ];
                })) ]
            };
        }
        return p;
    }
    (d3.geo.healpix = healpixProjection).raw = healpix;
    function hill(K) {
        var L = 1 + K, sinβ = Math.sin(1 / L), β = asin(sinβ), A = 2 * Math.sqrt(π / (B = π + 4 * β * L)), B, ρ0 = .5 * A * (L + Math.sqrt(K * (2 + K))), K2 = K * K, L2 = L * L;
        function forward(λ, φ) {
            var t = 1 - Math.sin(φ), ρ, ω;
            if (t && t < 2) {
                var θ = π / 2 - φ, i = 25, δ;
                do {
                    var sinθ = Math.sin(θ), cosθ = Math.cos(θ), β_β1 = β + Math.atan2(sinθ, L - cosθ), C = 1 + L2 - 2 * L * cosθ;
                    θ -= δ = (θ - K2 * β - L * sinθ + C * β_β1 - .5 * t * B) / (2 * L * sinθ * β_β1);
                } while (Math.abs(δ) > ε2 && --i > 0);
                ρ = A * Math.sqrt(C);
                ω = λ * β_β1 / π;
            } else {
                ρ = A * (K + t);
                ω = λ * β / π;
            }
            return [ ρ * Math.sin(ω), ρ0 - ρ * Math.cos(ω) ];
        }
        forward.invert = function(x, y) {
            var ρ2 = x * x + (y -= ρ0) * y, cosθ = (1 + L2 - ρ2 / (A * A)) / (2 * L), θ = acos(cosθ), sinθ = Math.sin(θ), β_β1 = β + Math.atan2(sinθ, L - cosθ);
            return [ asin(x / Math.sqrt(ρ2)) * π / β_β1, asin(1 - 2 * (θ - K2 * β - L * sinθ + (1 + L2 - 2 * L * cosθ) * β_β1) / B) ];
        };
        return forward;
    }
    function hillProjection() {
        var K = 1, m = projectionMutator(hill), p = m(K);
        p.ratio = function(_) {
            if (!arguments.length) return K;
            return m(K = +_);
        };
        return p;
    }
    (d3.geo.hill = hillProjection).raw = hill;
    function homolosine(λ, φ) {
        return Math.abs(φ) > sinuMollweideφ ? (λ = mollweide(λ, φ), λ[1] -= φ > 0 ? sinuMollweideY : -sinuMollweideY, 
        λ) : sinusoidal(λ, φ);
    }
    homolosine.invert = function(x, y) {
        return Math.abs(y) > sinuMollweideφ ? mollweide.invert(x, y + (y > 0 ? sinuMollweideY : -sinuMollweideY)) : sinusoidal.invert(x, y);
    };
    (d3.geo.homolosine = function() {
        return projection(homolosine);
    }).raw = homolosine;
    function kavrayskiy7(λ, φ) {
        return [ 3 * λ / (2 * π) * Math.sqrt(π * π / 3 - φ * φ), φ ];
    }
    kavrayskiy7.invert = function(x, y) {
        return [ 2 / 3 * π * x / Math.sqrt(π * π / 3 - y * y), y ];
    };
    (d3.geo.kavrayskiy7 = function() {
        return projection(kavrayskiy7);
    }).raw = kavrayskiy7;
    function lagrange(n) {
        function forward(λ, φ) {
            if (Math.abs(Math.abs(φ) - π / 2) < ε) return [ 0, φ < 0 ? -2 : 2 ];
            var sinφ = Math.sin(φ), v = Math.pow((1 + sinφ) / (1 - sinφ), n / 2), c = .5 * (v + 1 / v) + Math.cos(λ *= n);
            return [ 2 * Math.sin(λ) / c, (v - 1 / v) / c ];
        }
        forward.invert = function(x, y) {
            var y0 = Math.abs(y);
            if (Math.abs(y0 - 2) < ε) return x ? null : [ 0, sgn(y) * π / 2 ];
            if (y0 > 2) return null;
            x /= 2, y /= 2;
            var x2 = x * x, y2 = y * y, t = 2 * y / (1 + x2 + y2);
            t = Math.pow((1 + t) / (1 - t), 1 / n);
            return [ Math.atan2(2 * x, 1 - x2 - y2) / n, asin((t - 1) / (t + 1)) ];
        };
        return forward;
    }
    function lagrangeProjection() {
        var n = .5, m = projectionMutator(lagrange), p = m(n);
        p.spacing = function(_) {
            if (!arguments.length) return n;
            return m(n = +_);
        };
        return p;
    }
    (d3.geo.lagrange = lagrangeProjection).raw = lagrange;
    function larrivee(λ, φ) {
        return [ λ * (1 + Math.sqrt(Math.cos(φ))) / 2, φ / (Math.cos(φ / 2) * Math.cos(λ / 6)) ];
    }
    larrivee.invert = function(x, y) {
        var x0 = Math.abs(x), y0 = Math.abs(y), π_sqrt2 = π / Math.SQRT2, λ = ε, φ = π / 2;
        if (y0 < π_sqrt2) φ *= y0 / π_sqrt2; else λ += 6 * acos(π_sqrt2 / y0);
        for (var i = 0; i < 25; i++) {
            var sinφ = Math.sin(φ), sqrtcosφ = asqrt(Math.cos(φ)), sinφ_2 = Math.sin(φ / 2), cosφ_2 = Math.cos(φ / 2), sinλ_6 = Math.sin(λ / 6), cosλ_6 = Math.cos(λ / 6), f0 = .5 * λ * (1 + sqrtcosφ) - x0, f1 = φ / (cosφ_2 * cosλ_6) - y0, df0dφ = sqrtcosφ ? -.25 * λ * sinφ / sqrtcosφ : 0, df0dλ = .5 * (1 + sqrtcosφ), df1dφ = (1 + .5 * φ * sinφ_2 / cosφ_2) / (cosφ_2 * cosλ_6), df1dλ = φ / cosφ_2 * (sinλ_6 / 6) / (cosλ_6 * cosλ_6), denom = df0dφ * df1dλ - df1dφ * df0dλ, dφ = (f0 * df1dλ - f1 * df0dλ) / denom, dλ = (f1 * df0dφ - f0 * df1dφ) / denom;
            φ -= dφ;
            λ -= dλ;
            if (Math.abs(dφ) < ε && Math.abs(dλ) < ε) break;
        }
        return [ x < 0 ? -λ : λ, y < 0 ? -φ : φ ];
    };
    (d3.geo.larrivee = function() {
        return projection(larrivee);
    }).raw = larrivee;
    function laskowski(λ, φ) {
        var λ2 = λ * λ, φ2 = φ * φ;
        return [ λ * (.975534 + φ2 * (-.119161 + λ2 * -.0143059 + φ2 * -.0547009)), φ * (1.00384 + λ2 * (.0802894 + φ2 * -.02855 + λ2 * 199025e-9) + φ2 * (.0998909 + φ2 * -.0491032)) ];
    }
    laskowski.invert = function(x, y) {
        var λ = sgn(x) * π, φ = y / 2, i = 50;
        do {
            var λ2 = λ * λ, φ2 = φ * φ, λφ = λ * φ, fx = λ * (.975534 + φ2 * (-.119161 + λ2 * -.0143059 + φ2 * -.0547009)) - x, fy = φ * (1.00384 + λ2 * (.0802894 + φ2 * -.02855 + λ2 * 199025e-9) + φ2 * (.0998909 + φ2 * -.0491032)) - y, δxδλ = .975534 - φ2 * (.119161 + 3 * λ2 * .0143059 + φ2 * .0547009), δxδφ = -λφ * (2 * .119161 + 4 * .0547009 * φ2 + 2 * .0143059 * λ2), δyδλ = λφ * (2 * .0802894 + 4 * 199025e-9 * λ2 + 2 * -.02855 * φ2), δyδφ = 1.00384 + λ2 * (.0802894 + 199025e-9 * λ2) + φ2 * (3 * (.0998909 - .02855 * λ2) - 5 * .0491032 * φ2), denominator = δxδφ * δyδλ - δyδφ * δxδλ, δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
            λ -= δλ, φ -= δφ;
        } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
        return i && [ λ, φ ];
    };
    (d3.geo.laskowski = function() {
        return projection(laskowski);
    }).raw = laskowski;
    function littrow(λ, φ) {
        return [ Math.sin(λ) / Math.cos(φ), Math.tan(φ) * Math.cos(λ) ];
    }
    littrow.invert = function(x, y) {
        var x2 = x * x, y2 = y * y, y2_1 = y2 + 1, cosφ = x ? Math.SQRT1_2 * Math.sqrt((y2_1 - Math.sqrt(x2 * x2 + 2 * x2 * (y2 - 1) + y2_1 * y2_1)) / x2 + 1) : 1 / Math.sqrt(y2_1);
        return [ asin(x * cosφ), sgn(y) * acos(cosφ) ];
    };
    (d3.geo.littrow = function() {
        return projection(littrow);
    }).raw = littrow;
    function loximuthal(φ0) {
        var cosφ0 = Math.cos(φ0), tanφ0 = Math.tan(π / 4 + φ0 / 2);
        function forward(λ, φ) {
            var y = φ - φ0, x = Math.abs(y) < ε ? λ * cosφ0 : Math.abs(x = π / 4 + φ / 2) < ε || Math.abs(Math.abs(x) - π / 2) < ε ? 0 : λ * y / Math.log(Math.tan(x) / tanφ0);
            return [ x, y ];
        }
        forward.invert = function(x, y) {
            var λ, φ = y + φ0;
            return [ Math.abs(y) < ε ? x / cosφ0 : Math.abs(λ = π / 4 + φ / 2) < ε || Math.abs(Math.abs(λ) - π / 2) < ε ? 0 : x * Math.log(Math.tan(λ) / tanφ0) / y, φ ];
        };
        return forward;
    }
    (d3.geo.loximuthal = function() {
        return parallel1Projection(loximuthal).parallel(40);
    }).raw = loximuthal;
    function miller(λ, φ) {
        return [ λ, 1.25 * Math.log(Math.tan(π / 4 + .4 * φ)) ];
    }
    miller.invert = function(x, y) {
        return [ x, 2.5 * Math.atan(Math.exp(.8 * y)) - .625 * π ];
    };
    (d3.geo.miller = function() {
        return projection(miller);
    }).raw = miller;
    function modifiedStereographic(C) {
        var m = C.length - 1;
        function forward(λ, φ) {
            var cosφ = Math.cos(φ), k = 2 / (1 + cosφ * Math.cos(λ)), zr = k * cosφ * Math.sin(λ), zi = k * Math.sin(φ), i = m, w = C[i], ar = w[0], ai = w[1], t;
            while (--i >= 0) {
                w = C[i];
                ar = w[0] + zr * (t = ar) - zi * ai;
                ai = w[1] + zr * ai + zi * t;
            }
            ar = zr * (t = ar) - zi * ai;
            ai = zr * ai + zi * t;
            return [ ar, ai ];
        }
        forward.invert = function(x, y) {
            var i = 20, zr = x, zi = y;
            do {
                var j = m, w = C[j], ar = w[0], ai = w[1], br = 0, bi = 0, t;
                while (--j >= 0) {
                    w = C[j];
                    br = ar + zr * (t = br) - zi * bi;
                    bi = ai + zr * bi + zi * t;
                    ar = w[0] + zr * (t = ar) - zi * ai;
                    ai = w[1] + zr * ai + zi * t;
                }
                br = ar + zr * (t = br) - zi * bi;
                bi = ai + zr * bi + zi * t;
                ar = zr * (t = ar) - zi * ai - x;
                ai = zr * ai + zi * t - y;
                var denominator = br * br + bi * bi, δr, δi;
                zr -= δr = (ar * br + ai * bi) / denominator;
                zi -= δi = (ai * br - ar * bi) / denominator;
            } while (Math.abs(δr) + Math.abs(δi) > ε * ε && --i > 0);
            if (i) {
                var ρ = Math.sqrt(zr * zr + zi * zi), c = 2 * Math.atan(ρ * .5), sinc = Math.sin(c);
                return [ Math.atan2(zr * sinc, ρ * Math.cos(c)), ρ ? asin(zi * sinc / ρ) : 0 ];
            }
        };
        return forward;
    }
    var modifiedStereographicCoefficients = {
        alaska: [ [ .9972523, 0 ], [ .0052513, -.0041175 ], [ .0074606, .0048125 ], [ -.0153783, -.1968253 ], [ .0636871, -.1408027 ], [ .3660976, -.2937382 ] ],
        gs48: [ [ .98879, 0 ], [ 0, 0 ], [ -.050909, 0 ], [ 0, 0 ], [ .075528, 0 ] ],
        gs50: [ [ .984299, 0 ], [ .0211642, .0037608 ], [ -.1036018, -.0575102 ], [ -.0329095, -.0320119 ], [ .0499471, .1223335 ], [ .026046, .0899805 ], [ 7388e-7, -.1435792 ], [ .0075848, -.1334108 ], [ -.0216473, .0776645 ], [ -.0225161, .0853673 ] ],
        miller: [ [ .9245, 0 ], [ 0, 0 ], [ .01943, 0 ] ],
        lee: [ [ .721316, 0 ], [ 0, 0 ], [ -.00881625, -.00617325 ] ]
    };
    function modifiedStereographicProjection() {
        var coefficients = modifiedStereographicCoefficients.miller, m = projectionMutator(modifiedStereographic), p = m(coefficients);
        p.coefficients = function(_) {
            if (!arguments.length) return coefficients;
            return m(coefficients = typeof _ === "string" ? modifiedStereographicCoefficients[_] : _);
        };
        return p;
    }
    (d3.geo.modifiedStereographic = modifiedStereographicProjection).raw = modifiedStereographic;
    function mtFlatPolarParabolic(λ, φ) {
        var sqrt6 = Math.sqrt(6), sqrt7 = Math.sqrt(7), θ = Math.asin(7 * Math.sin(φ) / (3 * sqrt6));
        return [ sqrt6 * λ * (2 * Math.cos(2 * θ / 3) - 1) / sqrt7, 9 * Math.sin(θ / 3) / sqrt7 ];
    }
    mtFlatPolarParabolic.invert = function(x, y) {
        var sqrt6 = Math.sqrt(6), sqrt7 = Math.sqrt(7), θ = 3 * asin(y * sqrt7 / 9);
        return [ x * sqrt7 / (sqrt6 * (2 * Math.cos(2 * θ / 3) - 1)), asin(Math.sin(θ) * 3 * sqrt6 / 7) ];
    };
    (d3.geo.mtFlatPolarParabolic = function() {
        return projection(mtFlatPolarParabolic);
    }).raw = mtFlatPolarParabolic;
    function mtFlatPolarQuartic(λ, φ) {
        var k = (1 + Math.SQRT1_2) * Math.sin(φ), θ = φ;
        for (var i = 0, δ; i < 25; i++) {
            θ -= δ = (Math.sin(θ / 2) + Math.sin(θ) - k) / (.5 * Math.cos(θ / 2) + Math.cos(θ));
            if (Math.abs(δ) < ε) break;
        }
        return [ λ * (1 + 2 * Math.cos(θ) / Math.cos(θ / 2)) / (3 * Math.SQRT2), 2 * Math.sqrt(3) * Math.sin(θ / 2) / Math.sqrt(2 + Math.SQRT2) ];
    }
    mtFlatPolarQuartic.invert = function(x, y) {
        var sinθ_2 = y * Math.sqrt(2 + Math.SQRT2) / (2 * Math.sqrt(3)), θ = 2 * asin(sinθ_2);
        return [ 3 * Math.SQRT2 * x / (1 + 2 * Math.cos(θ) / Math.cos(θ / 2)), asin((sinθ_2 + Math.sin(θ)) / (1 + Math.SQRT1_2)) ];
    };
    (d3.geo.mtFlatPolarQuartic = function() {
        return projection(mtFlatPolarQuartic);
    }).raw = mtFlatPolarQuartic;
    function mtFlatPolarSinusoidal(λ, φ) {
        var A = Math.sqrt(6 / (4 + π)), k = (1 + π / 4) * Math.sin(φ), θ = φ / 2;
        for (var i = 0, δ; i < 25; i++) {
            θ -= δ = (θ / 2 + Math.sin(θ) - k) / (.5 + Math.cos(θ));
            if (Math.abs(δ) < ε) break;
        }
        return [ A * (.5 + Math.cos(θ)) * λ / 1.5, A * θ ];
    }
    mtFlatPolarSinusoidal.invert = function(x, y) {
        var A = Math.sqrt(6 / (4 + π)), θ = y / A;
        if (Math.abs(Math.abs(θ) - π / 2) < ε) θ = θ < 0 ? -π / 2 : π / 2;
        return [ 1.5 * x / (A * (.5 + Math.cos(θ))), asin((θ / 2 + Math.sin(θ)) / (1 + π / 4)) ];
    };
    (d3.geo.mtFlatPolarSinusoidal = function() {
        return projection(mtFlatPolarSinusoidal);
    }).raw = mtFlatPolarSinusoidal;
    function naturalEarth(λ, φ) {
        var φ2 = φ * φ, φ4 = φ2 * φ2;
        return [ λ * (.8707 - .131979 * φ2 + φ4 * (-.013791 + φ4 * (.003971 * φ2 - .001529 * φ4))), φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) ];
    }
    naturalEarth.invert = function(x, y) {
        var φ = y, i = 25, δ;
        do {
            var φ2 = φ * φ, φ4 = φ2 * φ2;
            φ -= δ = (φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) - y) / (1.007226 + φ2 * (.015085 * 3 + φ4 * (-.044475 * 7 + .028874 * 9 * φ2 - .005916 * 11 * φ4)));
        } while (Math.abs(δ) > ε && --i > 0);
        return [ x / (.8707 + (φ2 = φ * φ) * (-.131979 + φ2 * (-.013791 + φ2 * φ2 * φ2 * (.003971 - .001529 * φ2)))), φ ];
    };
    (d3.geo.naturalEarth = function() {
        return projection(naturalEarth);
    }).raw = naturalEarth;
    function nellHammer(λ, φ) {
        return [ λ * (1 + Math.cos(φ)) / 2, 2 * (φ - Math.tan(φ / 2)) ];
    }
    nellHammer.invert = function(x, y) {
        var p = y / 2;
        for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
            var c = Math.cos(y / 2);
            y -= δ = (y - Math.tan(y / 2) - p) / (1 - .5 / (c * c));
        }
        return [ 2 * x / (1 + Math.cos(y)), y ];
    };
    (d3.geo.nellHammer = function() {
        return projection(nellHammer);
    }).raw = nellHammer;
    var peirceQuincuncialProjection = quincuncialProjection(guyou);
    (d3.geo.peirceQuincuncial = function() {
        return peirceQuincuncialProjection().quincuncial(true).rotate([ -90, -90, 45 ]).clipAngle(180 - 1e-6);
    }).raw = peirceQuincuncialProjection.raw;
    function polyconic(λ, φ) {
        if (Math.abs(φ) < ε) return [ λ, 0 ];
        var tanφ = Math.tan(φ), k = λ * Math.sin(φ);
        return [ Math.sin(k) / tanφ, φ + (1 - Math.cos(k)) / tanφ ];
    }
    polyconic.invert = function(x, y) {
        if (Math.abs(y) < ε) return [ x, 0 ];
        var k = x * x + y * y, φ = y * .5, i = 10, δ;
        do {
            var tanφ = Math.tan(φ), secφ = 1 / Math.cos(φ), j = k - 2 * y * φ + φ * φ;
            φ -= δ = (tanφ * j + 2 * (φ - y)) / (2 + j * secφ * secφ + 2 * (φ - y) * tanφ);
        } while (Math.abs(δ) > ε && --i > 0);
        tanφ = Math.tan(φ);
        return [ (Math.abs(y) < Math.abs(φ + 1 / tanφ) ? asin(x * tanφ) : sgn(x) * (acos(Math.abs(x * tanφ)) + π / 2)) / Math.sin(φ), φ ];
    };
    (d3.geo.polyconic = function() {
        return projection(polyconic);
    }).raw = polyconic;
    function rectangularPolyconic(φ0) {
        var sinφ0 = Math.sin(φ0);
        function forward(λ, φ) {
            var A = sinφ0 ? Math.tan(λ * sinφ0 / 2) / sinφ0 : λ / 2;
            if (!φ) return [ 2 * A, -φ0 ];
            var E = 2 * Math.atan(A * Math.sin(φ)), cotφ = 1 / Math.tan(φ);
            return [ Math.sin(E) * cotφ, φ + (1 - Math.cos(E)) * cotφ - φ0 ];
        }
        forward.invert = function(x, y) {
            if (Math.abs(y += φ0) < ε) return [ sinφ0 ? 2 * Math.atan(sinφ0 * x / 2) / sinφ0 : x, 0 ];
            var k = x * x + y * y, φ = 0, i = 10, δ;
            do {
                var tanφ = Math.tan(φ), secφ = 1 / Math.cos(φ), j = k - 2 * y * φ + φ * φ;
                φ -= δ = (tanφ * j + 2 * (φ - y)) / (2 + j * secφ * secφ + 2 * (φ - y) * tanφ);
            } while (Math.abs(δ) > ε && --i > 0);
            var E = x * (tanφ = Math.tan(φ)), A = Math.tan(Math.abs(y) < Math.abs(φ + 1 / tanφ) ? asin(E) * .5 : acos(E) * .5 + π / 4) / Math.sin(φ);
            return [ sinφ0 ? 2 * Math.atan(sinφ0 * A) / sinφ0 : 2 * A, φ ];
        };
        return forward;
    }
    (d3.geo.rectangularPolyconic = function() {
        return parallel1Projection(rectangularPolyconic);
    }).raw = rectangularPolyconic;
    var robinsonConstants = [ [ .9986, -.062 ], [ 1, 0 ], [ .9986, .062 ], [ .9954, .124 ], [ .99, .186 ], [ .9822, .248 ], [ .973, .31 ], [ .96, .372 ], [ .9427, .434 ], [ .9216, .4958 ], [ .8962, .5571 ], [ .8679, .6176 ], [ .835, .6769 ], [ .7986, .7346 ], [ .7597, .7903 ], [ .7186, .8435 ], [ .6732, .8936 ], [ .6213, .9394 ], [ .5722, .9761 ], [ .5322, 1 ] ];
    robinsonConstants.forEach(function(d) {
        d[1] *= 1.0144;
    });
    function robinson(λ, φ) {
        var i = Math.min(18, Math.abs(φ) * 36 / π), i0 = Math.floor(i), di = i - i0, ax = (k = robinsonConstants[i0])[0], ay = k[1], bx = (k = robinsonConstants[++i0])[0], by = k[1], cx = (k = robinsonConstants[Math.min(19, ++i0)])[0], cy = k[1], k;
        return [ λ * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), (φ > 0 ? π : -π) / 2 * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) ];
    }
    robinson.invert = function(x, y) {
        var yy = 2 * y / π, φ = yy * 90, i = Math.min(18, Math.abs(φ / 5)), i0 = Math.max(0, Math.floor(i));
        do {
            var ay = robinsonConstants[i0][1], by = robinsonConstants[i0 + 1][1], cy = robinsonConstants[Math.min(19, i0 + 2)][1], u = cy - ay, v = cy - 2 * by + ay, t = 2 * (Math.abs(yy) - by) / u, c = v / u, di = t * (1 - c * t * (1 - 2 * c * t));
            if (di >= 0 || i0 === 1) {
                φ = (y >= 0 ? 5 : -5) * (di + i);
                var j = 50, δ;
                do {
                    i = Math.min(18, Math.abs(φ) / 5);
                    i0 = Math.floor(i);
                    di = i - i0;
                    ay = robinsonConstants[i0][1];
                    by = robinsonConstants[i0 + 1][1];
                    cy = robinsonConstants[Math.min(19, i0 + 2)][1];
                    φ -= (δ = (y >= 0 ? π : -π) / 2 * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y) * degrees;
                } while (Math.abs(δ) > ε2 && --j > 0);
                break;
            }
        } while (--i0 >= 0);
        var ax = robinsonConstants[i0][0], bx = robinsonConstants[i0 + 1][0], cx = robinsonConstants[Math.min(19, i0 + 2)][0];
        return [ x / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), φ * radians ];
    };
    (d3.geo.robinson = function() {
        return projection(robinson);
    }).raw = robinson;
    function satelliteVertical(P) {
        function forward(λ, φ) {
            var cosφ = Math.cos(φ), k = (P - 1) / (P - cosφ * Math.cos(λ));
            return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
        }
        forward.invert = function(x, y) {
            var ρ2 = x * x + y * y, ρ = Math.sqrt(ρ2), sinc = (P - Math.sqrt(1 - ρ2 * (P + 1) / (P - 1))) / ((P - 1) / ρ + ρ / (P - 1));
            return [ Math.atan2(x * sinc, ρ * Math.sqrt(1 - sinc * sinc)), ρ ? asin(y * sinc / ρ) : 0 ];
        };
        return forward;
    }
    function satellite(P, ω) {
        var vertical = satelliteVertical(P);
        if (!ω) return vertical;
        var cosω = Math.cos(ω), sinω = Math.sin(ω);
        function forward(λ, φ) {
            var coordinates = vertical(λ, φ), y = coordinates[1], A = y * sinω / (P - 1) + cosω;
            return [ coordinates[0] * cosω / A, y / A ];
        }
        forward.invert = function(x, y) {
            var k = (P - 1) / (P - 1 - y * sinω);
            return vertical.invert(k * x, k * y * cosω);
        };
        return forward;
    }
    function satelliteProjection() {
        var P = 1.4, ω = 0, m = projectionMutator(satellite), p = m(P, ω);
        p.distance = function(_) {
            if (!arguments.length) return P;
            return m(P = +_, ω);
        };
        p.tilt = function(_) {
            if (!arguments.length) return ω * 180 / π;
            return m(P, ω = _ * π / 180);
        };
        return p;
    }
    (d3.geo.satellite = satelliteProjection).raw = satellite;
    function times(λ, φ) {
        var t = Math.tan(φ / 2), s = Math.sin(π / 4 * t);
        return [ λ * (.74482 - .34588 * s * s), 1.70711 * t ];
    }
    times.invert = function(x, y) {
        var t = y / 1.70711, s = Math.sin(π / 4 * t);
        return [ x / (.74482 - .34588 * s * s), 2 * Math.atan(t) ];
    };
    (d3.geo.times = function() {
        return projection(times);
    }).raw = times;
    function twoPointAzimuthal(d) {
        var cosd = Math.cos(d);
        function forward(λ, φ) {
            var coordinates = d3.geo.gnomonic.raw(λ, φ);
            coordinates[0] *= cosd;
            return coordinates;
        }
        forward.invert = function(x, y) {
            return d3.geo.gnomonic.raw.invert(x / cosd, y);
        };
        return forward;
    }
    function twoPointAzimuthalProjection() {
        var points = [ [ 0, 0 ], [ 0, 0 ] ], m = projectionMutator(twoPointAzimuthal), p = m(0), rotate = p.rotate;
        delete p.rotate;
        p.points = function(_) {
            if (!arguments.length) return points;
            points = _;
            var interpolate = d3.geo.interpolate(_[0], _[1]), origin = interpolate(.5), p = twoPointEquidistant_rotate(-origin[0] * radians, -origin[1] * radians, _[0][0] * radians, _[0][1] * radians), b = interpolate.distance * .5, c = (p[0] < 0 ? -1 : +1) * p[1], γ = asin(Math.sin(c) / Math.sin(b));
            rotate.call(p, [ -origin[0], -origin[1], -γ * degrees ]);
            return m(b);
        };
        return p;
    }
    (d3.geo.twoPointAzimuthal = twoPointAzimuthalProjection).raw = twoPointAzimuthal;
    function twoPointEquidistant(z0) {
        if (!z0) return d3.geo.azimuthalEquidistant.raw;
        var λa = -z0 / 2, λb = -λa, z02 = z0 * z0, tanλ0 = Math.tan(λb), S = .5 / Math.sin(λb);
        function forward(λ, φ) {
            var za = acos(Math.cos(φ) * Math.cos(λ - λa)), zb = acos(Math.cos(φ) * Math.cos(λ - λb)), ys = φ < 0 ? -1 : 1;
            za *= za, zb *= zb;
            return [ (za - zb) / (2 * z0), ys * asqrt(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0) ];
        }
        forward.invert = function(x, y) {
            var y2 = y * y, cosza = Math.cos(Math.sqrt(y2 + (t = x + λa) * t)), coszb = Math.cos(Math.sqrt(y2 + (t = x + λb) * t)), t, d;
            return [ Math.atan2(d = cosza - coszb, t = (cosza + coszb) * tanλ0), (y < 0 ? -1 : 1) * acos(Math.sqrt(t * t + d * d) * S) ];
        };
        return forward;
    }
    function twoPointEquidistantProjection() {
        var points = [ [ 0, 0 ], [ 0, 0 ] ], m = projectionMutator(twoPointEquidistant), p = m(0), rotate = p.rotate;
        delete p.rotate;
        p.points = function(_) {
            if (!arguments.length) return points;
            points = _;
            var interpolate = d3.geo.interpolate(_[0], _[1]), origin = interpolate(.5), p = twoPointEquidistant_rotate(-origin[0] * radians, -origin[1] * radians, _[0][0] * radians, _[0][1] * radians), b = interpolate.distance * .5, c = (p[0] < 0 ? -1 : +1) * p[1], γ = asin(Math.sin(c) / Math.sin(b));
            rotate.call(p, [ -origin[0], -origin[1], -γ * degrees ]);
            return m(b * 2);
        };
        return p;
    }
    function twoPointEquidistant_rotate(δλ, δφ, λ, φ) {
        var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosφ = Math.cos(φ), x = Math.cos(λ += δλ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ);
        return [ Math.atan2(y, x * cosδφ - z * sinδφ), asin(z * cosδφ + x * sinδφ) ];
    }
    (d3.geo.twoPointEquidistant = twoPointEquidistantProjection).raw = twoPointEquidistant;
    function vanDerGrinten(λ, φ) {
        if (Math.abs(φ) < ε) return [ λ, 0 ];
        var sinθ = Math.abs(2 * φ / π), θ = asin(sinθ);
        if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - π / 2) < ε) return [ 0, sgn(φ) * π * Math.tan(θ / 2) ];
        var cosθ = Math.cos(θ), A = Math.abs(π / λ - λ / π) / 2, A2 = A * A, G = cosθ / (sinθ + cosθ - 1), P = G * (2 / sinθ - 1), P2 = P * P, P2_A2 = P2 + A2, G_P2 = G - P2, Q = A2 + G;
        return [ sgn(λ) * π * (A * G_P2 + Math.sqrt(A2 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2, sgn(φ) * π * (P * Q - A * Math.sqrt((A2 + 1) * P2_A2 - Q * Q)) / P2_A2 ];
    }
    vanDerGrinten.invert = function(x, y) {
        if (Math.abs(y) < ε) return [ x, 0 ];
        if (Math.abs(x) < ε) return [ 0, π / 2 * Math.sin(2 * Math.atan(y / π)) ];
        var x2 = (x /= π) * x, y2 = (y /= π) * y, x2_y2 = x2 + y2, z = x2_y2 * x2_y2, c1 = -Math.abs(y) * (1 + x2_y2), c2 = c1 - 2 * y2 + x2, c3 = -2 * c1 + 1 + 2 * y2 + z, d = y2 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27, a1 = (c1 - c2 * c2 / (3 * c3)) / c3, m1 = 2 * Math.sqrt(-a1 / 3), θ1 = acos(3 * d / (a1 * m1)) / 3;
        return [ π * (x2_y2 - 1 + Math.sqrt(1 + 2 * (x2 - y2) + z)) / (2 * x), sgn(y) * π * (-m1 * Math.cos(θ1 + π / 3) - c2 / (3 * c3)) ];
    };
    (d3.geo.vanDerGrinten = function() {
        return projection(vanDerGrinten);
    }).raw = vanDerGrinten;
    function vanDerGrinten2(λ, φ) {
        if (Math.abs(φ) < ε) return [ λ, 0 ];
        var sinθ = Math.abs(2 * φ / π), θ = asin(sinθ);
        if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - π / 2) < ε) return [ 0, sgn(φ) * π * Math.tan(θ / 2) ];
        var cosθ = Math.cos(θ), A = Math.abs(π / λ - λ / π) / 2, A2 = A * A, x1 = cosθ * (Math.sqrt(1 + A2) - A * cosθ) / (1 + A2 * sinθ * sinθ);
        return [ sgn(λ) * π * x1, sgn(φ) * π * asqrt(1 - x1 * (2 * A + x1)) ];
    }
    vanDerGrinten2.invert = function(x, y) {
        if (!x) return [ 0, π / 2 * Math.sin(2 * Math.atan(y / π)) ];
        var x1 = Math.abs(x / π), A = (1 - x1 * x1 - (y /= π) * y) / (2 * x1), A2 = A * A, B = Math.sqrt(A2 + 1);
        return [ sgn(x) * π * (B - A), sgn(y) * π / 2 * Math.sin(2 * Math.atan2(Math.sqrt((1 - 2 * A * x1) * (A + B) - x1), Math.sqrt(B + A + x1))) ];
    };
    (d3.geo.vanDerGrinten2 = function() {
        return projection(vanDerGrinten2);
    }).raw = vanDerGrinten2;
    function vanDerGrinten3(λ, φ) {
        if (Math.abs(φ) < ε) return [ λ, 0 ];
        var sinθ = 2 * φ / π, θ = asin(sinθ);
        if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - π / 2) < ε) return [ 0, π * Math.tan(θ / 2) ];
        var A = (π / λ - λ / π) / 2, y1 = sinθ / (1 + Math.cos(θ));
        return [ π * (sgn(λ) * asqrt(A * A + 1 - y1 * y1) - A), π * y1 ];
    }
    vanDerGrinten3.invert = function(x, y) {
        if (!y) return [ x, 0 ];
        var y1 = y / π, A = (π * π * (1 - y1 * y1) - x * x) / (2 * π * x);
        return [ x ? π * (sgn(x) * Math.sqrt(A * A + 1) - A) : 0, π / 2 * Math.sin(2 * Math.atan(y1)) ];
    };
    (d3.geo.vanDerGrinten3 = function() {
        return projection(vanDerGrinten3);
    }).raw = vanDerGrinten3;
    function vanDerGrinten4(λ, φ) {
        if (!φ) return [ λ, 0 ];
        var φ0 = Math.abs(φ);
        if (!λ || φ0 === π / 2) return [ 0, φ ];
        var B = 2 * φ0 / π, B2 = B * B, C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)), C2 = C * C, BC = B * C, B_C2 = B2 + C2 + 2 * BC, B_3C = B + 3 * C, λ0 = 2 * λ / π, λ1 = λ0 + 1 / λ0, D = sgn(Math.abs(λ) - π / 2) * Math.sqrt(λ1 * λ1 - 4), D2 = D * D, F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + 12 * BC * C2 + 4 * C2 * C2), x1 = (D * (B_C2 + C2 - 1) + 2 * asqrt(F)) / (4 * B_C2 + D2);
        return [ sgn(λ) * π * x1 / 2, sgn(φ) * π / 2 * asqrt(1 + D * Math.abs(x1) - x1 * x1) ];
    }
    vanDerGrinten4.invert = function(x, y) {
        if (!x || !y) return [ x, y ];
        y /= π;
        var x1 = sgn(x) * x * 2 / π, D = (x1 * x1 - 1 + 4 * y * y) / Math.abs(x1), D2 = D * D, B = 2 * y, i = 50;
        do {
            var B2 = B * B, C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)), C_ = (3 * B - B2 * B - 10) / (2 * B2 * B), C2 = C * C, BC = B * C, B_C = B + C, B_C2 = B_C * B_C, B_3C = B + 3 * C, F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + C2 * (12 * BC + 4 * C2)), F_ = -2 * B_C * (4 * BC * C2 + (1 - 4 * B2 + 3 * B2 * B2) * (1 + C_) + C2 * (-6 + 14 * B2 - D2 + (-8 + 8 * B2 - 2 * D2) * C_) + BC * (-8 + 12 * B2 + (-10 + 10 * B2 - D2) * C_)), sqrtF = Math.sqrt(F), f = D * (B_C2 + C2 - 1) + 2 * sqrtF - x1 * (4 * B_C2 + D2), f_ = D * (2 * C * C_ + 2 * B_C * (1 + C_)) + F_ / sqrtF - 8 * B_C * (D * (-1 + C2 + B_C2) + 2 * sqrtF) * (1 + C_) / (D2 + 4 * B_C2);
            B -= δ = f / f_;
        } while (δ > ε && --i > 0);
        return [ sgn(x) * (Math.sqrt(D * D + 4) + D) * π / 4, π / 2 * B ];
    };
    (d3.geo.vanDerGrinten4 = function() {
        return projection(vanDerGrinten4);
    }).raw = vanDerGrinten4;
    var wagner4 = function() {
        var A = 4 * π + 3 * Math.sqrt(3), B = 2 * Math.sqrt(2 * π * Math.sqrt(3) / A);
        return mollweideBromley(B * Math.sqrt(3) / π, B, A / 6);
    }();
    (d3.geo.wagner4 = function() {
        return projection(wagner4);
    }).raw = wagner4;
    function wagner6(λ, φ) {
        return [ λ * Math.sqrt(1 - 3 * φ * φ / (π * π)), φ ];
    }
    wagner6.invert = function(x, y) {
        return [ x / Math.sqrt(1 - 3 * y * y / (π * π)), y ];
    };
    (d3.geo.wagner6 = function() {
        return projection(wagner6);
    }).raw = wagner6;
    function wagner7(λ, φ) {
        var s = .90631 * Math.sin(φ), c0 = Math.sqrt(1 - s * s), c1 = Math.sqrt(2 / (1 + c0 * Math.cos(λ /= 3)));
        return [ 2.66723 * c0 * c1 * Math.sin(λ), 1.24104 * s * c1 ];
    }
    wagner7.invert = function(x, y) {
        var t1 = x / 2.66723, t2 = y / 1.24104, p = Math.sqrt(t1 * t1 + t2 * t2), c = 2 * asin(p / 2);
        return [ 3 * Math.atan2(x * Math.tan(c), 2.66723 * p), p && asin(y * Math.sin(c) / (1.24104 * .90631 * p)) ];
    };
    (d3.geo.wagner7 = function() {
        return projection(wagner7);
    }).raw = wagner7;
    function wiechel(λ, φ) {
        var cosφ = Math.cos(φ), sinφ = Math.cos(λ) * cosφ, sin1_φ = 1 - sinφ, cosλ = Math.cos(λ = Math.atan2(Math.sin(λ) * cosφ, -Math.sin(φ))), sinλ = Math.sin(λ);
        cosφ = asqrt(1 - sinφ * sinφ);
        return [ sinλ * cosφ - cosλ * sin1_φ, -cosλ * cosφ - sinλ * sin1_φ ];
    }
    wiechel.invert = function(x, y) {
        var w = -.5 * (x * x + y * y), k = Math.sqrt(-w * (2 + w)), b = y * w + x * k, a = x * w - y * k, D = Math.sqrt(a * a + b * b);
        return [ Math.atan2(k * b, D * (1 + w)), D ? -asin(k * a / D) : 0 ];
    };
    (d3.geo.wiechel = function() {
        return projection(wiechel);
    }).raw = wiechel;
    function winkel3(λ, φ) {
        var coordinates = aitoff(λ, φ);
        return [ (coordinates[0] + λ * 2 / π) / 2, (coordinates[1] + φ) / 2 ];
    }
    winkel3.invert = function(x, y) {
        var λ = x, φ = y, i = 25;
        do {
            var cosφ = Math.cos(φ), sinφ = Math.sin(φ), sin_2φ = Math.sin(2 * φ), sin2φ = sinφ * sinφ, cos2φ = cosφ * cosφ, sinλ = Math.sin(λ), cosλ_2 = Math.cos(λ / 2), sinλ_2 = Math.sin(λ / 2), sin2λ_2 = sinλ_2 * sinλ_2, C = 1 - cos2φ * cosλ_2 * cosλ_2, E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0, F, fx = .5 * (2 * E * cosφ * sinλ_2 + λ * 2 / π) - x, fy = .5 * (E * sinφ + φ) - y, δxδλ = .5 * F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ) + .5 * 2 / π, δxδφ = F * (sinλ * sin_2φ / 4 - E * sinφ * sinλ_2), δyδλ = .125 * F * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ), δyδφ = .5 * F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ) + .5, denominator = δxδφ * δyδλ - δyδφ * δxδλ, δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
            λ -= δλ, φ -= δφ;
        } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
        return [ λ, φ ];
    };
    (d3.geo.winkel3 = function() {
        return projection(winkel3);
    }).raw = winkel3;
})();

topojson = function() {
    function merge(topology, arcs) {
        var arcsByEnd = {}, fragmentByStart = {}, fragmentByEnd = {};
        arcs.forEach(function(i) {
            var e = ends(i);
            (arcsByEnd[e[0]] || (arcsByEnd[e[0]] = [])).push(i);
            (arcsByEnd[e[1]] || (arcsByEnd[e[1]] = [])).push(~i);
        });
        arcs.forEach(function(i) {
            var e = ends(i), start = e[0], end = e[1], f, g;
            if (f = fragmentByEnd[start]) {
                delete fragmentByEnd[f.end];
                f.push(i);
                f.end = end;
                if (g = fragmentByStart[end]) {
                    delete fragmentByStart[g.start];
                    var fg = g === f ? f : f.concat(g);
                    fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
                } else if (g = fragmentByEnd[end]) {
                    delete fragmentByStart[g.start];
                    delete fragmentByEnd[g.end];
                    var fg = f.concat(g.map(function(i) {
                        return ~i;
                    }).reverse());
                    fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.start] = fg;
                } else {
                    fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
                }
            } else if (f = fragmentByStart[end]) {
                delete fragmentByStart[f.start];
                f.unshift(i);
                f.start = start;
                if (g = fragmentByEnd[start]) {
                    delete fragmentByEnd[g.end];
                    var gf = g === f ? f : g.concat(f);
                    fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
                } else if (g = fragmentByStart[start]) {
                    delete fragmentByStart[g.start];
                    delete fragmentByEnd[g.end];
                    var gf = g.map(function(i) {
                        return ~i;
                    }).reverse().concat(f);
                    fragmentByStart[gf.start = g.end] = fragmentByEnd[gf.end = f.end] = gf;
                } else {
                    fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
                }
            } else if (f = fragmentByStart[start]) {
                delete fragmentByStart[f.start];
                f.unshift(~i);
                f.start = end;
                if (g = fragmentByEnd[end]) {
                    delete fragmentByEnd[g.end];
                    var gf = g === f ? f : g.concat(f);
                    fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
                } else if (g = fragmentByStart[end]) {
                    delete fragmentByStart[g.start];
                    delete fragmentByEnd[g.end];
                    var gf = g.map(function(i) {
                        return ~i;
                    }).reverse().concat(f);
                    fragmentByStart[gf.start = g.end] = fragmentByEnd[gf.end = f.end] = gf;
                } else {
                    fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
                }
            } else if (f = fragmentByEnd[end]) {
                delete fragmentByEnd[f.end];
                f.push(~i);
                f.end = start;
                if (g = fragmentByEnd[start]) {
                    delete fragmentByStart[g.start];
                    var fg = g === f ? f : f.concat(g);
                    fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
                } else if (g = fragmentByStart[start]) {
                    delete fragmentByStart[g.start];
                    delete fragmentByEnd[g.end];
                    var fg = f.concat(g.map(function(i) {
                        return ~i;
                    }).reverse());
                    fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.start] = fg;
                } else {
                    fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
                }
            } else {
                f = [ i ];
                fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
            }
        });
        function ends(i) {
            var arc = topology.arcs[i], p0 = arc[0], p1 = [ 0, 0 ];
            arc.forEach(function(dp) {
                p1[0] += dp[0], p1[1] += dp[1];
            });
            return [ p0, p1 ];
        }
        var fragments = [];
        for (var k in fragmentByEnd) fragments.push(fragmentByEnd[k]);
        return fragments;
    }
    function mesh(topology, o, filter) {
        var arcs = [];
        if (arguments.length > 1) {
            var geomsByArc = [], geom;
            function arc(i) {
                if (i < 0) i = ~i;
                (geomsByArc[i] || (geomsByArc[i] = [])).push(geom);
            }
            function line(arcs) {
                arcs.forEach(arc);
            }
            function polygon(arcs) {
                arcs.forEach(line);
            }
            function geometry(o) {
                if (o.type in geometryType) {
                    geom = o;
                    geometryType[o.type](o.arcs);
                }
            }
            var geometryType = {
                LineString: line,
                MultiLineString: polygon,
                Polygon: polygon,
                MultiPolygon: function(arcs) {
                    arcs.forEach(polygon);
                }
            };
            o.type === "GeometryCollection" ? o.geometries.forEach(geometry) : geometry(o);
            geomsByArc.forEach(arguments.length < 3 ? function(geoms, i) {
                arcs.push([ i ]);
            } : function(geoms, i) {
                if (filter(geoms[0], geoms[geoms.length - 1])) arcs.push([ i ]);
            });
        } else {
            for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push([ i ]);
        }
        return object(topology, {
            type: "MultiLineString",
            arcs: merge(topology, arcs)
        });
    }
    function object(topology, o) {
        var tf = topology.transform, kx = tf.scale[0], ky = tf.scale[1], dx = tf.translate[0], dy = tf.translate[1], arcs = topology.arcs;
        function arc(i, points) {
            if (points.length) points.pop();
            for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, x = 0, y = 0, p; k < n; ++k) points.push([ (x += (p = a[k])[0]) * kx + dx, (y += p[1]) * ky + dy ]);
            if (i < 0) reverse(points, n);
        }
        function point(coordinates) {
            return [ coordinates[0] * kx + dx, coordinates[1] * ky + dy ];
        }
        function line(arcs) {
            var points = [];
            for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
            if (points.length < 2) points.push(points[0]);
            return points;
        }
        function ring(arcs) {
            var points = line(arcs);
            while (points.length < 4) points.push(points[0]);
            return points;
        }
        function polygon(arcs) {
            return arcs.map(ring);
        }
        function geometry(o) {
            var t = o.type, g = t === "GeometryCollection" ? {
                type: t,
                geometries: o.geometries.map(geometry)
            } : t in geometryType ? {
                type: t,
                coordinates: geometryType[t](o)
            } : {
                type: null
            };
            if ("id" in o) g.id = o.id;
            if ("properties" in o) g.properties = o.properties;
            return g;
        }
        var geometryType = {
            Point: function(o) {
                return point(o.coordinates);
            },
            MultiPoint: function(o) {
                return o.coordinates.map(point);
            },
            LineString: function(o) {
                return line(o.arcs);
            },
            MultiLineString: function(o) {
                return o.arcs.map(line);
            },
            Polygon: function(o) {
                return polygon(o.arcs);
            },
            MultiPolygon: function(o) {
                return o.arcs.map(polygon);
            }
        };
        return geometry(o);
    }
    function reverse(array, n) {
        var t, j = array.length, i = j - n;
        while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
    }
    function bisect(a, x) {
        var lo = 0, hi = a.length;
        while (lo < hi) {
            var mid = lo + hi >>> 1;
            if (a[mid] < x) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
    function neighbors(objects) {
        var objectsByArc = [], neighbors = objects.map(function() {
            return [];
        });
        function line(arcs, i) {
            arcs.forEach(function(a) {
                if (a < 0) a = ~a;
                var o = objectsByArc[a] || (objectsByArc[a] = []);
                if (!o[i]) o.forEach(function(j) {
                    var n, k;
                    k = bisect(n = neighbors[i], j);
                    if (n[k] !== j) n.splice(k, 0, j);
                    k = bisect(n = neighbors[j], i);
                    if (n[k] !== i) n.splice(k, 0, i);
                }), o[i] = i;
            });
        }
        function polygon(arcs, i) {
            arcs.forEach(function(arc) {
                line(arc, i);
            });
        }
        function geometry(o, i) {
            if (o.type in geometryType) geometryType[o.type](o.arcs, i);
        }
        var geometryType = {
            LineString: line,
            MultiLineString: polygon,
            Polygon: polygon,
            MultiPolygon: function(arcs, i) {
                arcs.forEach(function(arc) {
                    polygon(arc, i);
                });
            }
        };
        objects.forEach(geometry);
        return neighbors;
    }
    return {
        version: "0.0.22",
        mesh: mesh,
        object: object,
        neighbors: neighbors
    };
}();

(function() {
    if (typeof module === "undefined") self.queue = queue; else module.exports = queue;
    queue.version = "1.0.0";
    function queue(parallelism) {
        var queue = {}, active = 0, remaining = 0, head, tail, error = null, results = [], await = noop, awaitAll;
        if (arguments.length < 1) parallelism = Infinity;
        queue.defer = function() {
            if (!error) {
                var node = arguments;
                node.index = results.push(undefined) - 1;
                if (tail) tail.next = node, tail = tail.next; else head = tail = node;
                ++remaining;
                pop();
            }
            return queue;
        };
        queue.await = function(f) {
            await = f;
            awaitAll = false;
            if (!remaining) notify();
            return queue;
        };
        queue.awaitAll = function(f) {
            await = f;
            awaitAll = true;
            if (!remaining) notify();
            return queue;
        };
        function pop() {
            if (head && active < parallelism) {
                var node = head, f = node[0], a = Array.prototype.slice.call(node, 1), i = node.index;
                if (head === tail) head = tail = null; else head = head.next;
                ++active;
                a.push(function(e, r) {
                    --active;
                    if (error != null) return;
                    if (e != null) {
                        error = e;
                        remaining = results = head = tail = null;
                        notify();
                    } else {
                        results[i] = r;
                        if (--remaining) pop(); else notify();
                    }
                });
                f.apply(null, a);
            }
        }
        function notify() {
            if (error != null) await(error); else if (awaitAll) await(null, results); else await.apply(null, [ null ].concat(results));
        }
        return queue;
    }
    function noop() {}
})();