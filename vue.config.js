const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: './',
    indexPath: 'index.html',
    outputDir: 'www',
    productionSourceMap: isDev,
    css: {
        sourceMap: isDev
    }
};
