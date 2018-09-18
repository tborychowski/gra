const gulp = require('gulp');
const livereload = require('gulp-livereload');
const isProd = require('minimist')(process.argv.slice(2)).prod;

const SRC_PATH = './src/';
const PUBLIC_PATH = './public/';


function webpackLogger (err) {
	const chalk = require('chalk');
	let time = new Date().toTimeString().substr(0,8);
	let message = 'Finished ' + chalk.green('webpack') + ' build';
	if (err) { message = chalk.red(err); time = chalk.red(time); }
	else time = chalk.grey(time);
	console.log(`[${time}] ${message}`); /* eslint no-console: 0 */
}


gulp.task('eslint', () => {
	const eslint = require('gulp-eslint');
	return gulp.src([SRC_PATH + '**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});


gulp.task('assets', () => {
	gulp.src(['assets/*.*']).pipe(gulp.dest(PUBLIC_PATH));
});


gulp.task('js', ['eslint'], () => {
	const webpack = require('webpack');
	const webpackStream = require('webpack-stream');
	const path = require('path');
	const MinifyPlugin = require('babel-minify-webpack-plugin');

	const webpackConfig = {
		devtool: isProd ? undefined : 'inline-source-map',
		mode: isProd ? 'production' : 'development',
		entry: { index: SRC_PATH + 'index.js' },
		output: { filename: 'app.js', path: path.join(__dirname, 'public'), publicPath: PUBLIC_PATH },
		resolve: { extensions: ['.js', '.json', '.html'] },
		module: { rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
			{ test: /\.html$/, exclude: /node_modules/, use: { loader: 'svelte-loader', options: { css: false }}},
		]},
		plugins: isProd ? [ new MinifyPlugin() ] : []
	};


	return gulp.src([SRC_PATH + 'index.js'])
		.pipe(webpackStream(webpackConfig, webpack, webpackLogger))
		.on('error', function () { this.emit('end'); })
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload());

});


gulp.task('styl', () => {
	const sourcemaps = require('gulp-sourcemaps');
	const cssmin = require('gulp-clean-css');
	const concat = require('gulp-concat');
	const stylus = require('gulp-stylus');
	const noop = require('through2').obj;

	return gulp.src([SRC_PATH + 'index.styl', SRC_PATH + '**/*.styl'])
		.pipe(isProd ? noop() : sourcemaps.init())
		.pipe(stylus({ paths: [SRC_PATH], 'include css': true }))
		.pipe(isProd ? cssmin({ keepSpecialComments: 0 }) : noop())
		.pipe(concat('app.css'))
		.pipe(isProd ? noop() : sourcemaps.write())
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload());
});


gulp.task('default', [ 'assets', 'styl', 'js' ], () => {
	if (isProd) return;
	livereload.listen();
	gulp.watch(SRC_PATH + '**/*.styl', ['styl']);
	gulp.watch(SRC_PATH + '**/*.js', ['js']);
	gulp.watch(SRC_PATH + '**/*.html', ['js']);
	gulp.watch('assets/**/*.*', ['assets']);
});
