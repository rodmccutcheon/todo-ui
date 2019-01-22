// jshint node: true

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

module.exports = function (config) {

	gulp.task('concat-css-vendor', function () {
		return gulp
			.src(config.vendor.styles)
			.pipe(concat(config.vendor.filenames.styles))
			.pipe(gulp.dest(config.dist.root));
	});

	gulp.task('process-stylesheets-vendor', [
		'concat-css-vendor'
	]);

};
