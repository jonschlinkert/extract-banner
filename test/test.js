/*!
 * extract-banner <https://github.com/jonschlinkert/extract-banner>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var extract = require('..');

function read(fp) {
  return fs.readFileSync(path.resolve('test/fixtures', fp), 'utf8');
}

describe('extract', function() {
  it('should extract a banner from a string', function() {
    var res = extract(read('banner.js'));
    var expected = [
      '/**',
      ' * extract-banner <https://github.com/jonschlinkert/extract-banner>',
      ' *',
      ' * Copyright (c) 2016, Jon Schlinkert.',
      ' * Licensed under the MIT license.',
      ' */',
    ].join('\n');
    assert.equal(res, expected);
  });

  it('should extract a protected banner from a string', function() {
    var res = extract(read('protected.js'));
    var expected = [
      '/*!',
      ' * extract-banner <https://github.com/jonschlinkert/extract-banner>',
      ' *',
      ' * Copyright (c) 2016, Jon Schlinkert.',
      ' * Licensed under the MIT license.',
      ' */',
    ].join('\n');
    assert.equal(res, expected);
  });

  it('should work when use-strict is first', function() {
    var res = extract(read('use-strict.js'));
    var expected = [
      '/*!',
      ' * extract-banner <https://github.com/jonschlinkert/extract-banner>',
      ' *',
      ' * Copyright (c) 2016, Jon Schlinkert.',
      ' * Licensed under the MIT license.',
      ' */'
    ].join('\n');
    assert.equal(res, expected);
  });

  it('should not extract config comments', function() {
    var res = extract(read('config-comment.js'));
    assert.equal(res, '');
  });

  it('should return an empty string when no banner is found', function() {
    var res = extract(read('no-banner.js'));
    assert.equal(res, '');
  });

  it('should not extract a non-banner comments', function() {
    var res = extract(read('comment.js'));
    assert.equal(res, '');
  });
});
