
var gulp       = require('gulp');
var rename     = require('gulp-rename');
var uglifyJS   = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var webpack    = require('gulp-webpack');

gulp.task('scripts', function () {
  gulp.src('src/js/forge-ui.js')
    .pipe(sourcemaps.init())
    .pipe(webpack(require('../../webpack.config.js')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(uglifyJS())
    .pipe(rename('forge-ui.min.js'))
    .pipe(gulp.dest('dist/js'));
});
