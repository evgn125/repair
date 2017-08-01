"use strict";

module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      development: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({
              browsers: [
              "last 50 versions"
            ]
            })
          ]
        },
        src: "css/style.css"
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 7,
      },
      dist: {
        files: [{
          expand: true,
          cwd: "img/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "build/img/"
        }]
      }
    },
    concat: {
      dist: {
        files: {
          "build/script.js": ["js/jquery.min.js", "js/bootstrap.min.js", "js/script.js"]
        }
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: [
                ".fade",
                ".fade.in",
                ".collapse",
                ".collapse.in",
                ".collapsing",
                ".alert-danger",
                /\.open/
           ],
        },
        files: {
          "build/style.css": ["index.html"]
        }
      }
    },
    combine_mq: {
      dist: {
        src: "build/style.css",
        dest: "build/style_mq.css"
      }
    },
    cssmin: {
      dist: {
        files: {
          "css/style.min.css": ["build/style_mq.css"]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          "js/script.min.js": ["build/script.js"]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          preserveLineBreaks: true
        },
        files: {
          "index.html": "index.html"
        }
      }
    },
    watch: {
      styles: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-uncss");
  grunt.loadNpmTasks("grunt-combine-mq");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.registerTask("img", ["imagemin"]);
  grunt.registerTask("min", ["concat", "uncss", "combine_mq", "cssmin", "uglify"]);
  grunt.registerTask("ht", ["htmlmin"]);
  grunt.registerTask("default", ["watch"]);
};
