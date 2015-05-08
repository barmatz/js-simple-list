'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            build: {
                files: {
                    'lib/simple-list.js': 'src/**/*.js'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                '**/*.{js,json}',
                '!{node_modules,bower_components,lib}/**'
            ]
        },
        /* jshint camelcase: false */
        mocha_phantomjs: {
        /* jshint camelcase: true */
            test: {
                src: 'test/**/*.html'
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            all: {
                files: [
                    '**/.jshintrc',
                    '**/*.{js,json}',
                    '!{node_modules,bower_components,lib}/**'
                ],
                tasks: 'default'
            },
            tests: {
                files: 'test/**/*',
                tasks: 'test'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.registerTask('default', [ 'lint', 'build', 'test' ]);
    grunt.registerTask('lint', [ 'jshint' ]);
    grunt.registerTask('test', [ 'mocha_phantomjs' ]);
    grunt.registerTask('build', [ 'concat' ]);
};