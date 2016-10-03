'use strict';

const tape = require('tape');

module.exports = test;

function test([ srcfile, , expfile, , casename ]) {
  tape(casename, t => {
    t.plan(1);
    t.equal(srcfile, expfile);
  });
}
