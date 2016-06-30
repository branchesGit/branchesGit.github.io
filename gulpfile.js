//引入 gulp 模块
var gulp = require( 'gulp' );
//清除
var clean = require('gulp-clean');
//合并文件
var concat  = require('gulp-concat');
//压缩
var uglify = require('gulp-uglify');

//清除上一次发布内容
gulp.task('clean', function(){
	return gulp.src('./dist')
				.pipe( clean({force:true}) )
});


//压缩第三方库
gulp.task('compressLibJS', function(){
	return gulp.src('./js/lib/*.js')
		//.pipe( concat("zepto.min.js") )
		.pipe( uglify() )
		.pipe( gulp.dest('./dist/lib') )
		//.pipe;
});

//压缩客户端JS
gulp.task('compressClientJS', function(){
	return gulp.src('./js/*.js')
				.pipe( uglify() )
				.pipe( gulp.dest('./dist') );
});


gulp.task('compressJS', [ 'clean' ], function(){
	gulp.run( ['compressLibJS', 'compressClientJS' ] );
});