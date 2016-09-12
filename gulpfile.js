// require
var gulp        = require('gulp');
var del         = require('del');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var aigis       = require('gulp-aigis');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// setting path
var configPath = './config.yml';
var srcDir     = './src/';
var tmpSrcDir  = './.tmp_src/';
var dstDir     = './gh-pages/';
var tmpDstDir  = './.tmp_dst/';

// watch list
var watchList = [
  configPath,
  srcDir + 'assets/**/*',
  srcDir + 'docs/**/*',
  srcDir + 'template_jade/**/*.jade'
];

// pepagis css path
var pepagisCssSrc  = srcDir + 'scss/**/*.scss';
var pepagisCssDest = tmpSrcDir + 'assets/stylesheets/';

// framework css path
var frameworkCssSrc  = '../pepabo.css-framework/project_sho/stylesheets/scss/**/*.scss';
var frameworkCssDocs = tmpSrcDir + 'docs/framework/';
var frameworkCssDest = tmpSrcDir + 'assets/stylesheets/framework/';

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
    'dst-copy',
    'sync',
    'sync-reload'
  );
});

gulp.task('rebuild-pepagis-css', function(){
  runSequence(
    'pepagis-css-comp',
    'aigis',
    'dst-copy',
    'sync-reload'
  );
});

gulp.task('rebuild-framework-css', function(){
  runSequence(
    'framework-docs-comp',
    'framework-css-comp',
    'aigis',
    'dst-copy',
    'sync-reload'
  );
});

gulp.task('rebuild', function(){
  runSequence(
    'aigis',
    'dst-copy',
    'sync-reload'
  );
});

gulp.task('aigis', function(){
  return gulp.src(configPath)
  .pipe(aigis());
});

gulp.task('dst-copy', ['dst-clean'], function(){
  return gulp.src(tmpDstDir + '**/*', {base: tmpDstDir})
  .pipe(gulp.dest(dstDir));
});
gulp.task('dst-clean', del.bind(null, dstDir + '**/*'));

gulp.task('sync', function(){
  return browserSync({
    server: {
      baseDir: dstDir,
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
