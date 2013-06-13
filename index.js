// # Module brofist-minimal
//
// A minimal reporter for Brofist.
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

// -- Dependencies -----------------------------------------------------
var colour = require('cli-color')


// -- Core implementation ---------------------------------------------
// :: (...a -> ()) -> Report -> ()
module.exports = function reporter(logger) { return function(report) {

  if (!logger)  logger = console.log.bind(console)
  function log() {
    logger([].join.call(arguments, ' ')) }


  function describeException(result, i) {
    var ex      = result.exception
    var heading = i + ') ' + result.test.fullTitle().join(' ')

    return heading + ': ' + colour.red(ex)
         + '\n\n'
         + colour.blackBright(ex.stack.split(/\r\n|\r|\n/).slice(1).join('\n')) }


  function describeIgnored(results) {
    var ignored = results.ignored.length

    return ignored?         colour.blackBright('(' + ignored + ' ignored)')
    :      /* otherwise */  '' }


  function describeFailure(results) {
    var failed  = results.failed.length
    var all     = results.all.length

    log( colour.red(failed + '/' + all + ' failed.')
       , describeIgnored(results))

    log('\n')
    results.failed.map(describeException)
                  .forEach(function(a){ log(a) })

    process.exit(1) }


  function describeSuccess(results) {
    var all = results.all.length
    var passed = results.passed.length

    log( colour.green('Success. ' + passed + '/' + all + ' tests.')
       , describeIgnored(results)) }


  report.signals.done.add(function(results) {
    return results.failed.length?  describeFailure(results)
    :      /* otherwise */         describeSuccess(results) })
}}