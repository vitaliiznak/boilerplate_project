const {
  override,
  addDecoratorsLegacy,
  addLessLoader,
  addBabelPlugins
} = require("customize-cra");

module.exports = override(
  /*  override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    })
  ), */
  addLessLoader({
    javascriptEnabled: true
  }),
  ...addBabelPlugins("emotion"),
  addDecoratorsLegacy()
);
