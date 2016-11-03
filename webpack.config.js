var path = require('path');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: {
		"plain": path.resolve(APP_PATH, 'plain.jsx'),
		"flux": path.resolve(APP_PATH, 'flux.jsx'),
		"react-redux": path.resolve(APP_PATH, 'react-redux.jsx'),
		"redux": path.resolve(APP_PATH, 'redux.jsx'),
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].build.js'
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: APP_PATH
			},
			{
				test: /\.(png|jpg)$/,
		        loader: 'url?limit=40000'
		    },
		    {
				test: /\.jsx?$/,
				loader: 'babel',
				include: APP_PATH,
				query: {
				  presets: ['es2015','react']
				}
			}
		]
	}
};