var gulp = require('gulp'),
    connect = require('gulp-connect'),

    cache = require('gulp-cached'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),

    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),

    imagemin = require('gulp-imagemin'),

    destinations = {
		  js: 'build/js/',
      docs: 'build/',
      css: 'build/css/',
      images: 'build/img/',
      fonts: 'build/css/fonts/'
    };

/* ERROR */
function errorNotify(error){
  // Notification
  notify.onError("Error: <%= error.message %>")
  // Log to console
  util.log(util.colors.red('Error'), error.message);
}

/* SERVER */
gulp.task('connect', function() {
  connect.server({
    root: '.',
    port: 8008,
    livereload: false
  });
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload())
    .pipe(notify({ message: 'HTML task complete' }));
});

/* STYLES */
gulp.task('styles', function() {
  return gulp.src('src/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .on('error', errorNotify)
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(destinations.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .on('error', errorNotify)
    .pipe(gulp.dest(destinations.css))
    .pipe(connect.reload())
    .on('error', errorNotify)
    .pipe(notify({ message: 'Styles task complete' }));
});

/* SCRIPT */
gulp.task('script', function() {
  return gulp.src('src/scripts/main.js')
    .pipe(jshint())
    .on('error', errorNotify)
    .pipe(gulp.dest(destinations.js))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', errorNotify)
    .pipe(gulp.dest(destinations.js))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Script task complete' }));
});

/* LIB */
gulp.task('lib', function() {
  return gulp.src('src/libs/*.js')
  	.pipe(concat('lib.js'))
    .pipe(gulp.dest(destinations.js))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', errorNotify)
    .pipe(gulp.dest(destinations.js))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Lib task complete' }));
});

/* IMAGES */
gulp.task('images', function () {
    return gulp.src('src/images/*.*')
    .pipe(cache('images'))
    .pipe(imagemin())
    .on('error', errorNotify)
    .pipe(gulp.dest(destinations.images))
		.pipe(notify({ message: 'Images task complete' }));
});

/* WATCH */
gulp.task('watch', function() {

  gulp.watch('src/styles/main.styl', ['styles']);
  gulp.watch('src/scripts/main.js', ['script']);
  gulp.watch('src/libs/*.js', ['lib']);
  gulp.watch('src/images/*.*', ['images']);
  gulp.watch('index.html', ['html']);

});

/*DEFAULT TASK*/
gulp.task('default', ['connect', 'watch']);