var gulp           = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var filter         = require('gulp-filter');
var cleanCSS       = require('gulp-clean-css');
var sourcemaps     = require('gulp-sourcemaps');
var flatten        = require('gulp-flatten');
var webpackConfig  = require('./webpack.config.js');
var webpack        = require('webpack-stream')
var ngAnnotate     = require('gulp-ng-annotate');
var eslint         = require('gulp-eslint');
var order          = require("gulp-order");
var ngHtml2Js      = require("gulp-ng-html2js");
var minifyHtml     = require("gulp-minify-html");

gulp.task('bower.js', function () {
    var filterJS = filter('**/*.js');
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js/'))
        ;
});

gulp.task('bower.fonts', function () {
    var filterFonts = filter('**/*.{otf,eot,svg,ttf,woff,woff2}');
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterFonts)
        .pipe(flatten())
        .pipe(gulp.dest('./public/fonts/'));
});


gulp.task('bower.css', function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filter("**/*.css"))
        .pipe(order([
            '**/bootstrap.min.css',
            '**/!(bootstrap)*.css',
        ]))
        //.pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('angular',function(){
    return gulp.src(['./angular/**/**.js'])
           .pipe(eslint())
           .pipe(eslint.format())
           .pipe(sourcemaps.init())
           .pipe(webpack(webpackConfig))
           .pipe(ngAnnotate())
           .pipe(uglify())
           .pipe(sourcemaps.write())
           .pipe(gulp.dest('./public/js/'));
});

gulp.task('partials' , function(){
     return gulp.src("./angular/**/*.html")
            .pipe(minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(ngHtml2Js({
                moduleName: "app.partials"
                //prefix: "/partials/"
            }))
            .pipe(concat("partials.js"))
            .pipe(uglify())
            .pipe(gulp.dest("./public/js"));
});

gulp.task('watch' , function(){
    gulp.watch('./angular/**/**.js' , ['angular']);
    gulp.watch('./angular/**/**.html' , ['partials']);
});




gulp.task('default', ['bower.js', 'bower.css' , 'bower.fonts' , 'angular','partials']);