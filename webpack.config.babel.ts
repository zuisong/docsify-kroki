import { Configuration, ProgressPlugin } from "webpack";
import * as path from "path";

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: "docsify-kroki.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
} as Configuration;
