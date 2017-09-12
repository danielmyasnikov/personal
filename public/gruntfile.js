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
          'dist/app.min.css':   ['scss/app.scss'],
          'dist/thankyou.min.css':   ['scss/thankyou.scss']
        }
      },
      app: {
        options: {
          style: 'compressed',
          compass: false
        },
        files: {
          'dist/app.min.css':   ['scss/app.scss'],
          'dist/thankyou.min.css':   ['scss/thankyou.scss']
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
        tasks: ['clean:app', 'sass:app']
      }
    },
    clean: {
      dist: [
        'dist/theme.min.css',
        'dist/bootstrap.min.css',
        'dist/app.min.css',
        'dist/thankyou.min.css'
      ],
      app: [
        'dist/app.min.css',
        'dist/thankyou.min.css'
      ]
    },
    uglify: {
      // options: {
      //   mangle: {
      //     reserved: ['jQuery', 'Backbone']
      //   }
      // },
      dist: {
        files: {
          'dist/smooth-scroll.min.js':   ['node_modules/smooth-scroll/dist/js/smooth-scroll.js']
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Register tasks
  grunt.registerTask('default', [
    'clean:dist',
    'sass:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('app', ['clean:app', 'sass:app']);

  grunt.registerTask('dev', ['watch']);

};
