const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const jquery = require('jquery');


let path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        img: 'build/icons/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/[^_]*.html', 
        js: 'src/js/*.js', 
        styleSass: 'src/scss/**/*.+(scss|sass)', 
        img: 'src/images/**/*.{jpg,jpeg,png}', 
        fonts: 'src/fonts/**/*.*',
        cssCompile: 'src/css/**/*.*',
        css: 'src/css/'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.+(scss|sass)',
    },
    clean: './build'
}

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
    return gulp.src(path.src.styleSass)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: '',
                suffix: '.min',
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(path.src.css))
            .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
    gulp.watch(path.watch.style, gulp.parallel('styles'));
    gulp.watch(path.src.html).on('change', browserSync.reload);
});

//jquery-slick
gulp.task('jquery-slick', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js',
      './node_modules/slick-carousel/slick/slick.min.js'
    ])
        .pipe(concat('slick.min.js'))
        .pipe(gulp.dest('src/js'));
});


//gulp dist------------------------------------------------------------------------
gulp.task('html:build', function () {
    return gulp.src(path.src.html)
    .pipe(gulp.dest('build'));
});

gulp.task('styles:build', function() {
    return gulp.src(path.src.cssCompile)
            .pipe(concat('style.min.css'))
            .pipe(gulp.dest(path.build.css));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//default
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

//run build 
gulp.task('build', gulp.parallel('clean', 'html:build', 'fonts:build', 'styles:build', 'js:build', 'jquery-slick'));




