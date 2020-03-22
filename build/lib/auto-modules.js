const logger = require("./logger"); // 自定义工具-用于日志打印
const { getNpmParams } = require("./npm-params"); // 获取打包命令参数
//debug-测试模块打包参数--调试时候将上面注释-下面放开
// const getNpmParams = function() {
//   return {
//     buildModule: ["demo", "home"]
//   };
// };
const buildModule = getNpmParams().buildModule[
  process.env.myModules === undefined ? 0 : process.env.myModules
]; // 当前打包命令中的打包模块-数组
const fs = require("fs"); // 文件模块

// console.log("%c getNpmParams", "color:#00CD00", getNpmParams());
// console.log("%c process.env.myModules", "color:#00CD00", process.env.myModules);

/**
 * 获取模块配置pages
 */
exports.getPages = function() {
  let entry = `src/modules/${buildModule}/main.js`; // 入口
  let template = `src/modules/${buildModule}/html/index.html`; // 模版
  // 如果模块不存在自己的入口那么取公用的入口main.js
  if (!fs.existsSync(entry)) {
    logger.log("模块不存在自己的入口那么取公用的入口main.js");
    entry = "src/modules/common/main.js";
  }
  // 如果模块不存在自己的模版那么取公用的页面模版
  if (!fs.existsSync(template)) {
    logger.log("模块不存在自己的模版那么取公用的页面模版");
    template = "public/index.html";
  }
  let pages = {};
  pages[`${buildModule}Index` || "commonIdex"] = {
    // page 的入口
    entry: entry,
    // 模板来源
    template: template,
    // 在 dist/module-name/index.html 的输出
    filename: "index.html",
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: process.env.VUE_APP_NAME || "vue",
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: [
      "chunk-vendors",
      "chunk-common",
      `${buildModule}Index` || "commonIdex"
    ]
  };
  logger.log("输出pages " + JSON.stringify(pages));
  return pages;
};

/**
 * 获取模块配置输出目录
 */
exports.getOutputDir = function() {
  let outputDir = `../dist/${buildModule}`;
  logger.log("当前打包输出目录>>>>>>>>  " + outputDir);
  return outputDir;
};

/**
 * 获取打包模块数组
 */
exports.getBuildModuleList = function() {
  return getNpmParams().buildModule;
};

/**
 * html挂载cdn处理
 */
exports.dealHtmlCdn = function(config) {
  let cdn = {
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2.6.11",
      "https://unpkg.com/vue-router@3.1.5/dist/vue-router.js",
      "https://unpkg.com/vuex@3.1.2"
    ]
  };
  //只处理生产-因为本地运行会需要进行log调试
  if (process.env.NODE_ENV === "production") {
    //处理cdn
    logger.log("开始处理" + buildModule + "模块cdn");
    config.plugin(`html-${buildModule}Index`).tap(args => {
      // console.log("%c args", "color:#00CD00", args);
      args[0].cdn = cdn;
      return args;
    });
  }
};
