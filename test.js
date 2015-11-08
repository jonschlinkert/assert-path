'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assertPath = require('./');
assertPath(assert);
var a, b;

describe('assert-path', function () {
  it('should export a function', function () {
    assert.equal(typeof assertPath, 'function');
  });

  it('should return a function', function () {
    assert.equal(typeof assertPath(assert), 'function');
  });

  it('should decorate methods onto assert', function () {
    assert.equal(typeof assert.dirname, 'function');
    assert.equal(typeof assert.basename, 'function');
    assert.equal(typeof assert.filename, 'function');
    assert.equal(typeof assert.extname, 'function');
    assert.equal(typeof assert.path, 'function');
    assert.equal(typeof assert.absolute, 'function');
    assert.equal(typeof assert.isAbsolute, 'function');
    assert.equal(typeof assert.isRelative, 'function');
    assert.equal(typeof assert.segments, 'function');
    assert.equal(typeof assert.lastSegment, 'function');
  });

  it('should throw an error when invalid args are passed', function (cb) {
    try {
      assertPath();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected assert as the first argument');
      cb();
    }
  });
});

describe('strict comparison', function () {
  var assertPath = require('./');

  beforeEach(function() {
    assertPath(assert);
  });

  describe('assert.basename', function () {
    it('should strictly compare basenames', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'baz.js';

      try {
        assert.basename(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.filename', function () {
    it('should strictly compare filenames', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'baz';

      try {
        assert.filename(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.extname', function () {
    it('should strictly compare extnames', function (cb) {
      a = 'foo/bar/baz.js';
      b = '.js';

      try {
        assert.extname(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.dirname', function () {
    it('should strictly compare dirnames', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'foo/bar';

      try {
        assert.dirname(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.path', function () {
    it('should strictly compare paths', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'foo/bar/baz.js';

      try {
        assert.path(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.dirname', function () {
    it('should strictly compare absolute paths', function (cb) {
      a = path.resolve('foo/bar/baz.js');
      b = path.resolve('foo/bar/baz.js');

      try {
        assert.absolute(a, b);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.isAbsolute', function () {
    it('should return true if a path is absolute', function (cb) {
      var fp = path.resolve('foo/bar/baz.js');
      try {
        assert.isAbsolute(fp);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.dirname', function () {
    it('should return true if path is relative', function (cb) {
      try {
        assert.isRelative('foo/bar/baz.js');
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  describe('assert.segments', function () {
    it('should strictly compare path segments', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'foo/bar/baz.js';

      try {
        assert.segments(a, b, 2);
        cb();
      } catch (err) {
        cb(err);
      }
    });

    it('should throw an error if path segments are not the same', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'foo/bar/baz.js';

      try {
        assert.segments('foo', b, 2);
        cb(new Error('expected an error'));
      } catch (err) {
        cb()
      }
    });
  });

  describe('assert.lastSegment', function () {
    it('should strictly compare lastSegments', function (cb) {
      a = 'foo/bar/baz.js';
      b = 'baz.js';

      try {
        assert.lastSegment(a, b, 1);
        cb();
      } catch (err) {
        cb(err);
      }
    });

    it('should throw an error if last segments are not the same', function (cb) {
      a = 'foo/bar/baz';
      b = 'foo/bar/baz.js';

      try {
        assert.lastSegment(a, b, 2);
        cb(new Error('expected an error'));
      } catch (err) {
        cb()
      }
    });
  });
});

describe('normalized paths', function () {
  var assertPath = require('./');

  beforeEach(function() {
    assertPath(assert, {
      normalize: true
    });
  });

  it('should compare dirnames with normalized paths', function (cb) {
    a = 'foo\\bar\\baz.js';
    b = 'foo/bar';

    try {
      assert.dirname(a, b);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should compare normalized paths', function (cb) {
    a = 'foo\\bar\\baz.js';
    b = 'foo/bar/baz.js';

    try {
      assert.path(a, b);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should compare normalized absolute paths', function (cb) {
    a = path.resolve('foo\\bar\\baz.js');
    b = path.resolve('foo/bar/baz.js');

    try {
      assert.absolute(a, b);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should use isAbsolute on normalized paths', function (cb) {
    var fp = path.resolve('foo\\bar\\baz.js');
    try {
      assert.isAbsolute(fp);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should use isRelative on normalized paths', function (cb) {
    try {
      assert.isRelative('foo\\bar\\baz.js');
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should compare segments with normalized paths', function (cb) {
    a = 'foo/bar\\baz.js';
    b = 'foo/bar/baz.js';

    try {
      assert.segments(a, b, 2);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  it('should compare lastSegment with normalized paths', function (cb) {
    a = 'foo\\bar\\baz.js';
    b = 'baz.js';

    try {
      assert.lastSegment(a, b, 1);
      cb();
    } catch (err) {
      cb(err);
    }
  });
});
