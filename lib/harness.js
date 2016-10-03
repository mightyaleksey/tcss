'use strict';

const { compose, curry, isString, waitAll } = require('./dash');
const { dirname, relative } = require('path');
const assert = require('assert');
const promisify = require('promisify-api');
const readFile = promisify(require('fs').readFile);

const cwd = process.cwd();
const read = filename => readFile(filename, 'utf8');
const relativeTo = curry(relative);
const casename = compose(relativeTo(cwd), dirname);

module.exports = curry(harness);

function harness(xform, test) {
  return run;

  function run([ srcpath, exppath ]) {
    assert(isString(srcpath), 'missing `source.css` file');
    assert(isString(exppath), 'missing `expected.css` file');

    const xf = srcfile => xform(srcfile, srcpath);
    const srcfile = read(srcpath).then(xf);
    const expfile = read(exppath);

    return waitAll([srcfile, srcpath, expfile, exppath, casename(srcpath)])
      .then(test);
  }
}
