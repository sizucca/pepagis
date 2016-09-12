// require
var gulp        = require('gulp');
var del         = require('del');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var aigis       = require('gulp-aigis');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// setting path
var publicDir  = './gh-pages/';
var dstDir     = './.dst/';
var srcDir     = './src/';
var tmpDir     = './src/.tmp/';
var configPath = './config.yml';

// watch list
var watchList = [
  configPath,
  srcDir + 'assets/**/*',
  srcDir + 'docs/**/*',
  srcDir + 'template_jade/**/*.jade'
];

// pepagis css path
var pepagisCssSrc  = srcDir + 'scss/**/*.scss';
var pepagisCssDest = tmpDir + 'assets/stylesheets/';

// framework css path
var frameworkCssSrc  = '../pepabo.css-framework/project_sizucca/stylesheets/scss/**/*.scss';
var frameworkCssDocs = tmpDir + 'docs/framework/';
var frameworkCssDest = tmpDir + 'assets/stylesheets/framework/';

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
    'public-copy',
    'sync'
  );
});

gulp.task('rebuild-pepagis-css', function(){
  runSequence(
    'pepagis-css-comp',
    'aigis',
    'public-copy',
    'sync-reload'
  );
});

gulp.task('rebuild-framework-css', function(){
  runSequence(
    'framework-docs-comp',
    'framework-css-comp',
    'aigis',
    'public-copy',
    'sync-reload'
  );
});

gulp.task('rebuild', function(){
  runSequence(
    'aigis',
    'public-copy',
    'sync-reload'
  );
});

gulp.task('aigis', function(){
  return gulp.src(configPath)
  .pipe(aigis());
});

gulp.task('public-copy', ['public-clean'], function(){
  return gulp.src(dstDir + '**/*', {base: dstDir})
  .pipe(gulp.dest(publicDir));
});
gulp.task('public-clean', del.bind(null, publicDir + '**/*'));

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

gulp.task('pepagis-css-comp', ['pepagis-css-clean'], function(){
  return gulp.src(pepagisCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(pepagisCssDest));
});
gulp.task('pepagis-css-clean', del.bind(null, pepagisCssDest + '**/*'));

gulp.task('framework-docs-comp', ['framework-docs-clean'], function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(gulp.dest(frameworkCssDocs));
});
gulp.task('framework-docs-clean', del.bind(null, frameworkCssDocs + '**/*'));

gulp.task('framework-css-comp', ['framework-css-clean'], function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(frameworkCssDest));
});
gulp.task('framework-css-clean', del.bind(null, frameworkCssDest + '**/*'));
