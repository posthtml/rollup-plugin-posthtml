/*!
 * rollup-plugin-posthtml <https://github.com/tunnckoCore/rollup-plugin-posthtml>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const posthtml = require('posthtml')
const utils = require('rollup-pluginutils')

/**
 * > A [posthtml] plugin for [rollup][]. The `options` are
 * passed directly to PostHTML's `.process` method, so
 * you can even parse a different parser and etc. You also
 * can give `options.include` and `options.exclude`
 * as usual for any Rollup plugin. The `options.plugins` option
 * is passed to PostHTML directly.
 *
 * **Example**
 *
 * ```js
 * import posthtml from 'rollup-plugin-posthtml'
 *
 * import sugarml from 'posthtml-sugarml'
 * import customElements from 'posthtml-custom-elements'
 *
 * export default {
 *   entry: 'foo/bar/main.js',
 *   plugins: [
 *     posthtml({
 *       parser: sugarml(),
 *       plugins: customElements()
 *     })
 *   ]
 * }
 * ```
 *
 * @param  {Object} `options` optional, passed directly to posthtml
 * @return {Object} a Rollup plugin
 * @api public
 */

module.exports = function rollupPluginPosthtml (options) {
  options = Object.assign({
    include: '**/*.html'
  }, options)

  const filter = utils.createFilter(options.include, options.exclude)
  const handle = (res) => `export default ${JSON.stringify(res.html.trim())}`

  return {
    name: 'posthtml',
    transform: (code, id) => (
      filter(id)
        ? posthtml(options.plugins).process(code, {...options, rollupResourceId: id}).then(handle)
        : null
    )
  }
}
