'use strict';

module.exports = function(grunt) {

  grunt.initConfig ({

    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      karmatest: {
        src: ['test/karma_tests/*_test.js'],
        dest: 'test/karma_tests/karma_test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    jshint: {
      dev: {
        options: {     
          jshintrc: '../../../.jshintrc',
          force: true
        },
        src: ['Gruntfile.js', 'server.js', 'routes/*.js', 'test/*.js', 'models/*.js', 
        'app/*.js', 'build/*.js']
      }
    },

    simplemocha: {
      all: {
        src: ['test/server_side/*_test.js']
      }
    },

    jscs: {
      all: {
        options: {
          config: true,
          preset: "google",
          force: true
        },
        files: {
          src: ['Gruntfile.js', 'index.js', 'routes/*.js', 'test/*.js', 'models/*.js',
          'app/*.js', 'build/*.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
  grunt.registerTask('server:test', ['simplemocha:all']);
  grunt.registerTask('stylelint', ['jshint:dev', 'jscs:all']);

};



