const gulp = require('gulp');
const browserify = require('browserify');
// const babelify = require('babelify');
const source = require('vinyl-source-stream');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine-browser');

gulp.task('instrument', () => {
    return gulp.src('src/*.js')
    .pipe(istanbul({coverageVariable: '__COVERAGE__'}))
    .pipe(gulp.dest('build/src/'));
});

gulp.task('build', () => {
    return browserify('build/main.js')
    .bundle()
    .pipe(source('main.bundle.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('build-tests', () => {
    return browserify('test/spec.js', {paths: ['./build/src/'], debug:true})
    .bundle()
    .pipe(source('test/spec.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('run-tests', () => {
    return gulp.src('build/test/spec.js')
    .pipe(jasmine.specRunner({console: true}))
    // .pipe(jasmine.server({port: 8080}));
    .pipe(jasmine.headless());
});
