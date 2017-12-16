const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

gulp.task('html', function() {
gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
gulp
    .src([
        './src/styles/main.less',
        './src/styles/**/*.css'
        // './node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(concat('build.css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'css'], function(){
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(['./src/styles/**/*.css', './src/styles/**/*.less'], ['css']);
    gulp.watch('./src/index.html', ['html']);
});
gulp.task('default', ['watch']);
