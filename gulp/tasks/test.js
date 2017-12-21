
var gulp   = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done).start();
});
