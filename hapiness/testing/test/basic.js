var Lab = require('lab');
var lab = exports.lab = Lab.script();

lab.test('returns true when 1 + 1 equals 2', function (done) {

    Lab.expect(1+1).to.equal(2);
    Lab.assert.equal(1+1, 3);
    done();
});
