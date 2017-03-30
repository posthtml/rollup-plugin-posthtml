/*!
 * rollup-plugin-posthtml <https://github.com/tunnckoCore/rollup-plugin-posthtml>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const posthtml = require('posthtml')
const utils = require('rollup-pluginutils')

module.exports = function rollupPluginPosthtml (options) {
  options = Object.assign({
    include: '**/*.html'
  })

  const filter = utils.createFilter(options.include, options.exclude)
  const handle = (res) => `export default ${JSON.stringify(res.html)}`

  return {
    name: 'posthtml',
    transform: (code, id) => (
      filter(id)
        ? posthtml(options.plugins).process(code, options).then(handle)
        : null
    )
  }
}
