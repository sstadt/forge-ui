
var gulp        = require('gulp');
var serve       = require('gulp-serve');
var runSequence = require('run-sequence');
var opn         = require('opn');

require('require-dir')('./gulp/tasks');

gulp.task('default', ['docs', 'styles', 'scripts']);

gulp.task('serve', serve());

gulp.task('dev', function () {
  var tasks = [
    'default',
    'serve'
  ];

  runSequence(tasks, function () {
    opn('http://localhost:3000');
    gulp.watch(['src/**/*.scss'], ['styles']);
    gulp.watch(['src/js/**/*.js', 'src/js/**/*.html'], ['scripts']);
    gulp.watch(['docs/**/*'], ['docs']);
  });
});
