'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
/*var imagemin = require('gulp-imagemin');
 var pngquant = require('imagemin-pngquant');*/
var cache = require('gulp-cache');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var jeditor = require("gulp-json-editor");
var debug = require('gulp-debug');
var del = require('del');
var config = require('./project.json');

var DEST = 'publish/html5/';

var sourceCodeList = [];

gulp.task('default', ['compileJs', 'copyIndex', 'copyConf', 'image'], function () {
});

gulp.task('clean', function () {
    return del(['publish']);
});

gulp.task('compileJs', ['clean'], function () {
    sourceCodeList.push('lib/cocos2d-js-v3.10.js');
    sourceCodeList = sourceCodeList.concat(config.jsList);
    sourceCodeList.push('main.js');

    return gulp.src(sourceCodeList)
        .pipe(debug({title: 'src:'}))
        .pipe(concat('game.js'))
        //.pipe(buffer())
        //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(DEST))
        .pipe(uglify())
        .pipe(rename('game.min.js'))
        .pipe(gulp.dest(DEST));
});

gulp.task('copyIndex', ['clean'], function () {
    return gulp.src('index.html')
        .pipe(replace('lib/cocos2d-js-v3.10.js', 'game.min.js'))
        .pipe(replace('<script cocos src="main.js"></script>', ''))
        .pipe(gulp.dest(DEST));
});

gulp.task('copyConf', ['clean'], function () {
    return gulp.src("project.json")
        .pipe(jeditor(function (json) {
            json.version = "0.0.3";
            json.debugMode = 1;
            json.frameRate = 60;
            json.id = 'gameCanvas';
            json.renderMode = 0;
            json.project_type = "javascript";
            json.jsList = [];
            json.showFPS = true;
            json.noCache = false;
            return json; // must return JSON object.
        }))
        .pipe(gulp.dest(DEST));
});

/*
 gulp.task('image', function () {
 return gulp.src('res/!**!/!*.png')
 .pipe(debug({title: 'img:'}))
 .pipe(cache(imagemin({
 optimizationLevel: 7,
 use: [pngquant({quality: '60-80', speed: 1})]
 })))
 .pipe(debug({title: 'img:'}))
 .pipe(gulp.dest(DEST + 'res'));
 });
 */


gulp.task('image', ['clean'], function () {
    return gulp.src('res/**')
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: false,
            advpng: false,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))
        .pipe(gulp.dest(DEST + 'res'));
});