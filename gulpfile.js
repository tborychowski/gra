const gulp = require('gulp');
const cssmin = require('gulp-clean-css');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const noop = require('through2').obj;
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const env = require('gulp-env');
const isProd = require('minimist')(process.argv.slice(2)).prod;
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const PUBLIC_PATH = 'public/';


env.set({ NODE_ENV: isProd ? 'production' : 'development' });


gulp.task('help', () => {
	const tasks = '  ' + Object.keys(gulp.tasks).sort().join('\n  ');
	console.log(`\nAvailable tasks:\n${tasks}\n`);/* eslint no-console: 0 */
});


gulp.task('eslint', () => {
	return gulp.src(['client/**/*.js', 'server/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});


gulp.task('assets', () => {
	gulp.src(['assets/*.*']).pipe(gulp.dest(`${PUBLIC_PATH}`));
});


gulp.task('js', ['eslint'], () => {
	if (!isProd) {
		webpackConfig.devtool = 'inline-source-map';
		webpackConfig.mode = 'development';
	}
	else {
		const MinifyPlugin = require('babel-minify-webpack-plugin');
		webpackConfig.plugins = [ new MinifyPlugin() ];
	}

	return gulp.src(['client/index.js'])
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload());

});


gulp.task('styl', () => {
	return gulp.src(['client/index.styl', 'client/**/*.styl'])
		.pipe(isProd ? noop() : sourcemaps.init())
		.pipe(stylus({ paths: ['client'], 'include css': true }))
		.pipe(isProd ? cssmin({ keepSpecialComments: 0 }) : noop())
		.pipe(concat('app.css'))
		.pipe(isProd ? noop() : sourcemaps.write())
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload());
});


let serverStarted = false;
gulp.task('server', done => {
	return nodemon({ script: './server/index.js', watch: ['./server'], ext: 'js html' })
		.on('start', () => {
			if (serverStarted) return;
			serverStarted = true;
			setTimeout(done, 500);
		});
});


gulp.task('watch', ['default'], () => {
	if (isProd) return;
	livereload.listen();
	gulp.watch('client/**/*.styl', ['styl']);
	gulp.watch('client/**/*.js', ['js']);
	gulp.watch('client/**/*.html', ['js']);
	gulp.watch('assets/**/*.*', ['assets']);
});


gulp.task('default', [ 'js', 'styl', 'assets', 'eslint' ]);
