const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const contentPath = path.resolve(__dirname, '..', 'src');
module.exports = merge.smart(common, {
  mode: 'development',
  devServer: {
    contentBase: contentPath,
    compress: true,
    port: 8080,
  },
});
