#!/usr/bin/env node
'use strict';

const {
  assign,
  compose,
  filter,
  identity,
  map,
  reduce,
  toArray,
  waitAll,
} = require('../lib/dash');
const harness = require('../lib/harness');
const matcher = require('../lib/matcher');
const minimist = require('minimist');
const resolve = require('resolve').sync;

const cwd = process.cwd();
const argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    r: 'require',
    t: 'test',
    x: 'xform',
  },
  boolean: ['help'],
  string: ['require', 'test', 'xform'],
  default: {
    r: [],
  },
});

if (argv.help) {
  /* eslint-disable no-console */
  console.log('Usage: tcss [options...] <pattern>');
  console.log('Options:');
  console.log(' -h, --help    Output usage information');
  console.log(' -r, --require Load module before running any tests');
  console.log(' -t, --test    Provide a custom test program');
  console.log(' -x, --xform   Provide process function for `source.css` files');
  /* eslint-enable no-console */
  process.exit();
}

const resolveTo = filepath => resolve(filepath, {basedir: cwd});
const requireModule = compose(require, resolveTo);
const loadModules = compose(map(requireModule), filter(Boolean), toArray);

loadModules(argv.require);

var testHarness = harness;
testHarness = testHarness(argv.xform
  ? requireModule(argv.xform)
  : identity);

testHarness = testHarness(argv.test
  ? requireModule(argv.test)
  : require('../lib/test'));

const match = compose(waitAll, map(matcher));
match(argv._).then(compose(waitAll, map(testHarness), reduce(assign, {})))
  .catch(console.error); // eslint-disable-line no-console
