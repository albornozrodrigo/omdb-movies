// Dependencies
var gulp = require('gulp');
var bower = require('bower');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var clear = require('rimraf');

var paths = {
  lib: './bower_components',
  views: './views',
  build: {
    main: './build',
    img: './build/img',
    sass: './build/sass',
    css: './build/css',
    js: './build/js',
    fonts: './build/fonts',
  },
  assets: {
    main: './assets',
    img: './assets/img',
    css: './assets/css',
    js: './assets/js',
    fonts: './assets/fonts',
  }
};

var files = {
  sass: [
    paths.build.sass + '/app.scss',
  ],
  css: [
    paths.lib + '/material-design-lite/material.min.css'
  ],
  js: [
    paths.lib + '/angular/angular.min.js',
    paths.lib + '/angular-route/angular-route.min.js',
    paths.lib + '/angular-animate/angular-animate.min.js',
    paths.lib + '/angular-resource/angular-resource.min.js',
    paths.lib + '/material-design-lite/material.min.js',
    paths.lib + '/angular-simple-local-storage/dist/ng-storage.min.js',
    paths.lib + '/konami-js/konami.js',
    paths.lib + '/matrix-easter-egg/dist/matrix.min.js'
  ],
  fonts: []
};

gulp.task('sass', function(done) {
  gulp.src(files.sass)
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(rename({ basename: "app", extname: '.min.css' }))
  .pipe(gulp.dest(paths.assets.css))
  .on('end', done);
});

gulp.task('copy-css', function(done) {
  gulp.src(files.css)
  .pipe(gulp.dest(paths.assets.css))
  .on('end', done);
});

gulp.task('copy-js', function(done) {
  gulp.src(paths.build.js + '/app/**/*.js')
  .pipe(gulp.dest(paths.assets.js + '/app'))

  gulp.src(files.js)
  .pipe(gulp.dest(paths.assets.js + '/vendor'))
  .on('end', done);
});

gulp.task('copy-fonts', function(done) {
  gulp.src(files.fonts)
  .pipe(gulp.dest(paths.assets.fonts))
  .on('end', done);
});

gulp.task('copy-img', function(done) {
  gulp.src(paths.build.img + '/**')
  .pipe(gulp.dest(paths.assets.img))
  .on('end', done);
});

gulp.task('lint', function() {
  gulp.src(paths.build.js + '/app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('clear', function() {
  clear.sync(paths.assets.css);
  clear.sync(paths.assets.js);
  clear.sync(paths.assets.img);
  clear.sync(paths.assets.fonts);
});

gulp.task('setup', ['clear'], function() {
  gulp.start('sass', 'copy-css', 'copy-js', 'copy-img', 'copy-fonts');
});

gulp.task('watch', function() {
  gulp.start('setup');
  gulp.watch(paths.build.main + '/**', ['setup']);
});

gulp.task('default', ['lint'], function() {
  gulp.start('setup');
});