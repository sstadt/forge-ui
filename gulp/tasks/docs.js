
var gulp       = require('gulp');
var inlineSrc  = require('gulp-inline-source');
var handlebars = require('gulp-compile-handlebars');
var rename     = require('gulp-rename');
var svgstore   = require('gulp-svgstore');
var inject     = require('gulp-inject');
var util       = require('../util.js');

gulp.task('docs', function () {
  let docsData = util.compileDocsData();
  let svgs = gulp.src('src/icons/*.svg').pipe(svgstore({ inlineSvg: true }));

  function fileToString(filePath, file) {
    return file.contents.toString();
  }

  gulp.src('./docs/index.hb')
    .pipe(handlebars(docsData))
    .pipe(inlineSrc({ handlers: [ util.transpileString ] }))
    .pipe(inject(svgs, { transform: fileToString }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});
