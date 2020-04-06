const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rimraf = require('rimraf');
const babel = require('gulp-babel')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');


let path = {
    build: { 
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        icons: 'dist/icons/',
        fonts: 'dist/fonts/',
        mailer: 'dist/mailer/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/*.js',
        jsmin: ['src/js/*.js', 'src/js/*min.js'],
        Sass: 'src/scss/**/*.+(scss|sass)',
        icons: 'src/icons/**/*.+(png|svg)', 
        img: 'src/img/**/*.+(jpg|jpeg|png)', 
        fonts: 'src/fonts/**/*.*',
        mailer: 'src/mailer/**/*.php'
    },
    watch: { 
        html: 'dist/*.html',
        js: 'dist/js/**/*.js',
        style: 'dist/scss/**/*.+(scss|sass|css)'
    }
}

//Server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

//Sass
gulp.task('styles', function() {
    return gulp.src(path.src.Sass)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: '',
                suffix: '.min',
            }))
            .pipe(autoprefixer({
                browsers: ['last 4 versions']
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream());
});

//html
gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.build.html));
});

//scripts js
gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

//js min
gulp.task('jsmin', function () {
    return gulp.src(path.src.jsmin)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.js));
});

//fonts
gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

//icons
gulp.task('icons', function () {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.build.icons));
});

//mailer
gulp.task('mailer', function () {
    return gulp.src(path.src.mailer)
        .pipe(gulp.dest(path.build.mailer));
});

//images
gulp.task('images', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(path.build.img));
});

//watch
gulp.task('watch', function() {
    gulp.watch(path.watch.style, gulp.parallel('styles'));
    gulp.watch(path.watch.html).on('change', gulp.parallel('html'));
    gulp.watch(path.watch.js).on('change', gulp.parallel('jsmin', 'js'));
});

// clean
gulp.task('clean', function() {
    return del.sync('dist');
});

//default
gulp.task('default', gulp.parallel('watch', 'clean', 'server', 'html', 'styles', 'jsmin', 'js', 'icons', 'images', 'fonts', 'mailer'));




