
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('src/sass/base.scss')
    .pipe(sass({
      includePaths: ['src/sass', 'node_modules/foundation-sites/scss']
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
