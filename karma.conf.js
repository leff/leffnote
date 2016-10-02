module.exports = function(config) {
  config.set({
    basePath: '.',
    files: [
      'build/vendor.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'build/templates.js',
      'build/app.js',
      'src/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    // Only tests need to be processed (because we're testing against the built files)
    preprocessors: {
      'src/**/*.spec.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    }
  });
};