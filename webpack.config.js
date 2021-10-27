const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.tsx"],
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
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
    ],
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
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".png"],
    plugins: [],
    alias: {
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@redux": path.resolve(__dirname, "src/scripts/Redux"),
      "@constants": path.resolve(__dirname, "src/scripts/Constants"),
    },
    fallback: {
      https: false,
    },
  },
  devServer: {
    static: "./dist",
  },
};
