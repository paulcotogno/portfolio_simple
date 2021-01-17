module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Paul Cotogno";
                return args;
            })
    },
    publicPath: './',
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
            @import "@/assets/scss/_variables.scss";
          `
            }
        }
    }
};