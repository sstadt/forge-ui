
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var uglifyJS   = require('gulp-uglify');
var uglifyCSS  = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var webpack    = require('gulp-webpack');
var Server     = require('karma').Server;


gulp.task('sass', function () {
  return gulp.src('src/sass/forge-ui.scss')
    .pipe(sass({includePaths: ['./node_modules/foundation-sites/scss']}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(uglifyCSS())
    .pipe(rename('forge-ui.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});


gulp.task('js', function () {
  gulp.src('src/js/forge-ui.js')
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(uglifyJS())
    .pipe(rename('forge-ui.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});


gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('watch', ['default'], function () {
	livereload.listen({ start: true });
  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch(['src/js/**/*.js', 'src/js/**/*.html'], ['js']);
});


gulp.task('default', ['sass', 'js']);
