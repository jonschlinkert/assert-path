/*!
 * assert-path <https://github.com/jonschlinkert/assert-path>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var normalize = require('normalize-path');
var path = require('path');

module.exports = function assertPath(assert, options) {
  if (typeof assert === 'undefined') {
    throw new Error('expected assert as the first argument');
  }

  options = options || {};
  function n(fp) {
    if (options.normalize) {
      return normalize(fp);
    }
    return fp;
  }

  function equal(a, b) {
    return assert.strictEqual(a, b);
  }

  assert.dirname = function(fp, dirname) {
    equal(path.dirname(n(fp)), n(dirname));
  };

  assert.basename = function(fp, basename) {
    equal(path.basename(n(fp)), n(basename));
  };

  assert.filename = function(fp, filename) {
    var name = path.basename(n(fp), path.extname(n(fp)));
    equal(name, filename);
  };

  assert.extname = function(fp, ext) {
    equal(path.extname(n(fp)), n(ext));
  };

  assert.path = function(a, b) {
    equal(n(a), n(b));
  };

  assert.absolute = function(a, b) {
    equal(path.resolve(n(a)), path.resolve(n(b)));
  };

  assert.isAbsolute = function(fp) {
    assert(path.isAbsolute(n(fp)));
  };

  assert.isRelative = function(fp) {
    assert(!path.isAbsolute(n(fp)));
  };

  // assert.segment('a/b/c/foo/bar', 'test/fixtures/foo/bar', 2);
  assert.segments = function(a, b, num) {
    equal(segments(n(a), num), segments(n(b), num));
  };

  // assert.lastSegment('a/b/c/foo/bar', 'foo/bar', 2);
  assert.lastSegment = function(a, b, num) {
    equal(segments(n(a), num), n(b));
  };

  return assert;
};

function segments(fp, num) {
  var segs = fp.split(path.sep).slice(-num);
  return segs.join(path.sep);
}
