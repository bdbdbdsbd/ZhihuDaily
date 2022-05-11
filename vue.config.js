const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: { // 设置代理
    // port: 8080, //端口
    https: false, //false关闭https，true为开启
    // open: true, //自动打开浏览器
    // env: require('./dev.env'),
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    proxy: {
      '/api': {
        target: 'http://news-at.zhihu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/api7': {
        target: 'http://news-at.zhihu.com',
        changeOrigin: true,
        pathRewrite: {
          // '^/api7': '/api/7',
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy" with this
    // option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps) In our experience, they
    // generally work as expected, just be aware of this issue when enabling this
    // option.
  },
})
