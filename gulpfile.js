var gulp        = require('gulp'),
    del         = require('del'),
    compass     = require('gulp-compass'),
    minifyCSS   = require('gulp-minify-css'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    livereload  = require('gulp-livereload'),
    bump        = require('gulp-bump');

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

// .on('error', errorLog)
function errorLog(error) {
  console.error.bind(error);
  console.log(error);
  this.emit('end');
}

gulp.task('clean', function (cb) {
  del(['bin/**/*']);
  cb();
});

gulp.task('bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .on('error', errorLog)
    .pipe(gulp.dest('./'));
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
    .on('error', errorLog)
    //.pipe(minifyCSS())
    .pipe(gulp.dest('bin/css'))
    .pipe(livereload());
});

gulp.task('jade', function () {
  return gulp.src(['src/jade/**/*.jade'])
    .pipe(jade({pretty: true}))
    .on('error', errorLog)
    .pipe(gulp.dest('bin/'))
    .pipe(livereload());
});

gulp.task('concatglobals', function () {
  return gulp.src([
    'src/scripts/vendor/gsap/TweenLite.min.js',
    'src/scripts/vendor/gsap/utils/Draggable.min.js',
    'src/scripts/vendor/gsap/TimeLineLite.min.js',
    'src/scripts/vendor/gsap/easing/EasePack.min.js',
    'src/scripts/vendor/gsap/plugins/CSSPlugin.min.js',
    'src/scripts/vendor/moment.min.js',
    //'src/scripts/vendor/pikaday.js',
    //'src/scripts/vendor/selected.js',
    'src/scripts/nudoru/globals.js'
  ])
    //.pipe(sourcemaps.init())
    .pipe(uglify({mangle: false, compress: true}))
    .on('error', errorLog)
    .pipe(concat('libs.min.js', {newLine: '\n\n'}))
    //.pipe(sourcemaps.write('maps/libs.map', {addComment: false}))
    .pipe(gulp.dest('bin/scripts'));
});

gulp.task('jshint', function () {
  return gulp.src(['src/scripts/nudoru/**/*', 'src/scripts/nori/**/*', 'src/scripts/app/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('browserify', function () {
  return browserify('src/scripts/main.js', {debug: false})
    .transform(babelify.configure({modules: "common"}))
    .on('error', errorLog)
    .bundle()
    .on('error', errorLog)
    .pipe(source('app.bundle.js'))
    //.pipe(buffer())
    //.pipe(uglify({mangle: false, compress: false}))
    //.on('error', errorLog)
    .pipe(gulp.dest('bin/scripts'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.srcImages, ['images']);
  gulp.watch(paths.srcFonts, ['fonts']);
  gulp.watch(paths.srcSass, ['compass']);
  gulp.watch(paths.srcJade, ['jade']);
  gulp.watch(paths.srcJSVendor, ['concatglobals']);
  gulp.watch(['src/scripts/nudoru/**/*', 'src/scripts/nori/**/*', 'src/scripts/main.js', 'src/scripts/app/**/*'], ['browserify']);
});

gulp.task('default', function () {
    runSequence(
      ['jade', 'compass', 'concatglobals', 'browserify', 'fonts', 'images', 'copyconfig', 'jshint'],
      'watch'
    );
  }
);