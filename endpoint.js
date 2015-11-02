
var Writable = require('stream').Writable;
var inherits = require('inherits');

function Endpoint(options, callback) {
  if (!(this instanceof Endpoint)) return new Endpoint(options, callback);

  // `options` defaults to {}
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  Writable.call(this, options);
  var self = this;

  this._objectMode = !!options.objectMode;

  // will keep a long list of buffers
  this._buffers = [];

  // Cleanup event listeners
  var sources = [];
  function cleanup() {
    self.removeListener('pipe', onpipe);
    self.removeListener('error', error);
    self.removeListener('finish', finish);
    for (var i = 0, l = sources.length; i < l; i++) {
      sources[i].removeListener('error', error);
    }
  }

  // Either finish or error will be used to declare a done state
  function finish() {
    cleanup();
    callback(null, self.buffer);
  }

  function error(err) {
    cleanup();
    callback(err, self.buffer);
  }

  // Handle errors on source streams
  function onpipe(source) {
    sources.push(source);
    source.once('error', error);
  }
  function onunpipe(source) {
    var index = sources.indexOf(source);
    if (index !== -1) {
      sources.splice(index, 1);
      source.removeListener('error', error);
    }
  }

  this.once('finish', finish);
  this.once('error', error);
  this.on('pipe', onpipe);
  this.on('unpipe', onunpipe);
}
module.exports = Endpoint;
inherits(Endpoint, Writable);

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
