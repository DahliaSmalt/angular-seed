var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var bower = require('gulp-bower');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var karma = require('gulp-karma');

var paths = {
  scripts: ['client/**/*[!.test].js'],
  styles: 'client/**/*.less',
};

gulp.task('clean', function(cb) {
  del([
      'static/lib/**/*',
      'static/dist/**/*'
    ], cb);
});

gulp.task('scripts', ['clean', 'test'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(concat('application.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/dist'));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(concat('theme.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('static/dist'));
});

gulp.task('libs', ['clean'], function() {
  return bower()
    .pipe(gulp.dest('static/lib/'));
});

gulp.task('test', function() {
  // Be sure to return the stream 
  return gulp.src(paths.scripts)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});

gulp.task('watch-test', function() {
  // Be sure to return the stream 
  return gulp.src(paths.scripts)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

// Rerun the task when a file changes
gulp.task('watch', ['watch-test'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('build', ['scripts', 'styles', 'libs']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build']);
