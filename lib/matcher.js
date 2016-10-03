'use strict';

const { dirname, sep } = require('path');
const { groupBy } = require('./dash');
const promisify = require('promisify-api');
const glob = promisify(require('glob'));

const groupByCase = groupBy(dirname);

module.exports = matcher;

// matcher :: string -> object*
function matcher(pattern) {
  return glob(cases(pattern), {absolute: true, nosort: true})
    .then(groupByCase);
}

// cases :: string -> string
function cases(pattern) {
  return pattern + sep + '{source,expected}.css';
}
