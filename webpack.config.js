/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

"use strict";

/* eslint-env node */

const path = require("path");
const webpack = require("webpack");
const { bundler } = require("@ckeditor/ckeditor5-dev-utils");
// const UglifyJsWebpackPlugin = require( 'uglifyjs-webpack-plugin' );
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	context: __dirname,

	devtool: "source-map",
	performance: { hints: false },
	externals: {
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react"
		}
	},

	entry: path.join(__dirname, "src", "ckeditor.jsx"),

	output: {
		library: "CKEditor",

		path: path.join(__dirname, "dist"),
		filename: "ckeditor.js",
		libraryTarget: "umd",
		libraryExport: "default"
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			})
		]
	},

	plugins: [
		new webpack.BannerPlugin({
			banner: bundler.getLicenseBanner(),
			raw: true
		}),
		new CopyPlugin([{ from: "src/*.d.ts", to: "./", flatten: true }])
	],

	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					compact: false,
					presets: ["@babel/preset-react"]
				}
			}
		]
	}
};
