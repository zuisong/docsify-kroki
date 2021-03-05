import { Configuration, ProgressPlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as path from "path";
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
                    loader: "babel-loader"
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
} as Configuration;
