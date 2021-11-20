module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应的是我们设计高的高度（也可以不配置）
      unitPrecision: 5,//指定‘px’转换为视窗单位值小数点后几位
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//不需要转换的类
      minPixelValue: 1,//小于或等于1px的不转换成视窗单位
      mediaQuery: false
      //exclude:[/TabBar/]
    }
  }
}
