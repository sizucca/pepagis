// require
var gulp        = require('gulp');
var aigis       = require('gulp-aigis');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cssmin      = require('gulp-cssmin');
var plumber     = require('gulp-plumber');

// setting path
var configPath   = './pepagis_stuffs/config.yml';
var templatePath = './pepagis_stuffs/template_jade/**/*.jade';
var cssPath      = './pepagis_stuffs/assets/stylesheets/**/*.css';

// compile path
var cssFrameworkSrc  = '../pepabo.css-framework/project_sizucca/stylesheets/scss/**/*.scss';
var cssFrameworkDest = './pepagis_stuffs/assets/stylesheets/css/framework/';

// task list
gulp.task('default', ['browser-sync'], function(){
  gulp.watch(configPath,      ['aigis', 'bs-reload']);
  gulp.watch(templatePath,    ['aigis', 'bs-reload']);
  gulp.watch(cssFrameworkSrc, ['sass']);
  gulp.watch(cssPath,         ['aigis', 'bs-reload']);
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './public_html/',
      index  : 'index.html'
    }
  });
});

gulp.task('bs-reload', function(){
  browserSync.reload();
});

gulp.task('aigis', function() {
  return gulp.src(configPath)
  .pipe(aigis());
});

gulp.task('sass', function(){
  return sass(cssFrameworkSrc, {
    style: 'expanded',
    bundleExec: true
  })
  .pipe(plumber())
  .pipe(cssmin())
  .pipe(gulp.dest(cssFrameworkDest));
});
