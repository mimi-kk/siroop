var gulp = require("gulp");
var sass = require("gulp-sass");
var jade = require("gulp-jade");
var browserSync = require("browser-sync");
 
gulp.task("default", function() {
    console.log("Siroop");
});

gulp.task("sass", function() {
    return gulp.src("client/**/**/*.sass")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

gulp.task("jade", function() {
    gulp.src("client/**/**/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("build"))
});

gulp.task("server", ["jade", "sass"], function() {
    browserSync.init({
        server: {
            baseDir: ["build", "client"]
        },
        notify: false,
        open: false
    });

    gulp.watch("client/*.html").on("change", browserSync.reload);
    gulp.watch("client/**/**/*.sass", ["sass"]).on("change", browserSync.reload);
    gulp.watch("build/**/**/*.css").on("change", browserSync.reload);
});