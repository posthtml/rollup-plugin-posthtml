/*!
 * rollup-plugin-posthtml <https://github.com/tunnckoCore/rollup-plugin-posthtml>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const posthtml = require('./index')

const rollup = require('rollup')
const elements = require('posthtml-custom-elements')
const minifier = require('posthtml-minifier')

test('should main export return an object with transform() fn', (done) => {
  const plugin = posthtml()

  test.strictEqual(plugin.name, 'posthtml')
  test.strictEqual(typeof plugin.transform, 'function')
  done()
})

test('should transform return `null` if `id` not match to filter', (done) => {
  const plugin = posthtml({
    include: 'foo.js'
  })
  const result = plugin.transform('foo bar', 'bar.js')

  test.strictEqual(result, null, 'should `result` of transform() be null')
  done()
})

test('should work as real plugin to rollup', (done) => {
  const promise = rollup.rollup({
    entry: 'fixtures/main.js',
    plugins: [
      posthtml({
        plugins: [elements()]
      })
    ]
  })

  return promise.then((bundle) => {
    const result = bundle.generate({ format: 'iife' })

    test.strictEqual(/var foo = "<div/.test(result.code), true)
    test.strictEqual(/class=\\"component\\"/.test(result.code), true)
    test.strictEqual(/class=\\"text\\"/.test(result.code), true)
    test.strictEqual(/console\.log\(foo\)/.test(result.code), true)
    done()
  }, done).catch(done)
})

test('should emit string', (done) => {
  const promise = rollup.rollup({
    entry: 'fixtures/main.js',
    plugins: [
      posthtml({
        plugins: [
          elements(),
          minifier({
            removeComments: true
          })
        ],
        emitFile: false
      }),
      (function rollupPluginDumb () {
        return {
          name: 'dumb',
          transform: (code, id) => {
            return id.endsWith('.html')
              ? `export default ${JSON.stringify(code)}`
              : null
          }
        }
      })()
    ]
  })

  return promise.then((bundle) => {
    const result = bundle.generate({format: 'iife', moduleName: 'dumb'})

    test.strictEqual(result.code.includes('<!--'), false)

    test.strictEqual(/var foo = "<div/.test(result.code), true)
    test.strictEqual(/class=\\"component\\"/.test(result.code), true)
    test.strictEqual(/class=\\"text\\"/.test(result.code), true)
    test.strictEqual(/console\.log\(foo\)/.test(result.code), true)
    done()
  }, done).catch(done)
})
