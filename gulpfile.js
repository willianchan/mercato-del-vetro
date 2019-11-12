// Load plugins
const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const merge = require('merge-stream');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
  done();
}

// Clean vendor
function clean() {
  return del(['./dist/vendor/']);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./dist/vendor/bootstrap'));
  // Font Awesome
  var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
    .pipe(gulp.dest('./dist/vendor'));
  // Slick
  var slick = gulp.src('./node_modules/slick-carousel/slick/**')
    .pipe(gulp.dest('./dist/vendor/slick'));
  // jQuery
  var jquery = gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./dist/vendor/jquery'));
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/**')
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));
  return merge(bootstrap, fontAwesome, slick, jquery, jqueryEasing);
}

// HTML task
function html() {
  return gulp
    .src([
      './*.html',
      '!./*.min.html'
    ])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
}

// IMAGES task
function img() {
  return gulp
    .src(
      './img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
    .pipe(browsersync.stream());
}

// CSS task
function css() {
  return gulp
    .src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch(['./css/**/*'], css);
  gulp.watch(['./js/**/*', '!./js/contact_me.js', '!./js/jqBootstrapValidation.js'], js);
  gulp.watch('./img/**/*', img);
  gulp.watch(['./*.html'], html);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js, html, img));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;