'use strict';

var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', '*'],
        replaceString: /\bgulp[\-.]/
    });

var reload = plugins.browserSync.reload;


var markupPaths = './markup';
var devPaths = './dev';

var rootPaths = process.cwd();
var nodeModulesPath  =    rootPaths + '/node_modules/';
var bowerComponents =    rootPaths + '/bower_components/';


var paths = {
    html: [markupPaths + '/*.html'],
    sass: [
        markupPaths + '/assets/scss/**/*.{scss,sass}',
    ],
    less: [markupPaths + '/assets/less/**/*.less'],
    jade: [markupPaths + '/**/*.jade'],
    images: [markupPaths + '/assets/images/**/*.*'],
    fonts: [markupPaths + '/assets/fonts/**/*.*'],
    js: [
        markupPaths + '/assets/js/**/*.js',
        markupPaths + '/assets/js/main.js', !markupPaths + '/assets/js/vendor/**/*.js'
    ],
};

var build = {
    css: [devPaths + '/assets/css/**/*.css', '!./dist/assets/css/**/*.min.css'],
    js: [devPaths + '/assets/js/**/*.js', '!./dist/assets/css/**/*.min.js']
};



gulp.task('jquery', function(cb) {
    return gulp.src(nodeModulesPath + '/jquery/dist/jquery.js')
        .pipe(gulp.dest(devPaths + '/assets/js/jquery'));
    cb(null);
});


gulp.task('html', function(cb) {
    return gulp.src(paths.html)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(gulp.dest(devPaths))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});


gulp.task('sass', function(cb) {
    return gulp.src(paths.sass)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: [rootPaths, nodeModulesPath, bowerComponents],
            outputStyle: 'expanded'
        }))
        .pipe(plugins.autoprefixer({
            browsers: ["> 1%", "last 2 versions", "Firefox ESR","android 4"],
            cascade: true
        }))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest(devPaths + '/assets/css'))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});


gulp.task('less', function(cb) {
    return gulp.src(paths.less)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({
            paths: [plugins.path.join(__dirname, 'less', 'includes'), rootPaths, nodeModulesPath, bowerComponents]
        }))
        .pipe(plugins.autoprefixer({
            browsers: ["> 1%", "last 2 versions", "Firefox ESR","android 4"],
            cascade: true
        }))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest(devPaths + '/assets/css'))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});


gulp.task('jade', function(cb) {
    return gulp.src(paths.jade)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        // .pipe(plugins.data(function(file) {
        // 	return JSON.parse(fs.readFileSync('./data/data.json'));
        // }))
        .pipe(plugins.jade())
        .pipe(plugins.prettify({
            indent_size: 1,
            indent_inner_html: true,
            indent_char: '\t',
            preserve_newlines: true,
            max_preserve_newlines: 0,
            unformatted: true,
            end_with_newline: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});



gulp.task('js', function(cb) {
    return gulp.src(paths.js)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plugins.concat('assets.js'))
        .pipe(gulp.dest(devPaths + '/assets/js/'))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});

gulp.task('js:vendor', function(cb) {
    return gulp.src(markupPaths + '/assets/js/vendor/**/*.js')
        .pipe(gulp.dest(devPaths + '/assets/js/vendor'))
    cb(null);
});

gulp.task('fonts', function(cb) {
    return gulp.src(paths.fonts)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plugins.changed(devPaths + '/assets/fonts'))
        .pipe(gulp.dest(devPaths + '/assets/fonts'))
        .pipe(reload({
            stream: true
        }));
    cb(null);
});

gulp.task('images', function(cb) {
    return gulp.src(paths.images)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(plugins.changed('dist/assets/images'))
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [plugins.imageminPngquant()]
        }))
        .pipe(gulp.dest(devPaths + '/assets/images'))

    .pipe(reload({
        stream: true
    }));
    cb(null);
});


gulp.task('css:min', function(cb) {
    gulp.src(build.css)
        .pipe(plugins.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest('./build/assets/css'))
    cb(null);
});

gulp.task('js:min', function(cb) {
    gulp.src(build.js)
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest('./build/assets/js'))
    cb(null);
});


gulp.task('browser-sync', function(cb) {
    plugins.browserSync({
        server: {
            baseDir: devPaths
        },
        logConnections: true,
        debugInfo: true,
        injectChanges: false,
        port: 3004,
        open: true,
        browser: 'default',
        startPath: '/index.html',
        notify: true,
        // tunnel: tars.flags.tunnel,
        reloadOnRestart: true
    });
    cb(null);
});


gulp.task('watch', function() {
    plugins.watch(paths.html, function() {
        gulp.start('html');
    });
    plugins.watch(paths.sass, function() {
        gulp.start('sass');
    });
    // plugins.watch(paths.less, function() {
    //     gulp.start('less');
    // });
    plugins.watch(paths.jade, function() {
        gulp.start('jade');
    });
    plugins.watch(paths.images, function() {
        gulp.start('images');
    });
    plugins.watch(paths.fonts, function() {
        gulp.start('fonts');
    });
    plugins.watch(paths.js, function() {
        gulp.start('js');
    });
    plugins.watch(markupPaths + '/assets/js/vendor/**/*.js', function() {
        gulp.start('js:vendor');
    });
});

gulp.task('clean:dist', function(cb) {
    plugins.del(devPaths + '/assets');
    cb(null);
});

gulp.task('clean:build', function(cb) {
    plugins.del(devPaths + '/assets');
    cb(null);
});

gulp.task('copy', function(cb) {
    return gulp.src([devPaths + '/*', devPaths + '/assets/**/*.*'], {
            base: './dist'
        })
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError("Error: <%= error.message %>")
        }))
        .pipe(gulp.dest('./build'))
    cb(null);
});


gulp.task('dev', function(cb) {
    console.log(markupPaths + '/assets/scss/**/*.scss');
    plugins.runSequence(
        'clean:dist',
        'html',
        'js',
        'js:vendor',
        'jquery',
        'jade',
        'sass',
        // 'less',
        'fonts',
        'images',
        'watch',
        'browser-sync',
        cb);
});

gulp.task('build', function(cb) {
    gulp.start('clean:build');
    plugins.runSequence(
        'clean:dist',
        'html',
        'js',
        'js:vendor',
        'jquery',
        'jade',
        'sass',
        // 'less',
        'fonts',
        'images',
        'css:min',
        'js:min',
        'copy',
        cb);
});