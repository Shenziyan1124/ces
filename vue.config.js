//////////////////////////////////////////////////////
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
// externals中进行声明，key为引入的包名，value为全局变量名
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "element-ui": "ELEMENT",
};
const cdnurl = "http://bim.checc.com.cn/baisha/staticfile/";
const cdn = {
  dev: {
    css: [],
    js: []
  },
  build: {
    css: [
      cdnurl + "element/index.css",
    ],
    js: [
      cdnurl + "vue/vue.min.js",
      cdnurl + "vue/vue-router.min.js",
      cdnurl + "vue/vuex.min.js",
      cdnurl + "axios/axios.min.js",
      cdnurl + "element/index.js",
    ]
  }
};
module.exports = {
  publicPath: isProduction ? "/" : "/",
  assetsDir: "static",
  outputDir: "BimPlatforms",
  transpileDependencies:[''],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
  configureWebpack: config => {
    // let plugins = [];
    const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
    if (isProduction) {
      // plugins = [
      //   new webpack.DefinePlugin({
      //     CESIUM_BASE_URL: JSON.stringify(
      //       "http://baisha.checcbim.com/staticfile/cesium"
      //     )
      //   }),
      //   // new CopyWebpackPlugin([
      //   //   {
      //   //     from: path.join(cesiumSource, cesiumWorkers),
      //   //     to: 'static/Workers',
      //   //   }]),
      //   // new CopyWebpackPlugin(
      //   //   [{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
      //   // new CopyWebpackPlugin(
      //   //   [{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }]),
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: false,
      //       compress: {
      //         drop_console: true,
      //         drop_debugger: false,
      //         pure_funcs: ["console.log"]
      //       },
      //       output: {
      //         comments: false
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   }),
      //   new CompressionWebpackPlugin({
      //     //配置参数详解
      //     // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
      //     // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
      //     // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
      //     // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
      //     // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8
      //   })
      // ];

      Object.assign(config, {
        externals: externals
      });
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"]
            },
            output: {
              comments: false
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins.push(
        new CompressionWebpackPlugin({
          //配置参数详解
          // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
          // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
          // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
          // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
          // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      if (process.env.npm_config_report) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8889,
            reportFilename: "report.html",
            defaultSizes: "gzipped",
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: "stats.json",
            statsOptions: null,
            logLevel: "info"
          })
        );
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    modules: false,
    loaderOptions: {}
  },
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
    //   管理系统
      "/zyplatform/": {
        target: "http://jygl.checc.com.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/zyplatform": "/"
        }
      },
      //管理系统
      // "/pro_name/": {
      //   target: "http://bim.checc.com.cn/duxiang/",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/pro_name": "/"
      //   }
      // },
      //管理系统
      // "/mcplatform/": {
      //   target: "http://baisha.checcbim.com:9090/",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/mcplatform": "/"
      //   }
      // }
    }
  },
};
