// vue.config.js


module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/IngridesZaubergefaehrten/' : process.env.BASE_URL,
  
    /*
  configureWebpack: {
    resolve: {
      alias: {
        '@': './'
      }
    }
  }
  */
}
