let gulp = require("gulp");
let sass = require("gulp-sass");


gulp.task("compile", function () {
    return gulp.src("./styles/*.scss").pipe(sass()).pipe(gulp.dest("./static/css/"));
});

gulp.task("watch", function () {
    gulp.watch("./styles/**/*.scss", gulp.series('compile'));
});
