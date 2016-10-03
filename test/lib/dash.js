'use strict';

const {
  assign,
  compose,
  constant,
  curry,
  filter,
  groupBy,
  identity,
  map,
  prop,
  reduce,
} = require('../../lib/dash');
const test = require('tape');

const add = curry((a, b) => a + b);
const inc = add(1);

test('assign', t => {
  const a = {a: 4, c: 7};
  const b = {a: 5, b: 6};
  const c = assign(a, b);

  t.notEqual(a, c);
  t.notEqual(b, c);
  t.deepEqual(c, {a: 5, b: 6, c: 7});
  t.end();
});

test('filter', t => {
  t.deepEqual(filter(Math.round)([0, 0.3, 1, 0.5]), [1, 0.5]);
  t.end();
});

test('compose', t => {
  t.equal(compose()(5), 5);
  t.equal(compose(add)(5, 1), 6);
  t.equal(compose(identity)(5), 5);
  t.equal(compose(identity, add(1))(5), 6);
  t.equal(compose(add(1), identity)(5), 6);
  t.end();
});

test('constant', t => {
  t.equal(constant(5)(), 5);
  t.end();
});

test('curry', t => {
  const add = curry((a, b, c = 0) => a + b + c);

  t.equal(add(1)(2), 3);
  t.equal(add(1, 2), 3);
  t.equal(add(1)()(2), 3);
  t.equal(add()(1)(2), 3);
  t.equal(add(1, 2, 3), 6);
  t.equal(add(1)(2, 3), 6);
  t.end();
});

test('groupBy', t => {
  t.deepEqual(groupBy(Math.round, [1, 3.2, 1.5, 2, 3]), {
    1: [1],
    2: [1.5, 2],
    3: [3.2, 3],
  });
  t.end();
});

test('map', t => {
  t.deepEqual(map(inc, [1, 2, 3]), [2, 3, 4]);
  t.deepEqual(map(inc, {a: 1, b: 2, c: 3}), [2, 3, 4]);
  t.end();
});

test('prop', t => {
  t.equal(prop('a', {a: 5}), 5);
  t.equal(prop('a')({a: 5}), 5);
  t.end();
});

test('reduce', t => {
  t.deepEqual(reduce(add, 0, [1, 2, 3]), 6);
  t.end();
});
