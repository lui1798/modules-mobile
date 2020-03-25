/* eslint-disable */
const prompt = require('inquirer').createPromptModule()
const shellJs = require('shelljs')
const path = require('path')
const bluebird = require('bluebird')
const ora = require('ora')
const moment = require('moment')
const userName = require('git-user-name')
const userEmail = require('git-user-email')
const exists = require('fs').existsSync //node自带的fs模块下的existsSync方法，用于检测路径是否存在。（会阻塞）
const fs = bluebird.promisifyAll(require('fs'))

const logger = require('./lib/logger') //自定义工具-用于日志打印
const npmParams = require('./lib/npm-params') //获取打包命令

// path
const CWD = process.cwd()
const MODULE_PATH = path.resolve(CWD, './modules/common/routers')

/**
 * 创建页面view
 * @param {*} answers 
 */
function initRouterIndex(answers) {
  return Promise.resolve(answers)
    .then(syncRouter)
    .catch(err => {
      logger.fatal(`error.`, err)
    })
}

function syncRouter(answers) {
  const RouterIndexjs = path.resolve(CWD, `./modules/common/routers/index.js`)
  return Promise.all([
    syncToplatform(answers, path.resolve(CWD, `./modules/common/main.js`)), //#### 1、修改syncToplatform
    syncToFile(answers, RouterIndexjs, true), //#### 2、同步router-children
    logger.success("模块初始化完成!!!")
  ]).then(() => answers)
}

/**
 * answers.platform
 * @param {*} answers 
 */
function syncToplatform(answers, filePath, is) {
  fs.readFileAsync(filePath, 'utf8')
    .then(str => {
      return changePlatform(answers, str)
    })
    .then(str => fs.writeFileAsync(filePath, str, 'utf8'))
    .then(() => answers)
}

/**
 * 同步
 * @param {*} answers 
 */
function syncToFile(answers, filePath, is) {
  fs.readFileAsync(filePath, 'utf8')
    .then(str => {
      return compileInitNewRouter(answers, str)
    })
    .then(str => fs.writeFileAsync(filePath, str, 'utf8'))
    .then(() => answers)
}

function changePlatform(answers, fileStr, matchls) {
  let val = ""
  let web = "web"
  val = String.prototype.replace.call(fileStr, /\/\/.*@a_init<#([\s\S]*)\/\/.*@a_end#>.*/g, function (match, p1) {
    match = ""
    match += `  platform: "${answers.platform||web}",// web、native、wechat、phoneWeb\r`
    return `// @a_init<#\r${match}` + ' /* @init<%    "./${platform}",%> */\r // @a_end#>'
  })
  return val
}

function firstNameSort(arr) {
  arr.sort(function(a, b) {
    return (a + '').localeCompare(b + '')
  })
}

function compileInitNewRouter(answers, fileStr, matchls) {
  //首先按字母进行模块字段排序
  answers.module&&firstNameSort(answers.module);
  let val = ""
  val = String.prototype.replace.call(fileStr, /\/\/.*@a_init<#([\s\S]*)\/\/.*@a_end#>.*/g, function (match, p1) {
    match = ""
    for (let i = 0; i < answers.module.length; i++) {
      const module = answers.module[i];
      match += `    "./${module}",\r`
    }
    return `// @a_init<#\r${match}` + '/* @init<%    "./${moduleKebabUpper}",%> */\r// @a_end#>'
  })
  val = String.prototype.replace.call(val, /\/\/.*@b_init<#([\s\S]*)\/\/.*@b_end#>.*/g, function (match, p1) {
    match = ""
    for (let i = 0; i < answers.module.length; i++) {
      const module = answers.module[i];
      match += `      ${module},\r`
    }
    return `// @b_init<#\r${match}` + '/* @init<%      ${moduleKebabUpper},%> */\r// @b_end#>'
  })
  val = String.prototype.replace.call(val, /\/\/.*@c_init<#([\s\S]*)\/\/.*@c_end#>.*/g, function (match, p1) {
    match = ""
    for (let i = 0; i < answers.module.length; i++) {
      const module = answers.module[i];
      match += `        ...${module}.default,\r`
    }
    return `// @c_init<#\r${match}` + '/* @init<%        ...${moduleKebabUpper}.default,%> */\r// @c_end#>'
  })
  return val
}


function getEnvModuleList(files) {
  let reval = ""
  String.prototype.replace.call(files, /.*VUE_APP_MODULE_moduleListDefaul = (.*).*/g, function (match, p1) {
    logger.success("环境配置文件中模块>>>>",p1)
    reval = JSON.parse(p1)
  })
  // console.log(reval)
  return reval
}


/**
 * 初始化
 * @param {*} answers 
 */
function init(answers) {
  // shellJs.exec("npm run build")
  initRouterIndex(answers)
}

/**
 * 扩展数组方法
 */
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/**
 * 获取views下的所有模块名称
 */
function getModuleList([choices, param, buildParams]) {
  // console.log("=================param")
  // console.log(param)
  if (!param.select || param.select && param.select === "no") { //为no不开启模块选择，默认打包所有模块
    let answers = {}
    answers.module = choices
    return Promise.resolve(answers)
  } else if (!param.select || param.select && param.select === "default") { //为no不开启模块选择，默认打包所有模块
    let answers = {}
    return fs.readdirAsync(MODULE_PATH)
      .then(files => {
        let allFiels = files.map((v) => v.replace(".js", ""))
        allFiels.remove("index")
        allFiels.remove("routerTemplate")
        answers.module = allFiels
        return Promise.resolve(answers)
      })
  } else {
    return fs.readdirAsync(MODULE_PATH)
      .then(files => {
        let promptparamType = []
        let modulels = {
          type: 'checkbox',
          choices: [],
          name: 'module',
          message: 'Which module do you want to run?',
          required: true,
        }
        let platformls = {
          type: 'list',
          choices: [
            "native",
            "web",
            "phoneWeb",
          ],
          name: 'platform',
          message: 'Which platform do you want to run?',
          required: true,
        }
        let allFiels = files.map((v) => v.replace(".js", ""))
        allFiels.remove("index")
        allFiels.remove("routerTemplate")
        if (buildParams&&buildParams.buildModule) {
          for (let index = 0; index < buildParams.buildModule.length; index++) {
            const bm = buildParams.buildModule[index];
            if (allFiels.indexOf(bm)<0) {
              return Promise.reject(`不存在名为< ${bm} >的模块！请仔细核对后重新创建.`)
            }
          }
        }
        if (buildParams.buildModule&&buildParams.buildPlatform) {//参数中两个模块参数跟platform参数都存在
          let answers = {}
          answers.module = buildParams.buildModule
          answers.platform = buildParams.buildPlatform
          logger.success("answers1>>>>>>>>",answers)
          return Promise.resolve(answers)
        } else if (buildParams.buildModule&&!buildParams.buildPlatform) {//参数中只存在模块参数
          promptparamType.push(platformls)
          return prompt(promptparamType).then((answers) => {
            answers.module = buildParams.buildModule
            logger.success("answers2>>>>>>>>",answers)
            return Promise.resolve(answers)
          })
        } else if (!buildParams.buildModule&&buildParams.buildPlatform) {//参数中只存在platform
          promptparamType.push(modulels)
          promptparamType[0].choices = allFiels
          promptparamType[0].default = allFiels
          return prompt(promptparamType).then((answers) => {
            answers.platform = buildParams.buildPlatform
            logger.success("answers2>>>>>>>>",answers)
            return Promise.resolve(answers)
          })
        } else {
          promptparamType.push(modulels,platformls)
          promptparamType[0].choices = allFiels
          promptparamType[0].default = allFiels
          return prompt(promptparamType).then((answers) => {//两个都不存在
            logger.success("answers3>>>>>>>>",answers)
            return Promise.resolve(answers)
          })
        }
      })
  }
}

function getEnv(param, buildParams) {
  return fs.readFileAsync(path.resolve(CWD, `./.env.${param.env}`), 'utf8')
    .then(files => {
      let choices = getEnvModuleList(files)
      return Promise.resolve([choices, param, buildParams])
    })
}

function launch() {
  let buildParams = npmParams.getNpmParams();
  logger.success("打包模块>>>>>>>>>>>>>>>", buildParams.buildModule);
  logger.success("打包platform>>>>>>>>>>>", buildParams.buildPlatform);
  let param = {}
  process.argv.forEach(v => {
    if (v.indexOf("=") > -1) {
      const vv = v.split("=")
      param[vv[0]] = vv[1]
    }
  });
  return getEnv(param, buildParams)
    .then(getModuleList)
    // .then(prompt)
    .then(init)
    .catch(err => {
      logger.fatal(`错误!`, err)
    })
}

launch()
