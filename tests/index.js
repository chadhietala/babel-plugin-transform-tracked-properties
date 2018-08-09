const QUnit = require('qunit');
const plugin = require('../index');
const babel = require('babel-core');

const trimAndRemoveNewLines = str => {
  return str.split(/\n/).join('').trim();
};

const opts = {
  filename: 'test',
  plugins: [plugin]
};

QUnit.module('transform tracked');

QUnit.test('transform import', assert => {
  const transformed = babel.transform(`
import { tracked } from '@glimmer/component';
import jquery from 'jquery';
`, opts).code;
  const expected = trimAndRemoveNewLines(`
import { tracked } from '@ember/component';
import jquery from 'jquery';
`);
  assert.equal(trimAndRemoveNewLines(transformed), expected, 'Lonely tracked is converted');
});

QUnit.test('transform import, with multiple ImportSpecifiers', assert => {
  const transformed = babel.transform(`
import Component, { tracked, something } from '@glimmer/component';
import jquery from 'jquery';
`, opts).code;
  const expected = `
import Component, { something } from '@glimmer/component';
import { tracked } from '@ember/component';
import jquery from 'jquery';
  `;
  assert.equal(trimAndRemoveNewLines(transformed), trimAndRemoveNewLines(expected));
});

QUnit.test('transform import, with aliased ImportSpecifier', assert => {
  const transformed = babel.transform(`
import { tracked as gTracked } from '@glimmer/component';
import jquery from 'jquery';
`, opts).code;
  const expected = `
import { tracked as gTracked } from '@ember/component';
import jquery from 'jquery';
  `;
  assert.equal(trimAndRemoveNewLines(transformed), trimAndRemoveNewLines(expected));
});