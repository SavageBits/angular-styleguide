var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');
var ngAnnotate = require('gulp-ng-annotate');

var config = {
    port: 9008,
    devBaseUrl: 'http://localhost',
    paths: {
        html: [
            './index.html'
        ],
        js: [
            './app/app.routes.js',
            './app/app.config.js',
            '!./app/src/**/*.module.js',
            './app/src/**/*.js'
        ],
        appJs: './app/app.module.js',
        appRoutesJs: './app/app.routes.js',
        appConfigJs: './app/app.config.js',
        modulesJs: [
            './app/app.module.js',
            './app/src/**/*.module.js'
        ],
        bundle: './bundle.js',
        moduleBundle: './module-bundle.js'
    },
    browser: 'chrome'
};

gulp.task('connect', function() {
    connect.server({
        root: ['.'],
        port: config.port,
        base: config.devBaseUrl,
        fallback: 'index.html',
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    return gulp.src('')
        .pipe(open({
            app: config.browser,
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('html', function() {
    return gulp.src(config.paths.html)
        .pipe(connect.reload());
});

gulp.task('js', ['init'], function() {
  gulp.src(config.paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(concat(config.paths.bundle))
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});

gulp.task('init', function() {
    gulp.src(config.paths.modulesJs)
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(ngAnnotate())
      .pipe(concat(config.paths.moduleBundle))
      .pipe(gulp.dest('.'))
      .pipe(connect.reload());
});

gulp.task('lint', function() {
  gulp.src(config.paths.bundle)
    .pipe(lint({
      config: 'eslint.config.json'
    }))
    .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.appJs, ['js']);
    gulp.watch(config.paths.appRoutesJs, ['js']);
    gulp.watch(config.paths.appConfigJs, ['js']);
});

gulp.task('default', ['open', 'js', 'lint', 'watch']);
