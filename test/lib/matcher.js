'use strict';

const { resolve } = require('path');
const matcher = require('../../lib/matcher');
const test = require('tape');

const abs = file => resolve(__dirname, '../../', file);

test('match case', t => {
  const expected = {
    [abs('test/case-xform')]: [
      abs('test/case-xform/source.css'),
      abs('test/case-xform/expected.css'),
    ],
  };

  matcher('test/case-xform')
    .then(files => {
      t.deepEqual(files, expected);
      t.end();
    })
    .catch(er => t.error(er));
});
