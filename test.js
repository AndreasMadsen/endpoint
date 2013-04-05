
var test = require('tap').test;
var endpoint = require('./endpoint.js');

test('simple write and end', function (t) {
  var point = endpoint(function (err, buffer) {
    t.equal(err, null);

    t.ok(Buffer.isBuffer(buffer));
    t.equal(buffer.toString(), 'hallo world');

    t.ok(Buffer.isBuffer(point.buffer));
    t.equal(point.buffer.toString(), 'hallo world');

    t.end();
  });

  point.write("hallo");
  point.write(" ");
  point.write("world");
  point.end();
});

test('simple error handling', function (t) {
  var fakeError = new Error('error');

  var point = endpoint(function (err, buffer) {
    t.equal(err, fakeError);

    t.ok(Buffer.isBuffer(buffer));
    t.equal(buffer.toString(), 'hallo');

    t.ok(Buffer.isBuffer(point.buffer));
    t.equal(point.buffer.toString(), 'hallo');

    t.end();
  });

  point.write("hallo");
  point.emit('error', fakeError);
  point.end();
});

test('simple write and end', function (t) {
  var point = endpoint({objectMode: true}, function (err, data) {
    t.equal(err, null);

    t.ok(Array.isArray(data));
    t.deepEqual(data, [[1], [2], [3]]);

    t.ok(Array.isArray(point.buffer));
    t.deepEqual(point.buffer, [[1], [2], [3]]);

    t.end();
  });

  point.write([1]);
  point.write([2]);
  point.write([3]);
  point.end();
});
