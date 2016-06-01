
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var babel      = require('gulp-babel');


gulp.task('sass', function () {
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


gulp.task('js', function () {
  gulp.src('src/js/components.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['stringify'],
    }))
    .pipe(babel({
			presets: [ 'es2015', 'stage-0']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});


gulp.task('watch', ['default'], function () {
	livereload.listen({ start: true });
  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch(['src/js/**/*.js'], ['js']);
});


gulp.task('default', ['sass', 'js']);
