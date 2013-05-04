/// Module buddy-minimal
//
// A minimal reporter for Buddy.
//
//
// Copyright (c) 2013 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var colour = require('cli-color')

module.exports = function reporter(logger) { return function(report) {

  if (!logger)  logger = console.log.bind(console)
  function log() {
    logger([].join.call(arguments, ' '))
  }

  function pad(a, b) {
    return a + b
  }

  function describeException(result, i) {
    var ex = result.exception

    return i + ') ' + ex.name + ': ' + ex.message
    +      '\n' + ex.stack.split(/\r\n|\r|\n/)
                          .map(pad('  '))
                          .join('\n')
  }

  function describeIgnored(results) {
    var ignored = results.ignored.length

    return ignored?         ' (' + ignored + ' ignored)'
    :      /* otherwise */  ''
  }

  function describeFailure(results) {
    var failed  = results.failed.length
    var all     = results.all.length

    log( colour.red(failed + ' of ' + all + ' failed.')
       , describeIgnored(results))

    results.failed.map(describeException)
                  .forEach(log)
  }

  function describeSuccess(results) {
    var all = results.all.length

    log( colour.green('Success.')
       , describeIgnored(results))
  }

  report.on('done', function(ev, results) {
    return results.failed.length?  describeFailure(results)
    :      /* otherwise */         describeSuccess(results)
  })
}}