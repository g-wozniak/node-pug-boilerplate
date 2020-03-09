const gulp = require("gulp")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const rename = require('gulp-rename')
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const uglifycss = require('gulp-uglifycss')
const sourcemaps = require("gulp-sourcemaps")


function watchStyles(src, buildFn) {
  buildFn()
  gulp.watch(src, buildFn)
}

function buildStyles(entry, destination) {
  return gulp
    .src(entry)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(rename({
      suffix: '.min',
      basename: 'main'
    }))
    .pipe(gulp.dest(destination))
}

const paths = {
  watch: "./src/scss/*.scss",
  entry: "./src/scss/root.scss",
  dest: "./public/styles"
}

exports.buildStyles = () => buildStyles(paths.entry, paths.dest)

exports.watchStyles = () => watchStyles(paths.watch, buildStyles)
