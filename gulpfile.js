var pipeline = require('readable-stream').pipeline;
var del = require('del');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rename = require('gulp-rename');

function devJs() {
    return pipeline(
        gulp.src('assets/js/fuji.js'),
        sourcemaps.init(),
        babel({
            presets: ['@babel/env'],
        }),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest('static/assets/js/')
    );
}

function devCss() {
    return pipeline(
        gulp.src('assets/scss/fuji.scss'),
        sourcemaps.init(),
        sass(),
        postcss([autoprefixer()]),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest('static/assets/css/')
    );
}

function js() {
    return pipeline(
        gulp.src('assets/js/fuji.js'),
        babel({
            presets: ['@babel/env'],
        }),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('static/assets/js/')
    );
}

function css() {
    return pipeline(
        gulp.src('assets/scss/fuji.scss'),
        sass(),
        postcss([autoprefixer(), cssnano()]),
        rename({ suffix: '.min' }),
        gulp.dest('static/assets/css/')
    );
}

function clean() {
    return del(['static/assets/css/fuji.min.css.map', 'static/assets/js/fuji.min.js.map']);
}

exports.build = gulp.parallel(js, css, clean);
exports.devJs = function () {
    devJs();
    return gulp.watch('assets/js/fuji.js', { delay: 500 }, devJs);
};
exports.devCss = function () {
    devJs();
    return gulp.watch('assets/**/*.scss', { delay: 500 }, devCss);
};
