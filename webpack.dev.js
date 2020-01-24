const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: "./src/index.js",
    devServer: {
        // access from mobile on same network
        // host: '192.168.1.1', <-- your ip here
        host: "192.168.1.122",
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/",
                            publicPath: "assets/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: "analysis.html",
            template: "./src/pages/analysis.html"
        }),
        new HtmlWebpackPlugin({
            filename: "form-submit.html",
            template: "./src/pages/form-submit.html"
        }),
        new HtmlWebpackPlugin({
            filename: "brennum-park-1-3400-hillerod.html",
            template: "./src/pages/custom-map-template.ejs",
            templateParameters: function(compilation, assets, options) {
                return {
                    commuterPositionsFileName: "brennum-park-1-3400-hillerod",
                    originalAdress: "Brennum park 1 3400 Hillerod"
                };
            }
        }),
        new HtmlWebpackPlugin({
            filename: "guldbergs-have-2200-n.html",
            template: "./src/pages/custom-map-template.ejs",
            templateParameters: function(compilation, assets, options) {
                return {
                    commuterPositionsFileName: "guldbergs-have-2200-n",
                    originalAdress: "Guldbergs have 2200 n"
                };
            }
        }),
        new HtmlWebpackPlugin({
            filename: "horkaer-18-herlev.html",
            template: "./src/pages/custom-map-template.ejs",
            templateParameters: function(compilation, assets, options) {
                return {
                    commuterPositionsFileName: "horkaer-18-herlev",
                    originalAdress: "Hørkær 18, Herlev"
                };
            }
        }),
        new CopyPlugin([
            { from: "./src/commuter-positions", to: "commuter-positions" }
        ])
    ]
};