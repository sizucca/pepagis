// require
var gulp        = require('gulp');
var del         = require('del');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var aigis       = require('gulp-aigis');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// setting path
var publicDir  = './public_html/';
var srcDir     = './pepagis_stuffs/src/';
var dstDir     = './pepagis_stuffs/dst/';
var configPath = './pepagis_stuffs/config.yml';

// watch list
var watchList = [
  configPath,
  srcDir + 'assets/**/*',
  srcDir + 'docs/**/*',
  srcDir + 'template_jade/**/*.jade'
];

// pepagis css path
var pepagisCssSrc  = srcDir + 'scss/**/*.scss';
var pepagisCssDest = srcDir + 'tmp/assets/stylesheets/';

// framework css path
var frameworkCssSrc  = '../pepabo.css-framework/project_sizucca/stylesheets/scss/**/*.scss';
var frameworkCssDocs = srcDir + 'tmp/docs/framework/';
var frameworkCssDest = srcDir + 'tmp/assets/stylesheets/framework/';

// ------------------------------------------------------------
// task
gulp.task('default', ['build'], function(){
  gulp.watch(watchList,       ['rebuild']);
  gulp.watch(pepagisCssSrc,   ['rebuild-pepagis-css']);
  gulp.watch(frameworkCssSrc, ['rebuild-framework-css']);
});

gulp.task('build', function(){
  runSequence(
    'pepagis-css-comp',
    'framework-docs-comp',
    'framework-css-comp',
    'aigis',
    'copy',
    'sync'
  );
});

gulp.task('rebuild-pepagis-css', function(){
  runSequence(
    'pepagis-css-comp',
    'aigis',
    'copy',
    'sync-reload'
  );
});

gulp.task('rebuild-framework-css', function(){
  runSequence(
    'framework-docs-comp',
    'framework-css-comp',
    'aigis',
    'copy',
    'sync-reload'
  );
});

gulp.task('rebuild', function(){
  runSequence(
    'aigis',
    'copy',
    'sync-reload'
  );
});

gulp.task('aigis', function(){
  return gulp.src(configPath)
  .pipe(aigis());
});

gulp.task('copy', ['clean'], function(){
  return gulp.src(dstDir + '**/*', {base: dstDir})
  .pipe(gulp.dest(publicDir));
});
gulp.task('clean', del.bind(null, publicDir + '**/*'));

gulp.task('sync', function(){
  return browserSync({
    server: {
      baseDir: publicDir,
      index  : 'index.html'
    }
  });
});

gulp.task('sync-reload', function(){
  return browserSync.reload();
});

gulp.task('pepagis-css-comp', function(){
  return gulp.src(pepagisCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(pepagisCssDest));
});

gulp.task('framework-docs-comp', function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(gulp.dest(frameworkCssDocs));
});

gulp.task('framework-css-comp', function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(frameworkCssDest));
});
