'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                '**/*.{js,json}',
                '!node_modules/**'
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
                    '!node_modules/**'
                ],
                tasks: 'default'
            },
            tests: {
                files: 'test/**/*',
                tasks: 'test'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.registerTask('default', [ 'lint', 'test' ]);
    grunt.registerTask('lint', [ 'jshint' ]);
    grunt.registerTask('test', [ 'mocha_phantomjs' ]);
};