'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Normal comment here
 */

function read(fp) {
  return fs.readFileSync(path.resolve('fixtures', fp), 'utf8');
}
