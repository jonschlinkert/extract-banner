/*!
 * extract-banner <https://github.com/jonschlinkert/extract-banner>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Released under the MIT license.
 */

'use strict';

var strip = require('strip-use-strict');
var bom = require('strip-bom-string');

module.exports = function(str, custom) {
  if (typeof str !== 'string') {
    throw new Error('has-banner expects a string.');
  }

  str = strip(bom(str)).replace(/^\s+/, '');
  var start = /^(\/[*!]+|\/\/)/.exec(str);
  if (!start) {
    return false;
  }

  var names = ['global', 'jshint', 'eslint'];
  if (Array.isArray(custom)) {
    names = names.concat(custom);
  }

  var chars = start[0];
  str += '\n';

  var end = chars === '//'
    ? str.indexOf('\n')
    : str.indexOf('*/');

  if (end === -1) {
    return false;
  }

  var comment = str.slice(chars.length, end);
  comment = comment.replace(/^[\s\W]+|[\s\W]+$/g, '');

  var re = new RegExp('^' + names.join('|') + '[-: \\t]?');
  return !re.test(comment);
};
