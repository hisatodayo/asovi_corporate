const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('browser-sync', done => {
  browserSync({
      server: {
          baseDir: "./dist/"
      }
  });
  done();
});

const pugOptions = {
  pretty: true,
  basedir: "./src/"
};
gulp.task("pug", done => {
  gulp
    .src("src/**/*.pug")
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist/"));
  done();
});

const scssOptions = {
  outputStyle: "expanded"
};
gulp.task("scss", done => {
  gulp
    .src("src/scss/*scss")
    .pipe(plumber())
    .pipe(sass(scssOptions))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist/css/"))
  done();
})

gulp.task("watch", done => {
  gulp.watch("src/scss/*.scss", gulp.task("scss"))
  gulp.watch("src/**/*.pug", gulp.task("pug"))
  done();
})

gulp.task("default", gulp.series(
  gulp.parallel(
    "scss",
    "pug"
  ),
  "watch",
  "browser-sync"
))