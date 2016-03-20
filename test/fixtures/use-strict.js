'use strict';

/*!
 * extract-banner <https://github.com/jonschlinkert/extract-banner>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT license.
 */

var fs = require('fs');
var path = require('path');

function read(fp) {
  return fs.readFileSync(path.resolve('fixtures', fp), 'utf8');
}
