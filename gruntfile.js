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
  grunt.registerTask("default", ["watch"]);
};
