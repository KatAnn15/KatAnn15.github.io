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
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
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
      test: /\.(woff(2)?|ttf|eot)?$/i,
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
    new CopyPlugin({
      patterns: [{ from: "src", to: "dist" }],
    }),
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
    entry: "./src/index.tsx",
    output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: setRules(mode),
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: setPlugins(mode),
    resolve: {
      extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
      plugins: [new TsConfigPathsPlugin()],
    },
  };

  if (mode === "development") {
    config.devServer = {
      static: "./dist",
    };
  }

  return config;
};
