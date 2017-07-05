var gulp = require('gulp');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var presets = [
  autoprefixer({browsers: ['last 3 versions']}),
  cssnano()
];

var source = require('vinyl-source-stream');
var browserify = require('browserify')
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(presets))
    .pipe(gulp.dest('./'))
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

gulp.task('watch', function(){
  gulp.watch('*.scss', ['styles']);
  gulp.watch('*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);
