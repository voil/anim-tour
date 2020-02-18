module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/styles/mixins/__mixins.sass"',
      },
    },
  },
};
