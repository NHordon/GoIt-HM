module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'src/dist/script.main.js'
            }
        },
        uglify: {
            build: {
                src: ['src/dist/script.main.js'],
                dest: 'src/dist/script.main.min.js'
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.scss'],
                    dest: 'styles',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 versions']
            },
            dist: {
                files: {
                    'styles/style.css': 'styles/style.css'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['style.css'],
                    dest: 'styles',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['styles/*.scss'],
                tasks: ['sass']
            },
            styles: {
                files: ['styles/style.css'],
                tasks: ['autoprefixer']
            },
            cssmin: {
                files: ['styles/style.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat','uglify','sass', 'autoprefixer', 'watch']);

};