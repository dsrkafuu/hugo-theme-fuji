var pipeline = require('readable-stream').pipeline;
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

function js() {
    return pipeline(
        gulp.src('assets/js/fuji.js'),
        sourcemaps.init(),
        babel({
            presets: ['@babel/env'],
        }),
        uglify(),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest('static/assets/js/')
    );
}

function css() {
    return pipeline(
        gulp.src('assets/scss/fuji.scss'),
        sourcemaps.init(),
        sass(),
        postcss([autoprefixer(), cssnano()]),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest('static/assets/css/')
    );
}

exports.build = gulp.parallel(js, css);
exports.devJs = function () {
    return gulp.watch('assets/js/fuji.js', { delay: 500 }, gulp.parallel(js));
};
exports.devCss = function () {
    return gulp.watch(
        ['assets/scss/*.scss', 'assets/scss/*/*.scss', 'assets/scss/*/*/*.scss'],
        { delay: 500 },
        gulp.parallel(css)
    );
};
