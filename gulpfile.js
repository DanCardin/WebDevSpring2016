var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var assignmentFiles = ['public/assignment/**/*.ts'];
var cafeFiles = ['public/cafe/**/*.ts'];
var serverFolderFiles = ['public/server/**/*.ts'];
var serverFiles = ['public/server.ts'];

var assignment = ts.createProject('public/assignment/tsconfig.json', {typescript: require('typescript')});
gulp.task('assignment', function() {
    var tsResult = assignment.src().pipe(ts(assignment));
    return merge([
        tsResult.dts.pipe(gulp.dest('public/dist/assignment')),
        tsResult.js.pipe(gulp.dest('public/dist/assignment'))
    ]);
});

var cafe = ts.createProject('public/cafe/tsconfig.json', {typescript: require('typescript')});
gulp.task('cafe', function() {
    var tsResult = cafe.src().pipe(ts(cafe));
    return merge([
        tsResult.dts.pipe(gulp.dest('public/dist/cafe')),
        tsResult.js.pipe(gulp.dest('public/dist/cafe'))
    ]);
});

var serverProject = ts.createProject('public/tsconfig.json', {typescript: require('typescript')});
gulp.task('server', function() {
    var tsResult = serverProject.src().pipe(ts(serverProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('public/dist')),
        tsResult.js.pipe(gulp.dest('public/dist'))
    ]);
});

var serverFolderProject = ts.createProject('public/server/tsconfig.json', {typescript: require('typescript')});
gulp.task('serverfolder', function() {
    var tsResult = serverFolderProject.src().pipe(ts(serverFolderProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('public/dist/server')),
        tsResult.js.pipe(gulp.dest('public/dist/server'))
    ]);
});

var htmlFiles =['public/**/*.html', '!public/dist', '!public/dist/**'];
gulp.task('html', function() {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest('public/dist'));
});

var cssFiles = ['public/**/*.css', '!public/dist/*', '!public/dist/**'];
gulp.task('css', function() {
    return gulp.src(cssFiles)
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
    gulp.watch(assignmentFiles, ['assignment']);
    gulp.watch(serverFiles, ['server']);
    gulp.watch(serverFolderFiles, ['serverfolder']);

    gulp.watch(htmlFiles, ['html']);
    gulp.watch(cssFiles, ['css']);
});

gulp.task('run', ['assignment', 'cafe', 'serverfolder', 'server', 'html', 'css']);
gulp.task('default', ['serverfolder']);
