// jshint node: true

'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var tsify = require('tsify');

module.exports = function (config) {

  gulp.task('process-javascript', function() {
    browserify({ entries: config.src.entries, debug: true })
      .external(config.vendor.scripts)
      .plugin(tsify)
      .bundle()
      .on('error', function (error) { console.error(error.toString()); })
      .pipe(source(config.dist.filenames.scripts))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dist.root));
  });

   gulp.task('process-javascript-vendor', function() {
       browserify()
         .require(config.vendor.scripts)
         .bundle()
         .pipe(source(config.vendor.filenames.scripts))
         .pipe(buffer())
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(config.dist.root));
     });

  gulp.task('watch-javascript', function () {
    gulp.watch(config.src.scripts, ['process-javascript']);
  });

};
