module.exports = (grunt) ->

    require('time-grunt')(grunt)

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        cssmin:
            options:
                sourceMap: true
            build:
                files:
                    'build/app.min.css': [
                        'css/<%= pkg.name %>.css'
                    ]

        htmlmin:
            build:
                options:
                    removeComments: true
                    collapseWhitespace: true
                files:
                    'build/index.html': 'source.html'

        jshint:
            beforeconcat: [
                'js/*.js'
            ]
            # afterconcat: [
            #     'build/app.min.js'
            # ]
            options:
                jshintrc: true

        processhtml:
            options:
                data:
                    variable: '42'
            dist:
                files:
                    'source.html': 'raw.html'

        uglify:
            build:
                options:
                    mangleProperties: false
                    preserveComments: false
                    reserveDOMProperties: true
                    screwIE8: true
                    sourceMap: true
                files:
                    'build/app.min.js': [ 'js/<% pkg.name %>.js' ]

        watch:
            scripts:
                files: [
                    'js/*.js'
                    'css/*.css'
                ]
                tasks: [
                    'cssmin'
                    'uglify'
                    'jshint'
                ]

    # Load the plugins
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-notify'
    grunt.loadNpmTasks 'grunt-processhtml'

    # Default task(s).
    grunt.registerTask 'default', [
        'processhtml'
        'htmlmin'
        'cssmin'
        'uglify'
        'watch'
    ]
