#endpoint

> Converts a stream intro a buffer or array of objects

## Installation

```sheel
npm install endpoint
```

## Documentation

`endpoint` is a `WriteStream` there converts a stream to a buffer or an array
of object, it also collectes stream errors from the source.

**Collect a buffer stream intro a single buffer:**

```JavaScript
  var endpoint = require('endpoint');

  BufferStream.pipe(endpoint(function (err, buffer) {
    console.log('error:', err);
    console.log('buffer'; buffer);
  }));
```

**Collect an object stream intro an array of object:**

```JavaScript
  var endpoint = require('endpoint');

  ObjectStream.pipe(endpoint({objectMode: true}, function (err, array) {
    console.log('error:', err);
    console.log('array'; array);
  }));
```

In both situations the currently colllected buffer or array of object can be
accesses by `this.buffer`.

##License

**The software is license under "MIT"**

> Copyright (c) 2012 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
