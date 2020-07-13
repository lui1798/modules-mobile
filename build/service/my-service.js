const fs = require("fs"); // 文件模块
const chalk = require("chalk");
const logger = require("../lib/logger"); // 自定义工具-用于日志打印
const path = require("path");
const { exec } = require("child_process");
// path
const CWD = process.cwd();
// const MODULE_PATH = path.resolve(CWD, "./modules");
const COMPONENT_JSON = path.resolve(CWD, "./build/assets/modules.json");
const { semver, done, info, error } = require("@vue/cli-shared-utils");
const requiredVersion = require("../../package.json").engines.node;
const { getBuildModuleList } = require("../lib/auto-modules"); //获取打包命令
const { getNpmParams } = require("../lib/npm-params"); // 获取打包命令参数

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`,
  );
  process.exit(1);
}

// const Service = require("@vue/cli-service/lib/Service");
// const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

const myService = require("./Service");
const myservice = new myService(process.env.VUE_CLI_CONTEXT || process.cwd());

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
    "verbose",
  ],
});
const command = args._[0] || "serve";
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
const dealRun = function(modulels) {
  i++;
  if (i < modulels.length) {
    process.env.myModules = i;
    run();
  } else {
    info(`成功: ${successModules.length}, 失败: ${errorModules.length}, 共: ${i}`);
    done(`打包成功模块：${chalk.bgGreen.black(successModules)}`);
    errorModules.length > 0 &&
      error(`打包失败模块:${chalk.bgRed.black(errorModules)},请检查日志并重新打包相关模块包！`);
    // process.exit();
  }
};
const run = function() {
  let modulels = [];
  if (command === "lint") {
    const json = require(COMPONENT_JSON);
    for (let i = 0; i < json[1].list.length; i++) {
      const mo = json[1].list[i];
      if (mo.name !== "common") modulels.push(mo.name);
    }
  } else if (command === "build") {
    modulels = getBuildModuleList();
  }
  console.log(
    chalk.bgCyan.black(` >>>>>>>>>>> 开始${command === "lint" ? "检查" : "打包"}模块 ${modulels[i]} >>>>>>>>>>>`),
  );
  if (modulels.length === 0) {
    error(`请输入打包模块，正确打包命令如下:`);
    logger.log("npm run sta -m-demo,home -p-web");
  }
  let entryMoName = `modules/${modulels[i]}`; // 模块文件路径
  // 检查是否存在当前模块
  if (modulels[i] && !fs.existsSync(entryMoName)) {
    error(`不存在当前${modulels[i]}运行模块，请检查打包命令中模块名称是否正确，正确打包命令如下:`);
    logger.log("npm run sta -m-demo,home -p-web");
    errorModules.push(modulels[i]);
    dealRun(modulels);
  }
  myservice
    .run(command, args, rawArgv)
    .then(() => {
      successModules.push(modulels[i]);
      dealRun(modulels);
    })
    .catch(err => {
      error(err);
      errorModules.push(modulels[i]);
      dealRun(modulels);
      // process.exit(1);
    });
};

if (command === "build" || command === "lint") {
  run();
} else if (command === "serve") {
  const json = require(COMPONENT_JSON);
  let startModule = getBuildModuleList()[0] || "";
  let entryMoName = `modules/${startModule}`; // 模块文件路径
  // 检查是否存在当前模块
  if (startModule) {
    let isI = json[1].list.findIndex(mo => mo.name === startModule);
    if (isI < 0 || !fs.existsSync(entryMoName)) {
      error(`不存在当前${getBuildModuleList()[i]}运行模块，请检查打包命令中模块名称是否正确，正确打包命令如下:`);
      logger.log("npm run dev -m-myModule");
      logger.log("注意模块名称是以首字母小写的驼峰命名");
      logger.log(
        `如果以上检查都没问题，请检查${COMPONENT_JSON}目录下list[1]节点是否存在当前${startModule}模块名称。注意驼峰命名`,
      );
      process.exit();
    }
  } else {
    error(`模块${getBuildModuleList()[i]}启动失败！！！`);
    logger.warn("请在运行命令后面拼接 -m- 加模块名称");
    process.exit();
  }
  let port;
  if (getNpmParams().buildPort) {
    port = getNpmParams().buildPort;
  } else {
    for (let i = 0; i < json[1].list.length; i++) {
      const mo = json[1].list[i];
      if (mo.name === startModule) {
        port = mo.port;
        break;
      }
    }
  }
  console.log(chalk.bgMagenta.black(" >>>>>>>>>>>启动模块" + getBuildModuleList()[0] + " >>>>>>>>>>>"));
  // 启动开发文档
  if (getNpmParams().buildSite) {
    exec("cd site && npm start", (error, stdout, stderr) => {
      if (error) {
        console.error(`开发文档启动执行出错: ${error}`);
        return;
      }
      logger.success(`stdout: ${stdout}`);
      logger.success(`stderr: ${stderr}`);
    });
  }
  // info("启动模块" + getBuildModuleList()[0]);
  if (port) {
    args.port = port;
    rawArgv.push("--port");
    rawArgv.push(port);
  }
  myservice.run(command, args, rawArgv).catch(err => {
    error(err);
    process.exit(1);
  });
}
