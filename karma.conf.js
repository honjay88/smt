// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine','requirejs', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-ie-launcher'),
      require('karma-requirejs'),
      require('karma-es6-shim'),
     // require('karma-mocha'),
      require('karma-mocha-reporter')
     
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false },
      { pattern: './node_modules/ionic-native/dist/**/*.js', included: false, watched: false }
    ],
   /* proxies:[
     {'./build': './node_modules/ionic-native/dist'},
     {'./buid/ionic-native.js': './node_modules/ionic-native/dist/index.js'}
    ],*/
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    typescriptPreprocessor: {
      options: {
      target: 'ES6',
      sourceMap: true, // generate source maps
      noResolve: false // enforce type resolution
      } 
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      dir: 'reports/coverage',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      reporters: [ 
                 { type: 'html', subdir: 'report-html' },
                 { type: 'lcov', subdir: 'report-lcov' },        
                 { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                 { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                 { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                 { type: 'text', subdir: '.', file: 'text.txt' },
                 { type: 'text-summary' },
                ],
      fixWebpackSourcePaths: true
    },
    thresholds: {
        statements: 100,
        lines: 100,
        branches: 100,
        functions: 100
     },
    angularCli: {
      environment: 'dev'
    },
   // reporters :['mocha'],
    mochaReporter: {
     /* colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      },*/
      output: 'autowatch', 
      divider: ''
    },
   
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml','mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};