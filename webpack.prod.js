const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SocialTags = require("social-tags-webpack-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const SitemapPlugin = require("sitemap-webpack-plugin").default;

const buildPath = path.resolve(__dirname, "dist");
const slugify = require("slugify");

const _getAllFilesFromFolder = function(dir) {
    const filesystem = require("fs");
    const results = [];

    filesystem.readdirSync(dir).forEach(function(file) {
        const fileOriginal = file;
        file = dir + "/" + file;
        const stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(fileOriginal));
        } else results.push(fileOriginal);
    });

    return results;
};

const customPages = [];
const allUrls = [];
function createCustomPages() {
    _getAllFilesFromFolder(__dirname + "/src/commuter-positions")
        .filter(file => file.substr(0, 4) !== "city")
        .forEach(file => {
            const commuterPositions = require(`./src/commuter-positions/${file}`);
            allUrls.push(`/${commuterPositions.slugifiedAdress}`);
            customPages.push(
                new HtmlWebpackPlugin({
                    filename: `${commuterPositions.slugifiedAdress}.html`,
                    template: "./src/pages/custom-map-template.ejs",
                    templateParameters: function(compilation, assets, options) {
                        return {
                            commuterPositionsFileName:
                                commuterPositions.slugifiedAdress,
                            originalAdress:
                                commuterPositions.originalAdresses[0]
                        };
                    }
                })
            );
        });
}
createCustomPages();

const cheapestSeoPages = [];
function createCheapestSeoPages() {
    _getAllFilesFromFolder(__dirname + "/src/commuter-positions")
        .filter(file => file.substr(0, 4) === "city")
        .forEach(file => {
            const commuterPositions = require(`./src/commuter-positions/${file}`);

            const cityName = slugify(commuterPositions.cityName, {
                lower: true
            });
            const subUrl = slugify("tæt-på", {
                lower: true
            });
            const url = `${subUrl}/${cityName}`;
            allUrls.push(`/${url}`);
            customPages.push(
                new HtmlWebpackPlugin({
                    filename: `${url}.html`,
                    template: "./src/pages/cheapest-cities-short-distance.ejs",
                    templateParameters: function(compilation, assets, options) {
                        return {
                            commuterPositionsFileName:
                                commuterPositions.slugifiedAdress,
                            cityName: commuterPositions.cityName
                        };
                    }
                })
            );
        });
}

createCheapestSeoPages();

let cityOptions = "";
_getAllFilesFromFolder(__dirname + "/src/commuter-positions")
    .filter(file => file.substr(0, 4) === "city")
    .map(file => require(`./src/commuter-positions/${file}`))
    .sort(function(a, b) {
        if (a.cityName < b.cityName) {
            return -1;
        }
        if (a.cityName > b.cityName) {
            return 1;
        }
        return 0;
    })
    .forEach(commuterPositions => {
        const origin = commuterPositions.originPosition;
        const selectedOrNot =
            commuterPositions.slugifiedAdress === "copenhagen"
                ? "selected"
                : "";

        const option = `
        <option
            data-center="${origin.latitude},${origin.longitude}"
            value="${commuterPositions.slugifiedAdress}"
            ${selectedOrNot}
            >
            ${commuterPositions.cityName}
        </option>
        `;

        cityOptions += option;
    });
/* basic paths -- directly compatible with static-site-generator-webpack-plugin */
const paths = [...allUrls];

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
            template: "./index.ejs",
            filename: `index.html`,
            inject: "body",
            templateParameters: function(compilation, assets, options) {
                return {
                    cityOptions
                };
            }
        }),
        new HtmlWebpackPlugin({
            filename: "analysis.html",
            template: "./src/pages/analysis.html"
        }),
        new HtmlWebpackPlugin({
            filename: "form-submit.html",
            template: "./src/pages/form-submit.html"
        }),
        ...customPages,
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
                "og:title": "Find et sted at bo med kort pendlertid",
                "og:image": "./src/assets/social-facebook-image.jpg",
                "og:description":
                    "Det er nemt, hurtigt og intuitivt! Så hvad venter du på?",
                "og:site_name": "Find et sted at bo med kort pendlertid",
                "og:locale": "da",
                "og:article:author": "Benjamin Hughes"
            },
            twitter: {
                "twitter:card": "summary_large_image",
                "twitter:creator": "@dalshughes",
                "twitter:url": "https://billige-boliger.nu",
                "twitter:title": "Find et sted at bo med kort pendlertid",
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
        ]),
        new CopyPlugin([{ from: "./robots.txt", to: "" }]),
        new SitemapPlugin("https://billige-boliger.nu/", paths)
    ]
};
