'use strict';

const loadNpmTasks = require('load-grunt-tasks');
const liveReload = require('connect-livereload')();

module.exports = (grunt) => {
	loadNpmTasks(grunt);

	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					'./dist/javascript/app.js': ['./client/javascript/index.js']
				},
				options: {
					transform: [
            ['babelify']
         ]
				}
			}
		},
		sass: {
	    dist: {
	      options: {
	        style: 'expanded'
	      },
	      files: [{
					src: ['**/*.scss'],
					dest: './dist/styles',
					ext: '.css',
					cwd: './client/sass/',
					expand: true
				}]
	    }
	  },
		clean: {
			clientCss: [ './dist/styles' ],
			clientJs: [ './dist/javascript' ],
			clientHtml: ['./dist/**/*.html' ]
		},
		watch: {
			clientJs: {
				options: { livereload: true },
				files: [ './client/**/*.js', './lib/**/*.js' ],
				tasks: [ 'clean:clientJs', 'browserify' ]
			},
			clientSass: {
				options: { livereload: true },
				files: [ './client/sass/**/*.scss' ],
				tasks: [ 'clean:clientCss', 'sass' ]
			},
			clientHtml: {
				options: { livereload: true },
				files: [ './client/**/*.html' ],
				tasks: [ 'clean:clientHtml', 'htmlmin' ]
			},
			server: {
				files: ['./server/**/*.js', './lib/**/*.js' ],
				tasks: []
			}
		},
		htmlmin: {
	    dist: {
	      options: {
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: {
	        './dist/index.html': './client/index.html',
	      }
	    }
	  },
		connect: {
	    server: {
	      options: {
					livereload: true,
	        port: 8080,
	        hostname: '*',
					base: './dist',
					middleware: function (connect, options, middlewares) {
		        middlewares.unshift(liveReload);
						return middlewares;
		      }
	      }
	    }
	  }
	});

	grunt.registerTask('default', ['connect', 'build', 'watch']);
	grunt.registerTask('build:client', ['clean', 'browserify', 'sass', 'htmlmin']);
	grunt.registerTask('build', ['build:client']);

};
