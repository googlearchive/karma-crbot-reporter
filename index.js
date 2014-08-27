/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

var CrbotReporter = function(helper, logger) {
  this.write = process.stdout.write.bind(process.stdout);

  this.onBrowserRegister = function(browser) {
    this.write('@@@SEED_STEP ' + browser.name + '@@@\n');
    this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
    this.write('@@@STEP_STARTED@@@\n');
  };

  this.onBrowserComplete = function(browser) {
    this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
    var results = browser.lastResult;
    if (results.failed || results.error) {
      this.write('@@@STEP_FAILURE@@@\n');
    }
    this.write('@@@STEP_CLOSED@@@\n');
  };

  this.onBrowserError = function(browser, error) {
    this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
    this.write(browser.name + ' ERROR\n');
    this.write('\t' + error.replace(/\n/g, '\n\t') + '\n');
  };

  this.onSpecComplete = function(browser, result) {
    if (!result.success) {
      this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
      this.write(browser.name + ' ' + result.suite[0] + ' ' + result.description + ' failed\n');
      this.write('\t' + result.log[0].replace(/\n/g, '\n\t') + '\n');
    }
  };
};

module.exports = {
  'reporter:crbot': ['type', CrbotReporter]
};
