const fs = require("fs"); // 文件模块
const chalk = require("chalk");
const logger = require("../lib/logger"); // 自定义工具-用于日志打印
const path = require("path");
// path
const CWD = process.cwd();
const COMPONENT_JSON = path.resolve(CWD, "./build/assets/modules.json");
const { semver, done, info, error } = require("@vue/cli-shared-utils");
const requiredVersion = require("../../package.json").engines.node;
const { getBuildModuleList } = require("../lib/auto-modules"); //获取打包命令

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  );
  process.exit(1);
}

const Service = require("@vue/cli-service/lib/Service");
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

const myService = require("./Service");
const nyservice = new myService(process.env.VUE_CLI_CONTEXT || process.cwd());

const rawArgv = process.argv.slice(2);
const args = require("minimist")(rawArgv, {
  boolean: [
    // build
    "modern",
    "report",
    "report-json",
    "inline-vue",
    "watch",
    // serve
    "open",
    "copy",
    "https",
    // inspect
    "verbose"
  ]
});
const command = args._[0];
// console.log("%c args", "color:#00CD00", args);
// console.log("%c command", "color:#00CD00", command);
// console.log("%c rawArgv", "color:#00CD00", rawArgv);

//异步进行打包
// for (let i = 0; i < getBuildModuleList().length; i++) {
//   process.env.myModules = i;
//   service.run(command, args, rawArgv).catch(err => {
//     error(err);
//     process.exit(1);
//   });
// }

let i = 0;
process.env.myModules = 0;
let errorModules = [];
let successModules = [];
const dealRun = function() {
  i++;
  if (i < getBuildModuleList().length) {
    process.env.myModules = i;
    run();
  } else {
    info(`成功:${successModules.length} 失败:${errorModules.length} 共:${i}`);
    done("打包成功模块：" + chalk.bgGreen.black(successModules));
    errorModules.length > 0 &&
      error(
        "打包失败模块:" +
          chalk.bgRed.black(errorModules) +
          ",请检查日志并重新打相关模块包！"
      );
    process.exit();
  }
};
const run = function() {
  console.log(
    chalk.bgCyan.black(
      " >>>>>>>>>>> 开始打包模块" + getBuildModuleList()[i] + " >>>>>>>>>>>"
    )
  );
  let entryMoName = `src/modules/${getBuildModuleList()[i]}`; // 入口
  // 检查是否存在当前模块
  if (getBuildModuleList()[i] && !fs.existsSync(entryMoName)) {
    error(
      `不存在当前${
        getBuildModuleList()[i]
      }运行模块，请检查打包命令中模块名称是否正确，正确打包命令如下:`
    );
    logger.log("npm run sta -m-demo,home -p-web");
    errorModules.push(getBuildModuleList()[i]);
    dealRun();
  }
  nyservice
    .run(command, args, rawArgv)
    .then(() => {
      successModules.push(getBuildModuleList()[i]);
      dealRun();
    })
    .catch(err => {
      error(err);
      errorModules.push(getBuildModuleList()[i]);
      dealRun();
      // process.exit(1);
    });
};

if (command === "build" || command === "lint") {
  run();
} else if (command === "serve") {
  const json = require(COMPONENT_JSON);
  let startModule = getBuildModuleList()[0] || "";
  let port;
  for (let i = 0; i < json[1].list.length; i++) {
    const mo = json[1].list[i];
    if (mo.name === startModule) {
      port = mo.port;
      break;
    }
  }
  console.log(
    chalk.bgMagenta.black(
      " >>>>>>>>>>>启动模块" + getBuildModuleList()[0] + " >>>>>>>>>>>"
    )
  );
  // info("启动模块" + getBuildModuleList()[0]);
  if (port) {
    args.port = port;
    rawArgv.push("--port");
    rawArgv.push(port);
  }
  service.run(command, args, rawArgv).catch(err => {
    error(err);
    process.exit(1);
  });
}

// exec("v-cli-service build", (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行出错: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
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
