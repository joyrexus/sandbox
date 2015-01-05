'use strict';
var assert = require('assert');


// Array.some (inefficient since it has to iter over all values)
//
function some(array, tester) {

    return array.reduce(function (memo, value) {
        return memo || tester(value);
    }, false);
}

var result = some([1, 2, 3], function (value) { return value > 2; });
assert.ok(result);


// Array.map
//
function map(array, fn) {

    return array.reduce(function (memo, value) {
        return memo.concat([fn(value)]);
    }, []);
}

map([1, 2, 3], function (value) { return value + 1; });


// Array.filter
//
function filter(array, fn) {

    return array.reduce(function (memo, value) {

        return fn(value) ? memo.concat([value]) : memo;
    }, []);
}

filter([1, 2, 3], function (value) { return value > 1; });


// .length
//
function length(array) {

    return array.reduce(function (length) {
        return ++length;
    }, 0);
}

length([1, 2, 3]);


// zip
//
function zip(arrays) {

    return arrays.reduce(function (acc, arr, i) {

        var j;
        while (acc.length < arr.length) {
            acc.push([]);
        }
        for (j = 0; j < arr.length; ++j) {
            acc[j][i] = arr[j];
        }
        return acc;
    }, []);
}

var result = zip([ ['foo', 'bar'], ['apples', 'grapes'] ]);
var expected = [ ['foo', 'apples'], ['bar', 'grapes'] ];
assert.deepEqual(result, expected);
