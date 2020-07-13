module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // ["@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }],
    ["@babel/proposal-decorators", { legacy: true }],
    ["@babel/proposal-class-properties", { loose: true }],
    [
      "import",
      {
        libraryName: "al-mobile",
        libraryDirectory: "components",
      },
      "al-mobile",
    ],
    // ["import", {
    //   "libraryName": "mand-mobile",
    //   "libraryDirectory": "components"
    // }, 'mand-mobile']
  ],
};
