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
          '!sass/**',
          '!jade',
          '!scripts/app/**/*.js',
          '!scripts/utils/**/*.js',
          '!scripts/vendor/**/*.js',
          '!scripts/vendor/**/*.map',
          '!scripts/main.js',
          'scripts/config.js',
          'scripts/vendor/html5shiv.min.js'

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
          environment: 'development',
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
          src: "**/*.jade",
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
        //banner: "'use strict';\n",
        //banner: "(function () {'use strict';}());\n",
        //process: function(src, filepath) {
        //  return '// Source: ' + filepath + '\n' +
        //    src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        //}
      },
      dist: {
        src: [
          'source/scripts/vendor/jquery-2.1.1.min.js',
          'source/scripts/vendor/gsap/TweenMax.min.js',
          'source/scripts/vendor/underscore-min.js',
          'source/scripts/vendor/rxjs/rx.lite.compat.min.js',
          'source/scripts/vendor/packery.pkgd.min.js',
          'source/scripts/utils/utility.js',
          'source/scripts/utils/Debugger.js',
          'source/scripts/utils/ObjectUtils.js',
          'source/scripts/utils/ArrayUtils.js',
          'source/scripts/utils/DOMUtils.js',
          'source/scripts/utils/NumberUtils.js',
          'source/scripts/utils/StringUtils.js',
          'source/scripts/utils/Lorem.js',
          'source/scripts/utils/TouchUtils.js',
          'source/scripts/app/App.js',
          'source/scripts/app/events/Events.js',
          'source/scripts/app/events/EventDispatcher.js',
          'source/scripts/app/events/EventCommandMap.js',
          'source/scripts/app/model/AbstractModelVOs.js',
          'source/scripts/app/model/AppModel.js',
          'source/scripts/app/model/DummyData.js',
          'source/scripts/app/view/AppView.js',
          'source/scripts/app/view/ModalCoverView.js',
          'source/scripts/app/view/ToastView.js',
          'source/scripts/app/view/DDMenuBarView.js',
          'source/scripts/app/view/DDMenuView.js',
          'source/scripts/app/view/BasicMenuItemView.js',
          'source/scripts/app/view/ItemGridView.js',
          'source/scripts/app/view/ItemDetailView.js',
          'source/scripts/app/view/DetailedItemRenderer.js',
          'source/scripts/app/view/FloatImageView.js',
          'source/scripts/app/view/TagBarView.js',
          'source/scripts/app/controller/AppController.js',
          'source/scripts/app/controller/Router.js',
          'source/scripts/app/controller/commands/*.js',
          'source/scripts/main.js'
        ],
        dest: 'deploy/scripts/libs.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        beautify: true,
        mangle: false,
        sourceMap: ''
      },
      dist: {
        files: {
          'deploy/scripts/libs.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['source/scripts/utils/*.js', 'source/scripts/app/**/*.js'],
      options: {
        '-W014': true,
        force: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
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
        files: ['source/sass/**/*.sass'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['source/scripts/**/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
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
  grunt.registerTask('default', ['clean', 'copy', 'compass', 'csslint', 'jade', 'concat', 'uglify', 'jshint', 'connect', 'watch']);
};