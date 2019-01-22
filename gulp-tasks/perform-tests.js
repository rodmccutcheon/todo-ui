// jshint node: true

'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var karmaServer = require('karma').Server;
var glob = require('glob');

module.exports = function(config) {

    gulp.task('prepare-tests', ['clean'], function() {
        return browserify({ entries: glob.sync(config.test.unit.scripts) })
            .plugin(tsify)
            .bundle()
            .pipe(source(config.test.unit.out))
            .pipe(gulp.dest(config.test.unit.tmp.root));
    });

    gulp.task('unit-test', ['prepare-tests'], function(done) {
        new karmaServer({
            reporters: ['progress', 'coverage', 'dots', 'junit'],
            junitReporter: { outputDir: 'karma-results', outputFile: 'karma-results.xml' },
            browsers: ['PhantomJS'],
            frameworks: ["jasmine"],
            files: config.test.unit.files,
            singleRun: true
        }, function() {
            done();
        }).start();
    });

    gulp.task('e2e-test', ['unit-test'], function() {
        // protractor
    });

};
