var gulp         = require ('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create(),
    jade         =require('gulp-jade'),
    plumber      = require('gulp-plumber');

var js_input     = 'js/*.js',
    js_output    = 'asset/js',
    sass_input   = 'sass/*.scss',
    sass_output  = 'asset/css',
    haml_input   = './haml/*.haml',
    haml_output  = './haml',
    jade_input   = './jade/*.jade',
    jade_output  = './';
// errorLog


gulp.task('jade', function () {
  gulp.src(jade_input)
      .pipe(plumber())
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest(jade_output));
});
// minify script
gulp.task('script', function () {
  gulp.src(js_input)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest(js_output));
});
// compile sass
gulp.task('sass', function () {
  return  sass(sass_input)
          .pipe(plumber())
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(gulp.dest(sass_output))
          .pipe(browserSync.stream());
});
// browser sync
gulp.task('serve', ['sass'], function ()  {
  browserSync.init({
    server: "./"
  });
  gulp.watch(sass_input, ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
});

// gulp watch
gulp.task('watch', function ()  {
  gulp.watch(js_input , ['script']);
  gulp.watch(sass_input , ['sass']);
  gulp.watch(jade_input, ['jade']);
});

gulp.task('default', ['watch', 'script', 'sass', 'serve','jade']);
