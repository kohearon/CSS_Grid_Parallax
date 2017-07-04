var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var presets = [
  autoprefixer({browsers: ['last 3 versions']}),
  cssnano()
];

gulp.task('styles', function(){
  return gulp.src('index.scss')
    .pipe(sass())
    .pipe(postcss(presets))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
  gulp.watch('*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);
