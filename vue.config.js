module.exports = {
  configureWebpack:{
    resolve:{
      //配置路径
      //extentions:[],
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
