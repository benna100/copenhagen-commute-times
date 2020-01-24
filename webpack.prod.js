const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SocialTags = require("social-tags-webpack-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "[name].[hash:20].js",
        path: buildPath
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
                test: /\.(scss|css|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            // translates CSS into CommonJS
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            // Runs compiled CSS through postcss for vendor prefixing
                            loader: "postcss-loader",
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
                    ],
                    fallback: "style-loader"
                })
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
            // Inject the js bundle at the end of the body of the given template
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "analysis.html",
            template: "./src/pages/analysis.html"
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
        new HtmlWebpackPlugin({
            filename: "form-submit.html",
            template: "./src/pages/form-submit.html"
        }),
        new CleanWebpackPlugin(buildPath),
        new FaviconsWebpackPlugin({
            // Your source logo
            logo: "./src/assets/favicon.png",
            // The prefix for all image files (might be a folder or a name)
            prefix: "icons-[hash]/",
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: "#fff",
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: "billige-boliger.nu",

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new ExtractTextPlugin("styles.[md5:contenthash:hex:20].css", {
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                map: {
                    inline: false
                },
                zindex: false,
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        new SocialTags({
            appUrl: "https://billige-boliger.nu",
            facebook: {
                "fb:app_id": "123456789",
                "og:url": "https://billige-boliger.nu",
                "og:type": "website",
                "og:title": "Find billige boligområder med kort pendlerafstand",
                "og:image": "./src/assets/social-facebook-image.jpg",
                "og:description":
                    "Det er nemt, hurtigt og intuitivt! Så hvad venter du på?",
                "og:site_name":
                    "Find billige boligområder med kort pendlerafstand",
                "og:locale": "da",
                "og:article:author": "Benjamin Hughes"
            },
            twitter: {
                "twitter:card": "summary_large_image",
                "twitter:creator": "@dalshughes",
                "twitter:url": "https://billige-boliger.nu",
                "twitter:title":
                    "Find billige boligområder med kort pendlerafstand",
                "twitter:description":
                    "Det er nemt, hurtigt og intuitivt! Så hvad venter du på?",
                "twitter:image": "./src/assets/social-twitter-image.jpg"
            }
        }),
        new CnameWebpackPlugin({
            domain: "billige-boliger.nu"
        }),
        new CopyPlugin([
            { from: "./src/commuter-positions", to: "commuter-positions" }
        ])
    ]
};
