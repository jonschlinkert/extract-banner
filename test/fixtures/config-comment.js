/* eslint-do-stuff */
'use strict';

var fs = require('fs');
var path = require('path');

function read(fp) {
  return fs.readFileSync(path.resolve('fixtures', fp), 'utf8');
}
