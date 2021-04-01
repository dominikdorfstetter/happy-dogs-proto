{
  const gulp = require('gulp');
  const bump = require('gulp-bump');
  const replace = require('gulp-replace');

  /*
    ----- BUMPS TO NEXT MAJOR VERSION ----
  */
  gulp.task('ng-bump-major', function () {
    return gulp
      .src('./package.json')
      .pipe(bump({ type: 'major' }))
      .pipe(gulp.dest('./'));
  });

  /*
    ----- BUMPS TO NEXT MINOR VERSION ----
  */
  gulp.task('ng-bump-minor', function () {
    return gulp
      .src('./package.json')
      .pipe(bump({ type: 'minor' }))
      .pipe(gulp.dest('./'));
  });

  /*
    ----- BUMPS TO NEXT PRERELEASE VERSION ----
  */
  gulp.task('ng-bump-prerelease', function () {
    return gulp
      .src('./package.json')
      .pipe(bump({ type: 'prerelease' }))
      .pipe(gulp.dest('./'));
  });

  /*
    ----- INJECTS VERSION IN CORRESPONDING environment.*.ts ----
  */
  gulp.task('ng-inject-version', function () {
    const argv = require('minimist')(process.argv.slice(2));
    const path = require('path');
    const configuration = argv['configuration'];
    const env_dir_path = path.resolve(__dirname, `./src/environments`);
    const env_file_path = path.join(env_dir_path, configuration ? `environment.${configuration}.ts` : 'environment.ts');
    const v = require('./package.json').version;
    return gulp
      .src([env_file_path])
      .pipe(
        replace(/version:\s?'.*',?/g, function (match) {
          const new_version_string = `version: '${v}',`;
          console.log(`${this.file.path} New version to be written: ${v}`);
          return new_version_string;
        })
      )
      .pipe(gulp.dest(env_dir_path));
  });
}
