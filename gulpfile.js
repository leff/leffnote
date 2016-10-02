'use strict';

const gulp = require('gulp'),
      del = require('del'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat-sourcemap'),
      templateCache = require('gulp-angular-templatecache'),
      browserSync = require('browser-sync').create(),
      modRewrite = require('connect-modrewrite'),
      KarmaServer = require('karma').Server;

const srcPath = './src/',
      destPath = 'build/',
      vendorJS = [
        // vendor
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angularfire/dist/angularfire.js'
      ],
      appJS = [
        // templates
        `${destPath}/templates.js`,

        // local
        `${srcPath}/**/*.js`,
        `!${srcPath}/**/*.spec.js`
      ];

gulp.task('clean', function(callback) {
  del.sync( destPath );
  callback();
});

gulp.task('sass', ['clean'], function() {
  return gulp.src( `${srcPath}/app.scss` )
    .pipe( sass() )
    .pipe( gulp.dest(destPath) );
});

gulp.task('pug', ['clean'], function() {
  return gulp.src( `${srcPath}/**/*.pug` )
    .pipe( pug() )
    .pipe( gulp.dest( destPath ) );
});

gulp.task('templateCache', ['pug'], function () {
  return gulp.src( [`${destPath}/**/*.html`, `!${destPath}/index.html`] )
    .pipe( templateCache({standalone: true}) )
    .pipe( gulp.dest(destPath) );
});

gulp.task('js:app', ['clean', 'templateCache'], function() {
  return gulp.src( appJS )
    .pipe( babel({ presets: ['es2015'] }) )
    .pipe( concat('app.js') )
    .pipe( gulp.dest( destPath ) );
});

gulp.task('js:vendor', ['clean'], function() {
  return gulp.src( vendorJS )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest( destPath ) );
});

gulp.task('assets', ['clean'], function () {
  return gulp.src( `${srcPath}/assets/**/*` )
    .pipe( gulp.dest(`${destPath}/assets`) );
});

gulp.task('build', ['sass', 'js:vendor', 'js:app', 'assets']);

gulp.task('watch', ['build'], function() {
  return gulp.watch( `${srcPath}/**/*`, ['build'] );
});

gulp.task('server', ['watch'], function() {
  browserSync.init({
    port: 8547,
    server: {
      baseDir: destPath,
      middleware: [
        modRewrite(['^[^\\.]*$ /index.html [L]']), // anything without a dot gets passed to index.html (allowing assets to be served normally)
        function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      ]
    }
  });

  gulp.watch([`${destPath}/**/*`]).on('change', browserSync.reload);
});


/**
 * Run test once and exit
 */
gulp.task('test', ['build'], function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('default', ['build']);