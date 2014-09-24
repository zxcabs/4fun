/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    p = require('path'),
    LIVERELOAD_PORT = 9920;

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Таск для разработки
    grunt.registerTask('dev', ['clean:dev', 'lmd:dev', 'connect:dev', 'watch:dev']);

    grunt.initConfig({

        clean: {
            dev: p.dirname(require('./.lmd/base.lmd.json').output)
        },

        lmd: {
            dev: {
                build: 'base'
            }
        },

        connect: {
            dev: {
                options: {
                    port: 8820,
                    base: ['www', '.'],
                    livereload: LIVERELOAD_PORT
                }
            }
        },

        watch: {
            dev: {
                files: [p.join(p.resolve('./.lmd', require('./.lmd/base.lmd.json').root), '/app/**/*.*'), './.lmd/**.*', './www/index.html'],
                tasks: ['clean:dev', 'lmd:dev'],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        }
    });
};