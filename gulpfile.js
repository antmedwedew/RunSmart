const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


//Server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

//Sass
gulp.task('styles', function() {
    return gulp.src("src/scss/base/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: '',
                suffix: '.min',
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
    gulp.watch('src/scss/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

//default
gulp.task('default', gulp.parallel('watch', 'server', 'styles'))