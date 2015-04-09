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
          '!jade/templates.html',
          '!scripts/app/**/*.js',
          '!scripts/nudoru/**/*.js',
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
          'source/scripts/vendor/gsap/TweenLite.min.js',
          'source/scripts/vendor/gsap/TimeLineLite.min.js',
          'source/scripts/vendor/gsap/easing/EasePack.min.js',
          'source/scripts/vendor/gsap/plugins/CSSPlugin.min.js',
          'source/scripts/vendor/underscore-min.js',
          'source/scripts/vendor/rxjs/rx.lite.compat.min.js',
          'source/scripts/vendor/packery.pkgd.min.js',

          'source/scripts/nudoru/utils/NNameSpace.js',
          'source/scripts/nudoru/nudoru.js',
          'source/scripts/nudoru/utils/BrowserInfo.js',
          'source/scripts/nudoru/utils/utility.js',
          'source/scripts/nudoru/utils/ObjectUtils.js',
          'source/scripts/nudoru/utils/ArrayUtils.js',
          'source/scripts/nudoru/utils/DOMUtils.js',
          'source/scripts/nudoru/utils/NumberUtils.js',
          'source/scripts/nudoru/utils/StringUtils.js',
          'source/scripts/nudoru/utils/TouchUtils.js',
          'source/scripts/nudoru/utils/NDebugger.js',
          'source/scripts/nudoru/utils/NTemplate.js',
          'source/scripts/nudoru/utils/NLorem.js',
          'source/scripts/nudoru/events/EventDispatcher.js',
          'source/scripts/nudoru/events/EventCommandMap.js',
          'source/scripts/nudoru/components/FloatImageView.js',
          'source/scripts/nudoru/components/ModalCoverView.js',
          'source/scripts/nudoru/components/ToastView.js',
          'source/scripts/nudoru/components/DDMenuBarView.js',
          'source/scripts/nudoru/components/DDMenuView.js',

          'source/scripts/app/App.js',
          'source/scripts/app/events/Events.js',
          'source/scripts/app/model/AppModel.js',
          'source/scripts/app/model/ModelVOs.js',
          'source/scripts/app/model/DummyData.js',
          'source/scripts/app/view/AppView.js',
          'source/scripts/app/view/ItemGridView.js',
          'source/scripts/app/view/ItemDetailView.js',
          'source/scripts/app/view/DetailedItemRenderer.js',
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
        beautify: false,
        mangle: true,
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