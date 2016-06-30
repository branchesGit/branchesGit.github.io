//引入 gulp 模块
var gulp = require( 'gulp' );
//清除
var clean = require('gulp-clean');
//合并文件
var concat  = require('gulp-concat');
//压缩
var uglify = require('gulp-uglify');
//
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//var gulpSequence = require('gulp-sequence');

//清除上一次发布内容
gulp.task('clean', function(){
	return gulp.src('./dist')
			.pipe( clean({force:true}) )
});

//压缩第三方库
gulp.task('compressLibJS', function(cb){
	return gulp.src('./js/lib/*.js')
		//.pipe( concat("zepto.min.js") )
		.pipe( uglify() )
		.pipe( gulp.dest('./dist/lib') );

		cb && console.log( cb );
});

//压缩客户端JS
gulp.task('compressClientJS', function(cb){
		return gulp.src('./js/*.js')
			.pipe( uglify() )
			.pipe( gulp.dest('./dist') );

		cb && console.log( cb );
});

gulp.task('compressJS', [ 'clean' ], function(cb){
	gulp.run(['compressLibJS', 'compressClientJS']); 
	cb && console.log( cb );
});



gulp.task('reload_by_js', ['compressJS'],reload);

gulp.task('server', ['compressJS'], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	var watcherJS = gulp.watch('./js/*.js', ['reload_by_js'] );
	watcherJS.on('change', function(event){
		console.log('client JS have change, file path is ' + event.path );
	});

});

gulp.task('default', ['server']);