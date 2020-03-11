module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  "plugins": [
    ["import", {
      "libraryName": "al-mobile",
      "libraryDirectory": "components"
    }, 'al-mobile'],
    // ["import", {
    //   "libraryName": "mand-mobile",
    //   "libraryDirectory": "components"
    // }, 'mand-mobile']
  ]
};
