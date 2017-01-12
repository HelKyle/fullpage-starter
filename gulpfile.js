/**
* @Author: zhouxiaokai
* @Date:   2017-01-12T16:18:30+08:00
* @Email:  zhouxiaokai@smartisan.com
* @Last modified by:   zhouxiaokai
* @Last modified time: 2017-01-12T17:44:00+08:00
*/



var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    autoPrefixer = require('gulp-autoprefixer');


var configs = {
    scssSource: './scss/**/*.scss',
    jsSource: './js/*.js',
    htmlSource: './index.html'
}

// browserSync 同步浏览器
gulp.task('browserSync', function() {
    browserSync.init({
        injectChanges: true,
        port: 80,
        startPath: '/',
        server: {
            baseDir: [ './'],
        },
        browser: ["google chrome", "firefox"],
    });
});

gulp.task('browserSyncReload', function() {
    browserSync.reload();
});
// 只监听相关文件
gulp.task('watch', function() {
    gulp.watch(configs.scssSource, ['scss']);
    gulp.watch(configs.jsSource, ['browserSyncReload']);
    gulp.watch(configs.htmlSource, ['browserSyncReload']);
})

// 处理scss, postcss, autoprefixer
gulp.task('scss', function() {
    return gulp.src(configs.scssSource)
        .pipe( sass().on('error', function() {
            console.log('=========================\n\n');
            // 输出错误信息
            sass.logError.apply(this, arguments);
            console.log('=========================');
        }))
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
})


gulp.task('default', function(callback) {
    runSequence(
        ['scss'],
        ['browserSync', 'watch'],
        callback
    );
})
