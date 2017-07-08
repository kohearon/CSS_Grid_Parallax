var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/* Styles */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var presets = [
  autoprefixer({browsers: ['last 2 versions']}),
  cssnano()
];

/* Javascript */
var source = require('vinyl-source-stream');
var browserify = require('browserify')
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');

/* Minification */
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(presets))
    .pipe(gulp.dest('dist/'))
});

/* Reload Browser After Completion of Styles Task */
gulp.task('styles-watch', ['styles'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('scripts', function(){
  var b = browserify({
    entries: 'index.js',
  });

  return b.bundle()
   .pipe(source('index.js'))
   .pipe(buffer())
   .pipe(uglify())
   .on("error", gutil.log)
   .pipe(gulp.dest('dist/'))
});

/* Reload Browser After Completeion of Javascript Tasks */
gulp.task('scripts-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html', function(){
  return gulp.src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});

/* Reload Browser After HTML Changes */
gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['styles', 'scripts','html'], function(){

  /* Serve Files From The Dist Folder */
  browserSync.init({
    server: {
    baseDir: "dist/"
    }
  });

  /* Watching Tasks */
  gulp.watch(['styles/*.scss', '*.scss'], ['styles-watch']);
  gulp.watch(['*.js', 'scripts/*.js'], ['scripts-watch']);
  gulp.watch('index.html', ['html-watch']);

});
