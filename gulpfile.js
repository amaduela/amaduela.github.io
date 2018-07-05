var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");

gulp.task('copybt', function() {
	return gulp.src('./node_modules/bootstrap/**/**')
	  .pipe(gulp.dest('./src/libs/bootstrap'));
});

gulp.task('copyfa', function() {
	return gulp.src('./node_modules/font-awesome/**/**')
	  .pipe(gulp.dest('./src/libs/font-awesome'));
});

gulp.task('copyfonts', function() {
    gulp.src('./src/libs/font-awesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});


// Task that compiles sassy css and moves to a dist folder
gulp.task('compilecss', function() {
	return gulp.src('./src/scss/**/*.scss')
	  .pipe(sass({outpustyle: 'compressed'}))
	  .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "Sass"
      }))
	  .pipe(gulp.dest('./dist/css'));
});


gulp.task('compilejs', function() {
	return gulp.src('./src/js/*.js')
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('buildjs', function() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.js',
		'./src/libs/bootstrap/dist/js/bootstrap.min.js',
		'./src/libs/bootstrap/dist/js/bootstrap.min.js.map',
		'./src/libs/jquery-mobile/jquery.mobile.custom.js',
		'./src/js/*.js'
		])
	.pipe(gulp.dest('./dist/js'));
});


// Task that listen for any sassy modification and then runs a task
gulp.task('listen', function() {
	gulp.watch('./src/scss/**/*.scss', ['compilecss']);
	gulp.watch('./src/libs/bootstrap/scss/**/*.scss', ['compilecss']);
	gulp.watch('./src/js/*.js', ['compilejs']);
});

// gulp.task('default',['copybt', 'buildjs', 'compilecss', 'compilejs', 'copyfa', 'copyfonts', 'listen']);
gulp.task('default',['compilecss', 'compilejs', 'listen']);