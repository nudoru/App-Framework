var gulp        = require('gulp'),
    del         = require('del'),
    compass     = require('gulp-compass'),
    minifyCSS   = require('gulp-minify-css'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    livereload  = require('gulp-livereload');

var paths = {
  srcFonts   : 'src/fonts/**/*',
  srcImages  : 'src/img/**/*',
  srcSass    : 'src/sass/**/*',
  srcJade    : 'src/jade/**/*',
  srcScripts : 'src/scripts/**/*',
  srcJSVendor: 'src/scripts/vendor/**/*',
  srcJSNudoru: 'src/scripts/nudoru/**/*',
  srcJSNori  : 'src/scripts/nori/**/*',
  srcJSApp   : ['src/scripts/main.js', 'src/scripts/app/**/*'],
  bin        : 'bin/'
};

gulp.task('clean', function (cb) {
  del(['bin/**/*']);
  cb();
});

gulp.task('fonts', function () {
  return gulp.src(['src/fonts/**/*']).pipe(gulp.dest('bin/fonts'));
});

gulp.task('images', function () {
  return gulp.src(['src/img/**/*']).pipe(gulp.dest('bin/img'));
});

gulp.task('copyconfig', function () {
  return gulp.src(['src/scripts/config.js']).pipe(gulp.dest('bin/scripts'));
});

gulp.task('compass', function () {
  return gulp.src('src/sass/app.sass')
    .pipe(compass({
      css  : 'bin/css',
      sass : 'src/sass',
      image: 'bin/img',
      style: 'expanded'
    }))
    //.pipe(minifyCSS())
    .pipe(gulp.dest('bin/css'))
    .pipe(livereload());
});

gulp.task('jade', function () {
  return gulp.src(['src/jade/**/*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('bin/'))
    .pipe(livereload());
});


gulp.task('scripts:vendor', function () {
  return gulp.src([
    'src/scripts/vendor/gsap/TweenLite.min.js',
    'src/scripts/vendor/gsap/utils/Draggable.min.js',
    'src/scripts/vendor/gsap/TimeLineLite.min.js',
    'src/scripts/vendor/gsap/easing/EasePack.min.js',
    'src/scripts/vendor/gsap/plugins/CSSPlugin.min.js',
    'src/scripts/vendor/lodash.min.js',
    'src/scripts/vendor/rxjs/rx.lite.compat.min.js'
  ])
    .pipe(sourcemaps.init())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('libs.min.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/libs.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'));
});

gulp.task('scripts:nudorucore', function () {
  return gulp.src([
    'src/scripts/nudoru/require.js',
    'src/scripts/nudoru/globals.js',
    'src/scripts/nudoru/core/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('nudoru.core.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/nudoru.core.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('scripts:nudorubrowser', function () {
  return gulp.src(['src/scripts/nudoru/browser/*.js'])
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('nudoru.browser.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/nudoru.browser.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('scripts:nudorucomponents', function () {
  return gulp.src(['src/scripts/nudoru/components/*.js'])
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('nudoru.components.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/nudoru.components.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('scripts:nori', function () {
  return gulp.src([
    'src/scripts/nori/utils/*.js',
    'src/scripts/nori/action/*.js',
    'src/scripts/nori/service/*.js',
    'src/scripts/nori/store/*.js',
    'src/scripts/nori/view/*.js',
    'src/scripts/nori/Nori.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('nori.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/nori.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('scripts:app', function () {
  return gulp.src([
    'src/scripts/app/**/*.js',
    'src/scripts/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel())
    //.pipe(uglify({mangle: false, compress: false}))
    .pipe(concat('app.js', {newLine: '\n\n'}))
    .pipe(sourcemaps.write('maps/app.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.srcImages, ['images']);
  gulp.watch(paths.srcFonts, ['fonts']);
  gulp.watch(paths.srcSass, ['compass']);
  gulp.watch(paths.srcJade, ['jade']);
  gulp.watch(paths.srcJSVendor, ['scripts:vendor']);
  gulp.watch(paths.srcJSNudoru, ['scripts:nudorucore', 'scripts:nudorubrowser', 'scripts:nudorucomponents']);
  gulp.watch(paths.srcJSNori, ['scripts:nori']);
  gulp.watch(paths.srcJSApp, ['scripts:app']);
});

gulp.task('default', function () {
    runSequence(
      ['jade', 'compass','scripts:vendor', 'scripts:nudorucore', 'scripts:nudorubrowser', 'scripts:nudorucomponents', 'scripts:nori', 'scripts:app','fonts', 'images', 'copyconfig'],
      'watch'
    );
  }
);