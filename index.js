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
    return '';
  }

  var names = ['global', 'jshint', 'eslint'];
  if (Array.isArray(custom)) {
    names = names.concat(custom);
  }

  var chars = start[0];
  str += '\n';

  var isLine = chars === '//';

  var end = isLine
    ? str.indexOf('\n')
    : str.indexOf('*/');

  if (end === -1) {
    return '';
  }

  var comment = str.slice(0, end + (isLine ? 1 : 2));
  var inner = str.slice(chars.length, end);
  inner = inner.replace(/^[\s\W]+|[\s\W]+$/g, '');

  var re = new RegExp('^' + names.join('|') + '[-: \\t]?');
  if (re.test(inner)) {
    return '';
  }
  return comment;
};
