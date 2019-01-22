// jshint node: true

'use strict';

var config = require('./gulp.json');
var gulp = require('gulp');

require('./gulp-tasks/clean')(config);
require('./gulp-tasks/process-resources')(config);
require('./gulp-tasks/process-templates')(config);
require('./gulp-tasks/process-stylesheets')(config);
require('./gulp-tasks/process-stylesheets-vendor')(config);
require('./gulp-tasks/process-javascript')(config);
require('./gulp-tasks/perform-tests')(config);

gulp.task('default', [
    'build',
    'serve',
    'watch'
]);

gulp.task('build', ['clean'], function () {
    return gulp.start([
        'process-javascript',
        'process-stylesheets',
        'process-javascript-vendor',
        'process-stylesheets-vendor',
        'process-templates',
        'process-resources'
    ]);
});

gulp.task('test', [
    'unit-test',
    'e2e-test'
]);

gulp.task('serve', function () {
    require('./init.js');
});

gulp.task('watch', [
    'watch-resources',
    'watch-templates',
    'watch-stylesheets',
    'watch-javascript'
]);
