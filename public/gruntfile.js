'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: false
        },
        files: {
          'dist/theme.min.css': ['scss/theme.scss'],
          'dist/bootstrap.min.css':   ['scss/bootstrap/bootstrap.css'],
          'dist/app.min.css':   ['scss/app.scss']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: [
          'scss/**/*.scss'
        ],
        tasks: ['sass']
      }
    },
    clean: {
      dist: [
        'dist/theme.min.css',
        'dist/bootstrap.min.css',
        'dist/app.min.css'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass'
    // 'uglify'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
