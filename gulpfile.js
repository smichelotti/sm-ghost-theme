var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    zip = require('gulp-zip'),
    cmq = require('gulp-combine-media-queries');

gulp.task('bundle-minify-js', function () {
  return gulp.src(['assets/js/*.js', '!assets/js/app.js'])
    .pipe(uglify())
	.pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('styles-build', function() {
  //return gulp.src('assets/css/main.css')
  return gulp.src(['assets/css/main.css', 'assets/css/shThemeDefault.css', 'assets/css/shCore.css'])
    //.pipe(cmq())
	.pipe(cssmin())
    //.pipe(concat('main_built.css'))
    .pipe(concat('main.min.css'))
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
})

//gulp.task('default', ['bundle-minify-js', 'styles-build']);

gulp.task('build-all', ['bundle-minify-js', 'styles-build'], function () {
  var source = [
    './assets/**/*',
    './partials/**/*',
    '*.hbs'
  ];
  return gulp
    .src(source, {base: './'})
    .pipe(gulp.dest('dist'))
		.pipe(zip('sm-ghost-theme.zip'))
		.pipe(gulp.dest('./'));
})

gulp.task('default', ['build-all']);
