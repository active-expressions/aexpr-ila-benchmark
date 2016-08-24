var os = require('os');
var path = require('path');
var fs = require('fs');
var builder = require('xmlbuilder');

function getLINE() {

}

var HTMLReporter = function(baseReporterDecorator, config, emitter, logger, helper, formatError) {
  var json;

    var outputFile = config.htmlReporter.outputFile;
  var log = logger.create('reporter.html');

  var pendingFileWritings = 0;
  var fileWritingFinished = function() {};

  baseReporterDecorator(this);

  // TODO: remove if public version of this method is available
  var basePathResolve = function(relativePath) {

    if (helper.isUrlAbsolute(relativePath)) {
      return relativePath;
    }

    if (!helper.isDefined(config.basePath) || !helper.isDefined(relativePath)) {
      return '';
    }

    return path.resolve(config.basePath, relativePath);
  };

  this.onRunStart = function(browsers) {
    json = {};
  };

  this.onBrowserStart = function(browser) {
    json[browser.id] = {
        browser: browser.name,
        suites: []
    };
  };

  this.onBrowserError = function(browser, error) {
    console.error('SOMETHING TERRIBLE HAPPENED IN: ' + browser.name, error);
  };

  this.onBrowserComplete = function(browser) {
      var result = browser.lastResult;
      var bro = json[browser.id];
      bro.test = {
          tests: result.total + ' tests',
          errors: (result.disconnected || result.error ? 1 : 0) + ' errors',
          failed: result.failed + ' failures',
          skipped: result.skipped + ' skipped',
          runtime: ((result.netTime || 0) / 1000) + 's'
      };
  };

  this.onRunComplete = function(browsers) {
    console.log('ON_RUN_COMPLETE', browsers);
    console.log('ON_RUN_COMPLETE2', browsers.getResults());
    var htmlToOutput = json;

    if (htmlToOutput) {
      pendingFileWritings++;

      config.basePath = path.resolve(config.basePath || '.');
      outputFile = basePathResolve(outputFile);
      helper.normalizeWinPath(outputFile);

      helper.mkdirIfNotExists(path.dirname(outputFile), function() {
        fs.writeFile(outputFile, JSON.stringify(htmlToOutput)/*.end({pretty: true})*/, function(err) {
          if (err) {
            log.warn('Cannot write JSON report\n\t' + err.message);
          } else {
            log.debug('JSON results written to "%s".', outputFile);
          }

          if (!--pendingFileWritings) {
            fileWritingFinished();
          }
        });
      });
    } else {
      log.error('HTML report was not created\n\t');
    }

    //html = null;
    //allMessages.length = 0;
    //allErrors.length = 0;
    //htmlCreated = false;
  };

  this.specSuccess = this.specSkipped = this.specFailure = function(browser, result) {
    var browserSuites = json[browser.id].suites;
    browserSuites.push({
        suite: result.suite,
        status: result.skipped ? 'skip' : (result.success ? 'pass' : 'fail'),
        title: JSON.parse(result.description)
        // other fields of result: log, time
    });
  };

  // wait for writing all the html files, before exiting
  this.onExit = function (done) {
    if (pendingFileWritings) {
      fileWritingFinished = done;
    } else {
      done();
    }
  };
};

HTMLReporter.prototype._repeat = function(n, str) {
  var res = [];
  var i;
  for (i = 0; i < n; ++i) {
    res.push(str);
  }
  return res.join('');
};

HTMLReporter.$inject = ['baseReporterDecorator', 'config', 'emitter', 'logger', 'helper', 'formatError'];


// =============================================================================
// =============================================================================
// =============================================================================

// Karma configuration
// Generated on Tue Aug 23 2016 14:57:05 GMT+0200 (W. Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'benchmark/bundles/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'html'],

    htmlReporter: {
      outputFile: 'foo/foo.json'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_LOCAL: {
        base: 'Chrome',
        flags: [
          '--disable-hang-monitor'
        ]
      },
      Chrome_Travis_CI: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-hang-monitor'
        ]
      }
    },

    browserNoActivityTimeout: 8*60000, // 8min (so build does not timeout)
    browserDisconnectTimeout: 8*60000, // 8min (so build does not timeout)
    client: {
      captureConsole: false
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      {'reporter:html': ['type', HTMLReporter]}
    ]
  });

  config.browsers = [process.env.TRAVIS ? 'Chrome_Travis_CI' : 'Chrome_LOCAL'];
};
