(function () {
  'use strict';
}());

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mocha: {
      all: {
        src: ['tests/'],
      },
      options: {
        run: true
      }
    },

    copy: {
      build: {
        cwd: 'src',
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
        dest: 'bin',
        expand: true,
        filter: 'isFile'
      }
    },

    clean: {
      build: {
        src: [ 'bin' ]
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'bin/css',
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
        src: ['bin/css/app.css']
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [ {
          cwd: "src/jade",
          src: "index.jade",
          dest: "bin/",
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
          'src/scripts/vendor/gsap/TweenLite.min.js',
          'src/scripts/vendor/gsap/utils/Draggable.min.js',
          'src/scripts/vendor/gsap/TimeLineLite.min.js',
          'src/scripts/vendor/gsap/easing/EasePack.min.js',
          'src/scripts/vendor/gsap/plugins/CSSPlugin.min.js',
          'src/scripts/vendor/lodash.min.js',
          'src/scripts/vendor/rxjs/rx.lite.compat.min.js',
          'src/scripts/vendor/moment.min.js',
          'src/scripts/vendor/pikaday.js'
        ],
        dest: 'bin/scripts/libs.js'
      },

      nudorucore: {
        src: [
          'src/scripts/nudoru/require.js',
          'src/scripts/nudoru/globals.js',
          'src/scripts/nudoru/core/*.js'
        ],
        dest: 'bin/scripts/nudoru.core.js'
      },

      nudorubrowser: {
        src: [
          'src/scripts/nudoru/browser/*.js'
        ],
        dest: 'bin/scripts/nudoru.browser.js'
      },

      nudorucomponents: {
        src: [
          'src/scripts/nudoru/components/*.js'
        ],
        dest: 'bin/scripts/nudoru.components.js'
      },

      nori: {
        src: [
          'src/scripts/nori/utils/*.js',
          'src/scripts/nori/events/*.js',
          'src/scripts/nori/model/modules/*.js',
          'src/scripts/nori/model/*.js',
          'src/scripts/nori/view/modules/*.js',
          'src/scripts/nori/view/*.js',
          'src/scripts/nori/Nori.js'
        ],
        dest: 'bin/scripts/nori.js'
      },

      app: {
        src: [
          'src/scripts/tt/**/*.js',
          'src/scripts/app.js'
        ],
        dest: 'bin/scripts/app.js'
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
          'bin/scripts/libs.min.js': ['<%= concat.libs.dest %>'],
          'bin/scripts/nudoru.core.min.js': ['<%= concat.nudorucore.dest %>'],
          'bin/scripts/nudoru.browser.min.js': ['<%= concat.nudorubrowser.dest %>'],
          'bin/scripts/nudoru.components.min.js': ['<%= concat.nudorucomponents.dest %>'],
          'bin/scripts/nori.min.js': ['<%= concat.nori.dest %>'],
          'bin/scripts/app.min.js': ['<%= concat.app.dest %>']
        }
      }
    },

    jshint: {
      files: ['src/scripts/nudoru/*.js', 'src/scripts/nori/**/*.js', 'src/scripts/tt/**/*.js'],
      options: {
        '-W014': true,
        '-W030': true,
        '-W061': true,
        '-W083': true,
        force: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        maxdepth: 4,
        maxcomplexity: 10,
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
          base: 'bin'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: ['src/jade/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/sass/**/*.sass', 'src/sass/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha');
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
  grunt.registerTask('build', ['clean', 'copy', 'compass', 'jade', 'jshint', 'concat', 'uglify']);
};