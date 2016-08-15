
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
// var browserify = require('gulp-browserify');
// var transpile  = require('gulp-es6-module-transpiler');
// var babel      = require('gulp-babel');
var webpack    = require('gulp-webpack');
var Server     = require('karma').Server;


gulp.task('sass', function () {
  return gulp.src('src/sass/forge-ui.scss')
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
  gulp.src('src/js/forge-ui.js')
    .pipe(sourcemaps.init())
    // .pipe(browserify({
    //   transform: ['stringify'],
    //   // standalone: 'Forge'
    // }))
    // .pipe(transpile({
    //   formatter: 'bundle'
    // }))
    // .pipe(babel({
		// 	presets: [ 'es2015', 'stage-0'],
    //   plugins: ['files']
    // }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.write())
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
