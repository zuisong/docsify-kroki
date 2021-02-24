const path = require("path");
const {ProgressPlugin} = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    output: {
        filename: "docsify-kroki.js",
        path: path.resolve(__dirname, "dist"),
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
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {}],
                            ["@babel/preset-typescript"]
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new ProgressPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
        }),
    ],
};
