module.exports = function(config) {
  config.set({
    basePath: '.',
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'build/templates.js',
      'src/**/*.js',
      'src/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};