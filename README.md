# assert-path [![NPM version](https://badge.fury.io/js/assert-path.svg)](http://badge.fury.io/js/assert-path)

> Extends node's assert module with methods for testing filepaths.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i assert-path --save
```

## Usage

```js
var assert = require('assert');
require('assert-path')(assert);
```

## API

* [assert.dirname](#assertdirname)
* [assert.basename](#assertbasename)
* [assert.filename](#assertfilename)
* [assert.extname](#assertextname)
* [assert.path](#assertpath)
* [assert.absolute](#assertabsolute)
* [assert.isAbsolute](#assertisAbsolute)
* [assert.isRelative](#assertisRelative)
* [assert.segments](#assertsegments)
* [assert.lastSegment](#assertlastSegment)

### assert.dirname

Returns true if `path.dirname` of filepath `a` equals filepath `b`.

```js
assert.dirname(a, b);
```

**Example**

```js
assert.dirname('a/b/c.js', 'a/b/c');
//=> true
```

### assert.basename

Returns true if `path.basename` of filepath `a` equals filepath `b`.

```js
assert.basename(a, b);
```

**Example**

```js
assert.basename('a/b/ccc.js', 'ccc.js');
//=> true
```

### assert.filename

Returns true if `path.filename` of filepath `a` equals filepath `b`.

```js
assert.filename(a, b);
```

**Example**

```js
assert.filename('a/b/ccc.js', 'ccc');
//=> true
```

### assert.extname

Returns true if `path.extname` of filepath `a` equals filepath `b`.

```js
assert.extname(a, b);
```

**Example**

```js
assert.extname('a/b/c.js', '.js');
//=> true
```

### assert.path

Returns true if filepath `a` equals filepath `b`.

```js
assert.path(a, b);
```

**Example**

```js
assert.path('a/b/c.js', 'a/b/c.js');
//=> true
```

### assert.absolute

Returns true if `path.resolve(a)` equals `path.resolve(b)`.

```js
assert.absolute(a, b);
```

**Example**

```js
assert.absolute('a/b/c.js', 'a/b/c.js');
//=> true
```

### assert.segments

Returns true if the last `nth` segments of `a` equals the last `nth` segments of `b`. For example, the last 2 segments of `foo/bar/baz/qux.md` would be `baz/qux.md`.

```js
assert.segments(a, b, 2);
```

**Example**

```js
// b/c.js === 'b/c.js'
assert.segments('a/b/c.js', 'a/b/c.js');
//=> true
```

### assert.lastSegments

Returns true if the last `nth` segments of `a` equals `b`.

```js
assert.lastSegments(a, b, 2);
```

**Example**

```js
assert.lastSegments('a/b/c/d/e.js', 'd/e.js', 2);
//=> true
```

### assert.isAbsolute

Returns true if a filepath is absolute.

```js
assert.isAbsolute(filepath);
```

**Example**

```js
assert.isAbsolute('a/b/c.js');
//=> false

assert.isAbsolute(path.resolve('a/b/c.js'));
//=> false
```

### assert.isRelative

Returns true if `path.resolve(a)` equals `path.resolve(b)`.

```js
assert.isRelative(filepath);
```

**Example**

```js
assert.isRelative('a/b/c.js');
//=> true
assert.isRelative(path.resolve('a/b/c.js'));
//=> false
```

## Related projects

* [is-absolute](https://www.npmjs.com/package/is-absolute): Return true if a file path is absolute. | [homepage](https://github.com/jonschlinkert/is-absolute)
* [is-relative](https://www.npmjs.com/package/is-relative): Returns `true` if the path appears to be relative. | [homepage](https://github.com/jonschlinkert/is-relative)
* [normalize-path](https://www.npmjs.com/package/normalize-path): Normalize file path slashes to be unix-like forward slashes. Also condenses repeat slashes to a… [more](https://www.npmjs.com/package/normalize-path) | [homepage](https://github.com/jonschlinkert/normalize-path)
* [relative](https://www.npmjs.com/package/relative): Get the relative filepath from path A to path B. Calculates from file-to-directory, file-to-file, directory-to-file,… [more](https://www.npmjs.com/package/relative) | [homepage](https://github.com/jonschlinkert/relative#readme)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/assert-path/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 08, 2015._