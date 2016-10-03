'use strict';

const { compose, first, identity, prop } = require('../../lib/dash');
const { resolve } = require('path');
const harness = require('../../lib/harness');
const spy = require('spy');
const test = require('tape');

const args = compose(prop('arguments'), first, prop('calls'));
const srcpath = resolve(__dirname, '../case-xform/source.css');
const exppath = resolve(__dirname, '../case-xform/expected.css');

test('xform', t => {
  const xform = spy(identity);
  const testHarness = harness(xform, identity);

  const expected = [
    '.src\n{}\n',
    srcpath,
  ];

  testHarness([srcpath, exppath])
    .then(() => {
      t.ok(xform.called);
      t.equal(xform.callCount, 1);
      t.deepEqual(args(xform), expected);
      t.end();
    })
    .catch(er => t.error(er));
});

test('test', t => {
  const testProgram = spy(identity);
  const testHarness = harness(identity, testProgram);

  const expected = [
    '.src\n{}\n',
    srcpath,
    '.exp\n{}\n',
    exppath,
    'test/case-xform',
  ];

  testHarness([srcpath, exppath])
    .then(result => {
      t.ok(testProgram.called);
      t.equal(testProgram.callCount, 1);
      t.deepEqual(args(testProgram), [expected]);
      t.deepEqual(result, expected);
      t.end();
    })
    .catch(er => t.error(er));
});
