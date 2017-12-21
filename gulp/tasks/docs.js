
var gulp       = require('gulp');
var inlineSrc  = require('gulp-inline-source');
var handlebars = require('gulp-compile-handlebars');
var rename     = require('gulp-rename');
var util       = require('../util.js');

gulp.task('docs', function () {
  let docsData = util.compileDocsData();

  gulp.src('./docs/index.hb')
    .pipe(handlebars(docsData))
    .pipe(inlineSrc({ handlers: [ util.transpileString ] }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});
