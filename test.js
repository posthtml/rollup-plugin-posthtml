/*!
 * rollup-plugin-posthtml <https://github.com/tunnckoCore/rollup-plugin-posthtml>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const rollupPluginPosthtml = require('./index')

test('rollup-plugin-posthtml', (done) => {
  rollupPluginPosthtml()
  done()
})
