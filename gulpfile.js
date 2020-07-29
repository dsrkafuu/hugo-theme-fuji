const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
sass.compiler = require('sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV;

// Clean files generated in last build
function clean() {
  try {
    fs.rmdirSync(path.resolve(__dirname, 'static/assets/css'), { recursive: true });
  } catch (e) {}
  try {
    fs.rmdirSync(path.resolve(__dirname, 'static/assets/js'), { recursive: true });
  } catch (e) {}
  return Promise.resolve();
}

// Build js
function js() {
  let src = gulp.src('./assets/js/fuji.js');
  if (env === 'development') {
    src = src.pipe(sourcemaps.init());
  }
  src = src.pipe(babel({ presets: ['@babel/env'] })).pipe(uglify());
  if (env === 'development') {
    src = src.pipe(sourcemaps.write('.'));
  }
  src = src.pipe(gulp.dest('./static/assets/js'));
  return src;
}

// Build css
function css() {
  let src = gulp.src('./assets/scss/fuji.scss');
  if (env === 'development') {
    src = src.pipe(sourcemaps.init());
  }
  src = src
    .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ rebase: false }));
  if (env === 'development') {
    src = src.pipe(sourcemaps.write('.'));
  }
  src = src.pipe(gulp.dest('./static/assets/css'));
  return src;
}

function endprocess() {
  // Rename files
  try {
    fs.renameSync(
      path.resolve(__dirname, 'static/assets/css/fuji.css'),
      path.resolve(__dirname, 'static/assets/css/fuji.min.css')
    );
  } catch (e) {}
  try {
    fs.renameSync(
      path.resolve(__dirname, 'static/assets/js/fuji.js'),
      path.resolve(__dirname, 'static/assets/js/fuji.min.js')
    );
  } catch (e) {}
  return Promise.resolve();
}

exports.compile = gulp.series(clean, gulp.parallel(css, js), endprocess);

// Live compile when development
function watch() {
  gulp.watch('assets/js/*.js', { delay: 1000 }, gulp.series(js, endprocess));
  gulp.watch('assets/**/*.scss', { delay: 1000 }, gulp.series(css, endprocess));
}

exports.dev = gulp.series(clean, gulp.parallel(css, js), endprocess, watch);
