const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const less = require("gulp-less");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

function css() {
  return gulp
    .src("../themes/index.less")
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie > 8"]
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("blue-ui.css"))
    .pipe(gulp.dest("../dist/styles"));
}

function fonts() {
  return gulp
    .src("../themes/fonts/fonts/*.{eot,svg,ttf,woff,woff2}")
    .pipe(gulp.dest("../dist/styles/fonts"));
}

gulp.task("default", gulp.series(css, fonts));
