const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const setRules = (mode) => {
  const rules = [
    {
      test: /\.(tsx?|jsx?)$/i,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  edge: "17",
                  firefox: "60",
                  chrome: "67",
                  safari: "11.1",
                },
                useBuiltIns: "usage",
                corejs: "3.6.5",
              },
            ],
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
        },
      },
    },
    {
      test: /\.html$/i,
      use: {
        loader: "html-loader",
      },
    },
    {
      test: /\.(png|jp?eg|svg|webp)$/i,
      use: {
        loader: "file-loader",
        options: {
          file: "[name].[ext]",
          outputPath: "/assets/images/",
          publicPath: "./assets/images/",
        },
      },
    },
    {
      test: /\.(woff|ttf|eot)?$/i,
      use: {
        loader: "file-loader",
        options: {
          file: "[name].[ext]",
          outputPath: "/assets/fonts/",
          publicPath: "./assets/fonts/",
        },
      },
    },
  ];
  if (mode === "production") {
    rules.push({
      test: /\.(s?css)$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    });
  } else {
    rules.push({
      test: /\.(s?css)$/i,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });
  }
  return rules;
};

const setPlugins = (mode) => {
  const plugins = [
    new HtmlWebpackPlugin({ template: "./src/templates/template.html" }),
    new CleanWebpackPlugin(),
    new ImageminWebpWebpackPlugin(),
  ];
  if (mode === "production") {
    plugins.push(
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
    );
  }
  return plugins;
};

module.exports = (env, options) => {
  const mode = options.mode;

  const config = {
    entry: ["@babel/polyfill", "./src/index.tsx"],
    output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: setRules(mode),
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
      minimize: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: setPlugins(mode),
    resolve: {
      extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".png"],
      plugins: [
        new TsConfigPathsPlugin({
          configFile: path.resolve(__dirname, "tsconfig.json"),
        }),
      ],
      alias: {
        "@images": path.resolve(__dirname, "src/assets/images"),
      },
    },
    devServer: {
      static: "./dist",
    },
  };
  return config;
};
