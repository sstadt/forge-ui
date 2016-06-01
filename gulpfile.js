
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');


gulp.task('sass', function() {
  return gulp.src('src/sass/myui.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./node_modules/foundation-sites/scss'],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});


gulp.task('watch', ['default'], function() {
	livereload.listen({ start: true });
  gulp.watch(['scss/**/*.scss'], ['sass']);
});


gulp.task('default', ['sass']);
