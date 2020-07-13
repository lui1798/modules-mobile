// const logger = require("./logger"); //自定义工具-用于日志打印

//处理参数 eg: npm run sta -m-demo -p-web
exports.getNpmParams = function() {
  let params = {
    buildModule: "",
    buildPlatform: "",
    buildSite: false,
    buildPort: "",
  };
  if (process.env.npm_config_argv) {
    let npmParams = JSON.parse(process.env.npm_config_argv).original;
    //处理参数中的模块\打包platform
    //eg. [ 'run', 'sta', '-m-n22module1,n22module2', '-p-native' ]
    // console.log("%c npmParams", "color:#00CD00", npmParams);
    npmParams.forEach(bm => {
      if (bm.startsWith("-m-")) {
        params.buildModule = bm.replace("-m-", "").split(",");
      } else if (bm.startsWith("-p-")) {
        params.buildPlatform = bm.replace("-p-", "");
      } else if (bm === "--site") {
        params.buildSite = true;
      } else if (bm === "--g") {
        params.buildGDist = true;
      } else if (bm.startsWith("-port-")) {
        params.buildPort = bm.replace("-port-", "");
      }
    });
  }
  return params;
};
