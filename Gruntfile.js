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
        mochaTest: {
            test: {
                src: 'test/**/*.js'
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', [ 'lint', 'test' ]);
    grunt.registerTask('lint', [ 'jshint' ]);
    grunt.registerTask('test', [ 'mochaTest' ]);
};