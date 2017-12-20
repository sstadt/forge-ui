
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var uglifyJS    = require('gulp-uglify');
var uglifyCSS   = require('gulp-uglifycss');
var sourcemaps  = require('gulp-sourcemaps');
var serve       = require('gulp-serve');
var webpack     = require('gulp-webpack');
var livereload  = require('gulp-livereload');
var frontMatter = require('yaml-front-matter');
var handlebars  = require('gulp-compile-handlebars');
var runSequence = require('run-sequence');
var opn         = require('opn');
var fs          = require('fs');
var Server      = require('karma').Server;

var sections = [
  'css-components',
  'css-mixins',
  'css-functions',
  'vue-components',
  'form-validation',
  'customizing-forge'
];

gulp.task('sass', function () {
  return gulp.src('src/sass/forge-ui.scss')
    .pipe(sass({includePaths: require('node-normalize-scss').includePaths}).on('error', sass.logError))
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


gulp.task('docs', function () {
  let docsData = { sections: [] };

  sections.forEach((section) => {
    let sectionData = frontMatter.loadFront(`./docs/${section}/_section.html`);
    let pageList = fs.readdirSync(`./docs/${section}/pages`);

    sectionData.pages = [];

    pageList.forEach((page) => {
      let pageData = frontMatter.loadFront(`./docs/${section}/pages/${page}`);
      sectionData.pages.push(pageData);
    });

    sectionData.pages.sort(function (p, c) {
      if (p.index === c.index) return 0;
      return (p.index > c.index) ? 1 : -1;
    });

    docsData.sections.push(sectionData);
  });

  gulp.src('./docs/index.hb')
    .pipe(handlebars(docsData))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});


gulp.task('serve', serve());


gulp.task('dev', function () {
  var tasks = [
    'default',
    'serve'
  ];

  runSequence(tasks, function () {
    opn('http://localhost:3000');
    livereload.listen({ start: true });
    gulp.watch(['src/**/*.scss'], ['sass']);
    gulp.watch(['src/js/**/*.js', 'src/js/**/*.html'], ['js']);
    gulp.watch(['docs/**/*'], ['docs']);
  });
});


gulp.task('default', ['docs', 'sass', 'js']);
