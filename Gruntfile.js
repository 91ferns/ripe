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
		imagemin: {
	    client: {
	      options: {
	        optimizationLevel: 3,
	      },
	      files: [{
	        expand: true,
					src: ['**/*.{png,gif,jpg}'],
					dest: './dist/images',
					cwd: './client/images'
	      }]
	    },
		},
		sass: {
			options: {
				loadPath: [
					'./node_modules/bootstrap-sass/assets/stylesheets/'
				]
			},
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
			clientImages: [ './dist/images' ],
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
				tasks: [ 'clean:clientHtml', 'imagemin:client', 'htmlmin' ]
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
					'./dist/employees.html': './client/employees.html',
					'./dist/employers.html': './client/employers.html',
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
	grunt.registerTask('build:client', ['clean', 'browserify', 'sass', 'imagemin', 'htmlmin']);
	grunt.registerTask('build', ['build:client']);

};
