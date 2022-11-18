const path = require("path");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/app.ts",
  devtool: "inline-source-map",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new Dotenv()],
};
