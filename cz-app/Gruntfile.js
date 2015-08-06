module.exports = function(grunt) {

          grunt.initConfig({

              banner: '/*! @<%= pkg.name %> Date: <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',

              srcDir: 'src',
              buildDir: 'czapp-dist',
              jsDir: 'js',
              lessDir: 'assets/less',
              cssDir: 'css',
              cssName: 'style',
              imgDir: 'img',
              fontsDir: 'fonts',
              pagesDir: 'page',
              pageDir: 'view',
              _footer:'layout/footer.html',

             //读取package.json的内容，形成个json数据
             pkg: grunt.file.readJSON('package.json'),  
             concat: {
              options: {

              }
            },

            htmlbuild: {
              mobile: {
                src: '<%= srcDir %>/<%= pagesDir %>/<%= pageDir %>/*.html',
                dest: '<%= buildDir %>/',
                options: {
                  beautify: true,
                  relative: true,
                  sections: {
                    layout: {
                      footer: '<%= srcDir %>/<%= pagesDir %>/<%= _footer %>',
                      meta: '<%= srcDir %>/<%= pagesDir %>/layout/meta.html',
                    }
                  }
                }
              }
            },

            connect: {
                options: {
                    port: 8000,
                    hostname: '192.168.1.52', 
                    livereload: 35729 
                },
                server: {
                    options: {
                        open: true, 
                        base: [
                        // 实时预览路径
                            './'+'<%= buildDir %>' 
                        ]
                    }
                }
            },

            clean: {
              js: {src: '<%= copy.js.dest %>'},
              img: {src: '<%= copy.img.dest %>'},
              fonts: {src: '<%= copy.fonts.dest %>'}
            },

            copy: {
                img: {
                    expand: true,
                    cwd: '<%= srcDir %>/assets/<%= imgDir %>/',
                    src: ['{,*/}*'],
                    dest: '<%= buildDir %>/<%= imgDir %>/'
                },

                js: {
                    expand: true,
                    cwd: '<%= srcDir %>/assets/<%= jsDir %>/',
                    src: ['{,*/}*'],
                    dest: '<%= buildDir %>/<%= jsDir %>/'
                },


                fonts: {
                    expand: true,
                    cwd: '<%= srcDir %>/assets/<%= fontsDir %>/',
                    src: ['{,*/}*'],
                    dest: '<%= buildDir %>/<%= fontsDir %>/'
                },

            },

            less: {
              development: {
                options: {
                  compress: false,
                  yuicompress: false
                },
                files: {
                        '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css':'<%= srcDir %>/<%= lessDir %>/<%= cssName %>.less',
                }
              },
              banner: {
                options: {
                  banner: '<%= banner %>'
                },
                files: {
                  '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css':'<%= srcDir %>/<%= lessDir %>/<%= cssName %>.less',
                }
              }
            },

            sprite: {
                all: {
                    src: ['<%= srcDir %>/assets/<%= imgDir %>/sprites/*'],
                    dest: '<%= srcDir %>/assets/<%= imgDir %>/sprite.png',
                    destCss: '<%= srcDir %>/<%= lessDir %>/sprites.less',
                    algorithm: 'top-down',
                    padding: 5
                }
            },

            imagemin: {
                dist: {
                    files: [{
                    expand: true,
                    cwd: '<%= srcDir %>/assets/img',
                    src: '**/*.{gif,GIF,jpg,JPG,png,PNG}',
                    dest: '<%= buildDir %>/img'
                  }]
                }
            },


            autoprefixer : {
              // options: {
              //   browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
              //  },
               dist : {
                    files : { 
                      '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css':'<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css',
                    } 
              } 
            },


            watch: {
              options: {
                  //显示日志
                  dateFormate: function(time) {
                      grunt.log.writeln('编译完成,用时' + time + 'ms ' + (new Date()).toString());
                      grunt.log.writeln('Wating for more changes...');
                  }
              },
              
              grunt: {
                files: ['Gruntfile.js']
              },

              img: {
                files: ['<%= srcDir %>/assets/<%= imgDir %>/{,*/}*'],
                tasks: ['clean:img', 'copy:img', 'sprite','imagemin']
               },

              fonts: {
                files: ['<%= srcDir %>/<%= fontsDir %>/{,*/}*'],
                tasks: ['clean:fonts', 'copy:fonts']
              },

              js: {
                files: ['<%= srcDir %>/assets/<%= jsDir %>/{,*/}*'],
                tasks: ['clean:js', 'copy:js']
              },

              styles: {
                files: ['<%= srcDir %>/<%= lessDir %>/**.less',],
                tasks: ['less','autoprefixer'],
                options: {
                  nospawn: true,
                  livereload: true
                }
              },

              htmls: {
                files: ['<%= srcDir %>/<%= pagesDir %>/<%= pageDir %>/**.html',],
                tasks: ['htmlbuild'],
                options: {
                  nospawn: true,
                  livereload: true
                }
              },

              livereload: {
                  options: {livereload: '<%=connect.options.livereload%>'},
                  files: [],
              }

            }


          });

         //输出进度日志
          grunt.event.on('watch', function(action, filepath, target) {
              grunt.log.writeln(target + ': ' + '文件: ' + filepath + ' 变动状态: ' + action);
          });
          
          grunt.loadNpmTasks('grunt-contrib-connect');
          grunt.loadNpmTasks('grunt-contrib-concat');
          grunt.loadNpmTasks('grunt-contrib-less');
          grunt.loadNpmTasks('grunt-contrib-watch');
          grunt.loadNpmTasks('grunt-html-build');
          grunt.loadNpmTasks('grunt-spritesmith');
          grunt.loadNpmTasks('grunt-contrib-imagemin');
          grunt.loadNpmTasks('grunt-autoprefixer');
          grunt.loadNpmTasks('grunt-contrib-clean');
          grunt.loadNpmTasks('grunt-contrib-copy');

          grunt.loadNpmTasks('grunt-contrib-uglify');
          grunt.loadNpmTasks('grunt-postcss');

          grunt.registerTask('serve', ['connect:server','watch']);


        };