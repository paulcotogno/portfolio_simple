module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Paul Cotogno";
                return args;
            })
    },
    publicPath: process.env.BASE_URL,
    assetsDir: process.env.BASE_URL,
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    css: {
        loaderOptions: {
            scss: {
                data: `
            @import "@/assets/scss/_variables.scss";
          `
            }
        }
    }
};