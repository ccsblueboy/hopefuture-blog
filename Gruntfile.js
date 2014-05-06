// Generated on 2014-03-17 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  // 自动加载grunt tasks
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // 统计显示各任务执行的时间
  // https://github.com/sindresorhus/time-grunt
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      server: 'server',
      publish: 'publish',
      webapp: 'dist/webapp'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['less','newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '35729'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      express: {
        files: [ 'app.js', '<%= yeoman.server %>/**/*.js' ],
        tasks: [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),//利用插件jshint-stylish输出分析结果
        reporterOutput: 'jshint.log'//设置分析结果输出到指定文件，如果不设置，则输出到控制台
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '<%= yeoman.server %>/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*',
              '!<%= yeoman.dist %>/node_modules/**'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    // 该任务用来分析css并为css3加上各浏览器前缀
    autoprefixer: {
      options: {
        //cascade: true,// 设置层叠显示分格
        browsers: ['last 1 version']// 指定浏览器版本，该设置表示浏览器最新版本，详见 https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',// 指定当前文件夹
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      target: {
        // Point to the files that should be updated when
        // you run `grunt bower-install`
        src: [
          '<%= yeoman.app %>/index.html',   // .html support...
          '<%= yeoman.app %>/demo-grid.html',
          '<%= yeoman.app %>/demo-pagination.html',
          '<%= yeoman.app %>/examples.html'
        ],

        // Optional:
        // ---------
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: ''
      }
    },

    // Renames files for browser caching purposes
    // 该任务用来重新命名文件
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.webapp %>/scripts/{,*/}*.js',
            '<%= yeoman.webapp %>/styles/{,*/}*.css',
            '<%= yeoman.webapp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.webapp %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    // 该task 会启用 concat、uglify、cssmin 来处理转换文件，会处理html中类似以下定义的块
    /**
     * <!-- build:js js/app.js -->
     <script src="js/app.js"></script>
     <script src="js/controllers/thing-controller.js"></script>
     <script src="js/models/thing-model.js"></script>
     <script src="js/views/thing-view.js"></script>
     <!-- endbuild -->
     **/
    useminPrepare: {
      options: {
        dest: '<%= yeoman.webapp %>'//输出路径
      },
      app: {
        src: ['<%= yeoman.app %>/index.html',
          '<%= yeoman.app %>/demo-grid.html',
          '<%= yeoman.app %>/demo-pagination.html',
          '<%= yeoman.app %>/examples.html'
        ]
        //src: ['<%= yeoman.app %>/grid.html']
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.webapp %>/{,*/}*.html'],
      css: ['<%= yeoman.webapp %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.webapp %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,// Enable dynamic expansion
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%= yeoman.webapp %>/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.webapp %>/images'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,// 合并多余的空格
          collapseBooleanAttributes: true,// Collapse boolean attributes. <input disabled="disabled"> => <input disabled>
          removeCommentsFromCDATA: true,//删除script 和style中的注解
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.webapp %>',
            src: ['*.html', 'views/{,*/}*.html'],
            dest: '<%= yeoman.webapp %>'
          }
        ]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts'
          }
        ]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.webapp %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              'bower_components/**/*',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.webapp %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: './',
            dest: '<%= yeoman.dist %>',
            src: ['<%= yeoman.server %>/**']
          },
          {
            expand: true,
            cwd: '<%= yeoman.publish %>',
            dest: '<%= yeoman.dist %>',
            src: ['**']
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      examples: {
        configFile: './examples/jasmine/grunt-karma-jasmine/karma.conf.js',
        singleRun: true
      }
    },

    // express 启动任务
    express: {
      options: {
        port: 9000
      },
      dev: {
        options: {
          script: './app.js'
        }
      }
    },

    // 把less 转换为 css 任务
    less: {
      development: {
        options: {
          paths: ['<%= yeoman.app %>/']
        },
        files: {
          '<%= yeoman.app %>/styles/base.css': '<%= yeoman.app %>/less/base.less',
          '<%= yeoman.app %>/styles/examples.css': '<%= yeoman.app %>/less/examples.less'
        }
      }
    },

    /**
     * javascript API 生成器 任务
     * docstrap 模板
     template: 'jsdoc-templetes/ink-docstrap/template',
     configure: 'jsdoc-templetes/ink-docstrap/template/jsdoc.conf.json'

     Jaguar 模板
     template: 'jsdoc-templetes/jaguar',
     configure: 'jsdoc-templetes/jaguar/conf.json'

     jsdoc3Template 模板，本地运行有问题，待研究
     template: 'jsdoc-templetes/jsdoc3Template'
     */
    jsdoc: {
      examples: {
        src: ['examples/jsdoc/src/*.js'],
        options: {
          destination: 'examples/jsdoc/doc',
          template: 'jsdoc-templetes/ink-docstrap/template',
          configure: 'jsdoc-templetes/ink-docstrap/template/jsdoc.conf.json'
        }
      }
    },

    /**
     * 替换文件中的内容
     * 默认会替换@@开头指定的内容，我们可以用option prefix 来改变，也可以用 usePrefix 禁用替换@@开头的内容，而设为替换任意指定的内容
     * 支持正则表达式
     */
    replace: {
      dist: {
        options: {
          usePrefix: false,// Default: true And  prefix Default: @@
          patterns: [
            {
              match: 'environment = \'development\'',
              replacement: 'environment = \'production\''
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['app.js'], dest: 'dist/'}
        ]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build']);
    }

    grunt.task.run([
      'clean:server', // clean .tmp
      'bowerInstall',
      'less',//把less转换为css
      'concurrent:server',// 把样式copy到临时目录中
      'autoprefixer',// 分析css 并给css3加上浏览器前缀
      'express:dev',// 启动 express
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    //'clean:server',
    'less',//把less转换为css
    'concurrent:test',
    'autoprefixer',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',// clean dist
    'bowerInstall',
    'less',
    'useminPrepare',//合并压缩文件
    'concurrent:dist',//copy css image 和 svg
    'autoprefixer',// 处理css
    'concat',// 用 useminPrepare 生成的 concat config 连接文件
    'ngmin',// 处理angular 在 .tmp下
    'copy:dist',// copy 文件
    'replace:dist',//替换文件
    'cdnify',// 处理 google cdn
    'cssmin',// 用 useminPrepare 生成的 cssmin config 压缩 css
    'uglify',// 用 useminPrepare 生成的 uglify config 压缩 js
    'rev',// 重新命名文件名，在 webapp下
    'usemin' // 用重新命名的压缩文件替换
    //'htmlmin' // 处理html文件（删除多余的代码，包括空格和换行，注释等）
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  /**
   * 以下任务为开发过程中测试用
   */
  grunt.registerTask('buildless', [
    'less'
  ]);

  grunt.registerTask('buildjsdoc', [
    'jsdoc:examples'
  ]);

  grunt.registerTask('unitexamples', [
    'karma:examples'
  ]);
};
