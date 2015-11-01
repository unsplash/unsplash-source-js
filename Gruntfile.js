/*
# Gruntfile
===========

All up in your code building your javascripts and stuff.

Packages used:
 
  - JSHint
  - Karma
  - Concat
  - Uglify

 */

var paths;

paths = {
  src: function (subpath) {
    return "./src/" + subpath;
  },
  dist: function (subpath) {
    return "./dist/" + subpath;
  },
  tests: function (subpath) {
    return "./tests/" + subpath;
  }
};

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    /*
    ## JS Hint
    https://github.com/gruntjs/grunt-contrib-jshint
     */
    "jshint": {
      files: [
        "Gruntfile.js",
        paths.src("core.js"),
        paths.tests("urls.js"),
      ],
      options: {
        globals: {
          console: true,
          module: true,
        }
      }
    },

    /*
    ## Karma
    https://github.com/karma-runner/grunt-karma
     */
    karma: {
      unit: {
        options: {
          files: [
            paths.src("polyfills.js"),
            paths.src("core.js"),
            paths.tests("**/*.js"),
          ],
          singleRun: true,
          frameworks: ["jasmine"],
          browsers: ["PhantomJS"],
        }
      }
    },

    /*
    ## Concat
    https://github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        stripBanners: false,
        banner: "/*! https://unsplash.com <%= pkg.name %> - v<%= pkg.version %> - " +
        "<%= grunt.template.today('yyyy-mm-dd') %> " + "\n\n"
      },
      js: {
        src: [
          paths.src("banner.js"),
          paths.src("polyfills.js"),
          paths.src("core.js"),
        ],
        dest: paths.dist("unsplash-source.js"),
      },
    },

    /*
    ## Uglify
    https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      options: {
        stripBanners: true,
        banner: "/*! https://unsplash.com <%= pkg.name %> - v<%= pkg.version %> - " +
        "<%= grunt.template.today('yyyy-mm-dd') %> " + "*/\n\n"
      },

      js: {
        files: [{
          src: paths.dist("unsplash-source.js"),
          dest: paths.dist("unsplash-source.min.js")
        }],
      },
    },

  });

  // Load development plugins
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask("build", ["concat", "uglify"]);
  grunt.registerTask("test", ["jshint", "karma"]);
};
