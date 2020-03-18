// 回调函数版
const { exec } = require("child_process");
const logger = require("../lib/logger"); // 自定义工具-用于日志打印

process.env.myModules = 1;
exec(
  "node build/service/my-service.js build --mode int",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    logger.success(`stdout: ${stdout}`);
    logger.success(`stderr: ${stderr}`);
  }
);
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
