
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var uglifyCSS  = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
  return gulp.src('src/sass/forge-ui.scss')
    .pipe(sass({ includePaths: require('node-normalize-scss').includePaths }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(uglifyCSS())
    .pipe(rename('forge-ui.min.css'))
    .pipe(gulp.dest('dist/css'));
});
