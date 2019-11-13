module.exports = {
    pages: {
        index: {
            entry: './src/pages/main/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /\/*/, to: '/index.html' },
            ]
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/scss/reset.scss";`
            }
        }
    }
};