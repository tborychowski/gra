const path = require('path');

module.exports = {
	// devtool: 'inline-source-map',
	// mode: 'development',
	entry: { index: './client/index.js' },
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'public'),
		publicPath: './public/',
	},
	resolve: { extensions: ['.js', '.json', '.html'] },
	// stats: 'minimal',
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: { loader: 'svelte-loader', options: { css: false } },
			},
		]
	}
};
