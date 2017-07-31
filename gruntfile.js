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
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img/'
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
        files: {
          "build/style.css": ["index.html"]
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
    cssmin: {
      dist: {
        files: {
          "css/style.min.css": ["build/style.css"]
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.loadNpmTasks('grunt-uncss');


  grunt.registerTask("img", ["imagemin"]);
  grunt.registerTask("min", ["concat", "uncss", "uglify", "cssmin"]);
  grunt.registerTask("default", ["watch"]);
};
