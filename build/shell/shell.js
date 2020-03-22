/* eslint-disable */
// 回调函数版
const { exec } = require("child_process");
const logger = require("../lib/logger"); // 自定义工具-用于日志打印
const { initCreateTest } = require("../component-init-create"); // 自定义工具-用于日志打印

/**
 * 测试模块创建
 */
// let answersM = {
//   moduleName: 'home-test',
//   moduleCnName: '模块测试',
//   viewName: 'my-view',
//   viewCnName: '第一个页面测试',
//   componentType: 'business',
//   moduleDesc: '放到沙发上',
//   author: 'xuyuanliang',
//   time: '2020年03月19日'
// };
// initCreateTest({ template: 'module'},answersM);
/**
 * 测试页面创建
 */
// let answersV = {
//   moduleName: 'homeTest',
//   viewName: 'show-content',
//   viewCnName: '页面创建测试',
//   isCreateRouter: 'true'
// }
// initCreateTest({ template: 'view'}, answersV);
/**
 * 测试vuex创建
 */
// let answersVuex = {
//   moduleName: 'homeTest',
//   vuexState: 'routers',
//   vuexDesc: '路由信息',
//   vuexStateDefault: '',
//   template: { key: 'vuex', desc: '创建vuex' },
//   vuexStateKebabUpper: 'routers',
//   vuexType: 'ROUTERS'
// }
// initCreateTest({ template: 'vuex'}, answersVuex);

/**
 * 测试serve创建
 */
// process.env.myModules = 1;
exec(
  "node build/service/my-service.js serve -m-demo --mode dev",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    logger.success(`stdout: ${stdout}`);
    logger.success(`stderr: ${stderr}`);
  }
);

/**
 * 测试build创建
 */
// process.env.myModules = 1;
// exec(
//   "node build/service/my-service.js build --mode int",
//   (error, stdout, stderr) => {
//     if (error) {
//       console.error(`执行出错: ${error}`);
//       return;
//     }
//     logger.success(`stdout: ${stdout}`);
//     logger.success(`stderr: ${stderr}`);
//   }
// );

/**
 * 其他测试
 */
// exec(
//   "node build/init-module.js env=int select=default",
//   (error, stdout, stderr) => {
//     if (error) {
//       console.error(`执行出错: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   }
// );

// const shellJs = require("shelljs");
// shellJs.exec("node build/init-module.js env=int select=default");
