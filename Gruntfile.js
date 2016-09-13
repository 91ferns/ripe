'use strict';

const loadNpmTasks = require('load-grunt-tasks');

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
				files: [ './client/**/*.js', './lib/**/*.js' ],
				tasks: [ 'clean:clientJs', 'browserify' ]
			},
			clientSass: {
				files: [ './client/sass/**/*.scss' ],
				tasks: [ 'clean:clientCss', 'sass' ]
			},
			clientHtml: {
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
	        port: 8080,
	        hostname: '*',
					base: './dist',
	        onCreateServer: function(server, connect, options) {

	        }
	      }
	    }
	  }
	});

	grunt.registerTask('default', ['connect', 'build', 'watch']);
	grunt.registerTask('build:client', ['clean', 'browserify', 'sass', 'htmlmin']);
	grunt.registerTask('build', ['build:client']);

};
