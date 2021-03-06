var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');
var bundleLogger = require('../util/bundleLogger');

gulp.task('browserify', function() {

    var bundleMethod = global.isWatching ? watchify : browserify;

    var bundler = bundleMethod(
        ['./js/app.jsx'],
        {extensions: ['.jsx']}
    );

    var bundle = function() {
        bundleLogger.start();

        return bundler
            .bundle({debug: true})
            .on('error', handleErrors)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/js/'))
            .on('end', bundleLogger.end);
    };

    if (global.isWatching) {
        bundler.on('update', bundle);
    }

    return bundle();
});
