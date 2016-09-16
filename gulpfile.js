// require
var gulp        = require('gulp');
var del         = require('del');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var aigis       = require('gulp-aigis');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// setting path
// var frameworkDir = '../pepabo.css-framework/project-osan/';
var frameworkDir = '../pepabo.css-framework/project-sho/';
var configPath   = './config.yml'; // pepagis 設定ファイル
var srcDir       = './src/';
var tmpSrcDir    = './.tmp_src/';  // scss コンパイル css と、framework からのコピー
var dstDir       = './docs/';  // pepagis 自動コンパイルディレクトリ（公開用）

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
var frameworkCssSrc   = frameworkDir + 'stylesheets/scss/**/*.scss';
var frameworkCssDest  = tmpSrcDir + 'assets/framework/stylesheets/';
var frameworkCssDocs  = tmpSrcDir + 'docs/';

// framework images path
var frameworkImagesSrc  = frameworkDir + 'images/**/*';
var frameworkImagesDest = tmpSrcDir + 'assets/framework/images/';

// ------------------------------------------------------------
// task
gulp.task('default', ['build'], function(){
  gulp.watch(watchList,          ['rebuild']);
  gulp.watch(pepagisCssSrc,      ['rebuild-pepagis-css']);
  gulp.watch(frameworkCssSrc,    ['rebuild-framework-css']);
  gulp.watch(frameworkImagesSrc, ['rebuild-framework-images']);
});

gulp.task('build', function(){
  runSequence(
    'pepagis-css-comp',
    'framework-docs-comp',
    'framework-css-comp',
    'framework-images-copy',
    'aigis',
    'sync',
    'sync-reload'
  );
});

gulp.task('rebuild', function(){
  runSequence(
    'aigis',
    'sync-reload'
  );
});

gulp.task('rebuild-pepagis-css', function(){
  runSequence(
    'pepagis-css-comp',
    'aigis',
    'sync-reload'
  );
});

gulp.task('rebuild-framework-css', function(){
  runSequence(
    'framework-docs-comp',
    'framework-css-comp',
    'aigis',
    'sync-reload'
  );
});

gulp.task('rebuild-framework-images', function(){
  runSequence(
    'framework-images-copy',
    'aigis',
    'sync-reload'
  );
});

gulp.task('aigis', function(){
  return gulp.src(configPath)
  .pipe(aigis());
});

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

// Pepagis の Sass を CSS にコンパイル
gulp.task('pepagis-css-comp', ['pepagis-css-clean'], function(){
  return gulp.src(pepagisCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(pepagisCssDest));
});
gulp.task('pepagis-css-clean', del.bind(null, pepagisCssDest + '**/*'));

// CSS フレームワークの Sass からドキュメント作成
gulp.task('framework-docs-comp', ['framework-docs-clean'], function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(gulp.dest(frameworkCssDocs));
});
gulp.task('framework-docs-clean', del.bind(null, frameworkCssDocs + '**/*'));

// CSS フレームワークの Sass を CSS にコンパイル
gulp.task('framework-css-comp', ['framework-css-clean'], function(){
  return gulp.src(frameworkCssSrc)
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(frameworkCssDest));
});
gulp.task('framework-css-clean', del.bind(null, frameworkCssDest + '**/*'));

// CSS フレームワークの images をコピー
// (しまった、本来はパスも書き換えねばならない...)
gulp.task('framework-images-copy', ['framework-images-clean'], function(){
  return gulp.src(frameworkImagesSrc)
  .pipe(gulp.dest(frameworkImagesDest));
});
gulp.task('framework-images-clean', del.bind(null, frameworkImagesDest + '**/*'));
