// jshint node: true

'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');

module.exports = function (config) {

	gulp.task('compile-pug', function () {
		return gulp
			.src(config.src.templates)
			.pipe(pug())
			.pipe(gulp.dest(config.dist.root));
	});

	gulp.task('process-templates', [
		'compile-pug'
	]);

	gulp.task('watch-templates', function () {
		gulp.watch(config.src.templates, ['process-templates']);
	});

};
