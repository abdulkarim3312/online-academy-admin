const path = require('path');
const {
  CKEditorTranslationsPlugin,
} = require('@ckeditor/ckeditor5-dev-translations');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  publicPath: process.env.VUE_APP_BASE,
  outputDir: 'dist',
  assetsDir: 'static',

  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],

  configureWebpack: {
    plugins: [
      new CKEditorTranslationsPlugin({
        language: 'en',
        translationsOutputFile: /app/,
      }),
    ],
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    config.module
      .rule('cke-svg')
      .test(/theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');

    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return {
          postcssOptions: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
            },
            minify: true,
          }),
        };
      });
  },
};
