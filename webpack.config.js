var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'./src/app.js'
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/static/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			include: __dirname,
			loader: 'babel'
		}]
	}
};
