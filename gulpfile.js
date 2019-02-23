const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cleanCss = require("gulp-clean-css"),
      sourceMaps = require("gulp-sourcemaps")

const browserSync = require("browser-sync")

const imageMin = require("gulp-imagemin")
const paths = {
    styles: {
        src: "src/css/*.scss",
    },
    markup: {
        src: "src/*.html"
    },
    images: {
        src: "src/img/*",
        dest: 'dist/img'
    },
    dest: "dist"
}
function style() {
    return gulp
            .src(paths.styles.src)
            .pipe(sourceMaps.init())
            .pipe(sass())
            .pipe(
                cleanCss({
                    compatibility: 'ie8'
                })
            )
            .on("error", sass.logError)
            .pipe(sourceMaps.write())
            .pipe(gulp.dest(paths.dest))
}

function markup() {
    return gulp
            .src(paths.markup.src)
            .pipe(gulp.dest(paths.dest))
}

function images() {
    return gulp
            .src(paths.images.src)
            .pipe(imageMin())
            .pipe(gulp.dest(paths.images.dest))
}

function watchStyle() {
    gulp.watch(paths.styles.src, style).on("change", browserSync.reload)
}

function watchMarkup() {
    gulp.watch(paths.markup.src, markup).on("change", browserSync.reload)
}

const compile = gulp.parallel(markup, style, images)

function startServer() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
}

const serve = gulp.series(compile, startServer)

const watch = gulp.parallel(watchMarkup, watchStyle)

const defaultTasks = gulp.parallel(serve, watch)

exports.default = defaultTasks
