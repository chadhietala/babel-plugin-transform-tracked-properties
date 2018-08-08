const QUnit = require('qunit');
const plugin = require('../index');
const babel = require('babel-core');

const opts = {
  filename: 'test',
  plugins: [plugin]
};
QUnit.module('transform tracked');

QUnit.test('transform import', assert => {
  let transformed = babel.transform(`
import { tracked } from '@glimmer/component';
import jquery from 'jquery';
`, opts).code;
  assert.equal(transformed.trim(), `
import { tracked } from '@ember/component';
import jquery from 'jquery';
`.trim());
})