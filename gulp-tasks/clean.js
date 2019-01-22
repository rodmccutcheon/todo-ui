// jshint node: true

'use strict';

var gulp = require('gulp');
var del = require('del');

module.exports = function (config) {
	gulp.task('clean', function () {
		var stuff = [
			config.dist.root,
			config.tmp.root
		];
		del.sync(stuff, { force: true });
	});
};
