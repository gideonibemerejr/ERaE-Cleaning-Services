const gulp = require('gulp'),
    sass = require('gulp-sass');

const browserSync = require("browser-sync")

const paths = {
    styles: {
        src: "src/css/*.scss",
    },
    markup: {
        src: 'src/*.html'
    },
    dest: "dist"
}
function style() {
    return gulp
            .src(paths.styles.src)
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest(paths.dest))
}

function markup() {
    return gulp
            .src(paths.markup.src)
            .pipe(gulp.dest(paths.dest))
}

function watchStyle() {
    gulp.watch(paths.styles.src, style)
}

function watchMarkup() {
    gulp.watch(paths.markup.src, markup).on("change", browserSync.reload)
}

const compile = gulp.parallel(markup, style)

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
