var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var through = require('through2');
var XTemplate = require('xtemplate');

var src = 'src';

// es6 -> es5
gulp.task('es6', function () {
  return gulp.src(src + '/**/*.es6.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename(function (path) {
      path.basename = path.basename.slice(0, path.basename.indexOf('.'));
      return path;
    }))
    .pipe(gulp.dest(src));
});

// sass -> css(autoprefix)
gulp.task('sass', function () {
  return sass(src + '/**/*.scss')
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(src));
});

// xtemplate
// todo

// watch
gulp.task('watch', function () {
  gulp.watch(src + '/**/*.scss', ['sass']);
  gulp.watch(src + '/**/*.es6.js', ['es6']);
});


