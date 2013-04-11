var CrbotReporter = function(helper, logger) {
  this.write = process.stdout.write.bind(process.stdout);

  this.onBrowserRegister = function(browser) {
    this.write('@@@SEED_STEP ' + browser.name + '@@@\n');
    this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
    this.write('@@@STEP_STARTED @@@\n');
  };

  this.onBrowserComplete = function(browser) {
    this.write('@@@STEP_CURSOR ' + browser.name + '@@@\n');
    if (browser.lastResult.failed > 0) {
      this.write('@@@STEP_FAILURE @@@\n');
    }
    this.write('@@@STEP_CLOSED @@@\n');
  };
};

module.exports = {
  'reporter:crbot': ['type', CrbotReporter]
};
