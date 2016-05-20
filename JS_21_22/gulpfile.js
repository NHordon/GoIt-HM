const  gulp = require('gulp'),
    watch = require('gulp-watch'),
    jasmine = require('gulp-jasmine'),
    babel = require('gulp-babel');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};


gulp.task('js:build', () => {
    gulp.src(path.src.js) //Найдем наш main файл
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});


gulp.task('test', () =>
gulp.src('spec/test.js')
    .pipe(jasmine())
);

gulp.task('watch', function(){

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

});

gulp.task('build', [
    'js:build'
]);


gulp.task('default', ['build', 'test']);
