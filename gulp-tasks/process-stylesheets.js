// jshint node: true

'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

module.exports = function (config) {

	gulp.task('compile-stylus', function () {
		return gulp
			.src(config.src.styles)
			.pipe(stylus({

			}))
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('concat-css', ['compile-stylus'], function () {
		return gulp
			.src(config.tmp.styles)
			.pipe(concat(config.dist.filenames.styles))
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('compress-css', ['concat-css'], function () {
		return gulp
			.src(config.tmp.root + config.dist.filenames.styles)
			.pipe(minifyCss())
			.pipe(gulp.dest(config.dist.root));
	});

	gulp.task('process-stylesheets', [
		'compile-stylus',
		'concat-css',
		'compress-css'
	]);

	gulp.task('watch-stylesheets', function () {
		gulp.watch(config.src.styles, ['process-stylesheets']);
	});

};
