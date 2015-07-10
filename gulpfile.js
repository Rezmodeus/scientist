var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var removeCode = require('gulp-remove-code');

gulp.task('lint', function() {
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
	return gulp.src(['test/test-*.js'], {read:false})
		.pipe(mocha({
			reporter: 'spec',
			globals: {
				chai:require('chai')
			}
		}));
});


gulp.task('removeCode', function() {
	return gulp.src('src/*.js')
		  .pipe(removeCode({production:true}))
		  .pipe(gulp.dest('./dist'));
});

gulp.task('default',['lint','mocha','removeCode']);
