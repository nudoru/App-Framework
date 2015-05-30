(function () {
  'use strict';
}());

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        cwd: 'source',
        src: [ '**',
          '!**/*.sass',
          '!**/*.scss',
          '!**/*.jade',
          '!**/*.md',
          '!sass/**',
          '!jade',
          '!jade/templates.html',
          '!scripts/nori/**/*.js',
          '!scripts/tt/**/*.js',
          '!scripts/nudoru/**/*.js',
          '!scripts/vendor/**/*.js',
          '!scripts/vendor/**/*.map',
          '!scripts/app.js',
          'scripts/config.js'
        ],
        dest: 'deploy',
        expand: true,
        filter: 'isFile'
      }
    },

    clean: {
      build: {
        src: [ 'deploy' ]
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'source/sass',
          cssDir: 'deploy/css',
          environment: 'production',
          //compressed, expanded
          outputStyle: 'expanded'
        }
      }
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['deploy/css/app.css']
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [ {
          cwd: "source/jade",
          src: "index.jade",
          dest: "deploy/",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    concat: {
      options: {
        stripBanners: true,
        sourceMap: true,
        separator: ';'
        //process: function(src, filepath) {
        //  return '// Source: ' + filepath + '\n' +
        //    src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        //}
      },


      libs: {
        src: [
          'source/scripts/vendor/gsap/TweenLite.min.js',
          'source/scripts/vendor/gsap/utils/Draggable.min.js',
          'source/scripts/vendor/gsap/TimeLineLite.min.js',
          'source/scripts/vendor/gsap/easing/EasePack.min.js',
          'source/scripts/vendor/gsap/plugins/CSSPlugin.min.js',
          'source/scripts/vendor/lodash.min.js',
          'source/scripts/vendor/rxjs/rx.lite.compat.min.js',
          'source/scripts/vendor/object-observe.min.js',
          'source/scripts/vendor/taffy-min.js'
        ],
        dest: 'deploy/scripts/libs.js'
      },

      nudorucore: {
        src: [
          'source/scripts/nudoru/require.js',
          'source/scripts/nudoru/core/*.js'
        ],
        dest: 'deploy/scripts/nudoru.core.js'
      },

      nudorubrowser: {
        src: [
          'source/scripts/nudoru/browser/*.js'
        ],
        dest: 'deploy/scripts/nudoru.browser.js'
      },

      nudorucomponents: {
        src: [
          'source/scripts/nudoru/components/*.js'
        ],
        dest: 'deploy/scripts/nudoru.components.js'
      },

      nori: {
        src: [
          'source/scripts/nori/events/*.js',
          'source/scripts/nori/model/modules/*.js',
          'source/scripts/nori/model/*.js',
          'source/scripts/nori/view/modules/*.js',
          'source/scripts/nori/view/*.js',
          'source/scripts/nori/controller/*.js',
          'source/scripts/nori/controller/commands/*.js',
          'source/scripts/nori/Nori.js'
        ],
        dest: 'deploy/scripts/nori.js'
      },

      app: {
        src: [
          'source/scripts/tt/**/*.js',
          'source/scripts/app.js'
        ],
        dest: 'deploy/scripts/app.js'
      }

    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        beautify: false,
        mangle: true,
        sourceMap: ''
      },
      dist: {
        files: {
          'deploy/scripts/libs.min.js': ['<%= concat.libs.dest %>'],
          'deploy/scripts/nudoru.core.min.js': ['<%= concat.nudorucore.dest %>'],
          'deploy/scripts/nudoru.browser.min.js': ['<%= concat.nudorubrowser.dest %>'],
          'deploy/scripts/nudoru.components.min.js': ['<%= concat.nudorucomponents.dest %>'],
          'deploy/scripts/nori.min.js': ['<%= concat.nori.dest %>'],
          'deploy/scripts/app.min.js': ['<%= concat.app.dest %>']
        }
      }
    },

    jshint: {
      files: ['source/scripts/nudoru/*.js', 'source/scripts/nori/**/*.js', 'source/scripts/tt/**/*.js'],
      options: {
        '-W014': true,
        '-W061': true,
        force: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        maxdepth: 2,
        maxcomplexity: 5,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },


    connect: {
      server: {
        options: {
          port: 9001,
          base: 'deploy'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: ['source/jade/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['source/sass/**/*.sass', 'source/sass/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['source/scripts/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['clean', 'copy', 'compass', 'jade', 'jshint', 'concat', 'uglify', 'connect', 'watch']);
};