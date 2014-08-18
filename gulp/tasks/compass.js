var gulp      = require('gulp'),
    compass   = require('gulp-compass');
 
var sourceFolders = [
    'src',
    ];
 
 module.exports = function() {
    console.log("Something changes in scss");
    return gulp.task('compass', function(){
                sourceFolders.forEach(function(folder) {
                    gulp.src(folder + '/scss/*.scss')
                        .pipe(compass({
                            style: 'compressed',
                            sass: folder + '/scss',
                            css: folder + '/css'
                        }))
                        .pipe(gulp.dest(folder + '/css'));
                });
            });
 }
