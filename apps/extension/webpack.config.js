const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    // 这个devtool是用来生成source map的，方便调试，而且还比较重要；不然跑不了，后续需要深入学习一下了
    devtool: 'source-map',
    entry: {
        popup: "./src/entry/popup.tsx",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"], // 支持 TypeScript 文件
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    to: "manifest.json",
                },
                {
                    from: "src/popup.html",
                    to: "popup.html",
                },
            ],
        }),
    ],
};
