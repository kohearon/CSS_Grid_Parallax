var gulp = require('gulp');

/* Styles */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var presets = [
  autoprefixer({browsers: ['last 3 versions']}),
  cssnano()
];

/* Javascript */
var source = require('vinyl-source-stream');
var browserify = require('browserify')
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");

/* Minification */
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(presets))
    .pipe(gulp.dest('dist/'))
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

gulp.task('html', function(){
  return gulp.src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
  gulp.watch('*.scss', ['styles']);
  gulp.watch('*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts','html', 'watch']);
