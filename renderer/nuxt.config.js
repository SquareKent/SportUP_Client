export default {
  css: ['@/assets/scss/application.scss'],
  head: {
    title: 'Sport Club',
    meta: [
      { charset: 'utf-8' }
    ],
  },
  build: {
    extend: (config) => {
      config.module.rules.push({
            test: /.scss$/,
            use: 'webpack-import-glob-loader'
      });
      config.target = 'electron-renderer';
    },
  },
}
