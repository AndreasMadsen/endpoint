
var stream = require('stream');
var util = require('util');

function Endpoint(options, callback) {
  if (!(this instanceof Endpoint)) return new Endpoint(options, callback);

  // `options` defaults to {}
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  stream.Writable.call(this, options);

  this._objectMode = !!options.objectMode;

  // will keep a long list of buffers
  this._buffers = [];

  // Either finish or error will be used to declar a done state
  function finish() {
    this.removeListener('error', error);
    this.emit('close');

    callback(null, this.buffer);
  }

  function error(err) {
    this.removeListener('finish', finish);
    this.emit('close');

    callback(err, this.buffer);
  }

  this.once('finish', finish);
  this.once('error', error);
}
module.exports = Endpoint;
util.inherits(Endpoint, stream.Writable);

Endpoint.prototype._write = function (data, encodeing, callback) {
  this._buffers.push(data);

  return callback(null);
};

Object.defineProperty(Endpoint.prototype, "buffer", {
  get: function () {
    if (this._objectMode) {
      return this._buffers;
    } else {
      var total = Buffer.concat(this._buffers);
      this._buffers = [ total ];
      return total;
    }
  },
  enumerable: true,
  configurable: true
});
