var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var config = {
    port: 9008,
    devBaseUrl: 'http://localhost',
    paths: {
        html: [
            './index.html'
        ],
        js: [
            './src/**/*.js'
        ]
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

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['open', 'watch']);
