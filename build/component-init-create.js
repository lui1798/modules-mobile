/* eslint-disable */
const program = require('commander') //命令行处理工具
const prompt = require('inquirer').createPromptModule()
const shellJs = require('shelljs')
const path = require('path')
const bluebird = require('bluebird')
const ora = require('ora')
const moment = require('moment')
const userName = require('git-user-name')
const userEmail = require('git-user-email')
const exists = require('fs').existsSync  //node自带的fs模块下的existsSync方法，用于检测路径是否存在。（会阻塞）
const fs = bluebird.promisifyAll(require('fs'))

const generate = require('./lib/generate')  //自定义工具-用于基于模板构建项目
const logger = require('./lib/logger') //自定义工具-用于日志打印

// path
const CWD = process.cwd()
const templatePath = path.resolve(CWD, './build/assets/module-template')
const templatePathChildren = path.resolve(CWD, './build/assets/module-template-children')
const MODULE_PATH = path.resolve(CWD, './src/modules')
const MODULE_ENV_LOCAL = path.resolve(CWD, './.env.local')
const MODULE_ENV_INT = path.resolve(CWD, './.env.int')
const MODULE_ENV_UAT = path.resolve(CWD, './.env.uat')
const MODULE_ENV_STA = path.resolve(CWD, './.env.sta')
const MODULE_ENV_PROD = path.resolve(CWD, './.env.prod')
const MODULE_ROUTER = path.resolve(CWD, './src/routers/index.js')
const MODULE_ROUTER_TEMPLATE = path.resolve(CWD, './src/routers/routerTemplate.js')


const EXPECT_SHELL = path.resolve(CWD, './build/template.sh')
const DEMO_INDEX_PATH = path.resolve(CWD, './examples/demo-index.js')
const TYPES = path.resolve(CWD, './types/index.d.ts')
const COMPONENT_INDEX = path.resolve(CWD, './components/index.js')
const COMPONENT_JSON = path.resolve(CWD, './build/assets/modules.json')

//创建模式
const createType = [
  {
    key: "module",
    desc: "创建模块"
  },
  {
    key: "view",
    desc: "创建页面"
  },
  {
    key: "vuex",
    desc: "创建vuex"
  },
  {
    key: "component",
    desc: "基础组件"
  }
]
exports.initCreateTest = function(answersFirst,answers) {
  getModuleList(answersFirst).then((answersFirst)=>{
    if (answersFirst.template==="module") {
      answers = dealModuleAnswers(answersFirst,answers);
      initModule(answers);
    } else if (answersFirst.template==="view") {
      answers = dealViewAnswers(answersFirst,answers);
      initView(answers);
    } else if (answersFirst.template==="vuex") {
      answers = dealVuexAnswers(answersFirst,answers);
      initVuex(answers);
    }
  })
}
/**
 * 创建模块module
 * @param {*} answers 
 */
function initModule (answers) {
  return Promise.resolve(answers)
    .then(checkNoRepeat)
    .then(create)
    .then(sync)
    .catch(err => {
      logger.fatal(`${answers.moduleKebabUpper}  create error.`, err)
    })
}
/**
 * 创建页面view
 * @param {*} answers 
 */
function initView (answers) {
  return Promise.resolve(answers)
    .then(checkNoRepeatView)
    .then(create)
    .then(syncRouter)
    .catch(err => {
      logger.fatal(`${answers[`${answers.template.key}KebabUpper`]} create error.`, err)
    })
}
/**
 * 创建页面vuex
 * @param {*} answers 
 */
function initVuex (answers) {
  return Promise.resolve(answers)
    .then(checkNoRepeatVuex)
    .then(syncVuex)
    .catch(err => {
      logger.fatal(`${answers[`${answers.template.key}KebabUpper`]} create error.`, err)
    })
}

/**
 * 创建基础组件component
 * @param {*} answers 
 */
function initComponent (answers) {
  // [# 待补充]
}

/**
 * 检查是否存在已有的模块
 * @param {*} answers 模块参数对象
 */
function checkNoRepeat(answers) {
  // return fs.readdirAsync(MODULE_PATH)
  //   .then(files => {
      return Promise.all(answers.files.map(file => checkFile(MODULE_PATH, file, answers))).then(() => answers)
    // })
}
/**
 * 检查是否存在已有的页面
 * @param {*} answers 模块参数对象
 */
function checkNoRepeatView(answers) {
  return fs.readdirAsync(answers.VIEW_PATH)
    .then(files => {
      return Promise.all(files.map(file => checkFile(answers.VIEW_PATH, file, answers))).then(() => answers)
    })
}
/**
 * 检查是否存在已有的vuex-state
 * @param {*} answers 模块参数对象
 */
function checkNoRepeatVuex(answers) {
  return fs.readFileAsync(answers.VUEX_PATH, 'utf8')
    .then(str => {
      if(str.indexOf(answers.vuexStateKebabUpper)>-1||str.indexOf(answers.vuexType)>-1){
        return Promise.reject(answers.moduleName + `模块中已经存在名为${answers.vuexStateKebabUpper}的vuex-state！请仔细核对后重新创建.`) 
      }
    })
    .then(() => answers)
}
/**
 * 检查是否存在已有的模块方法
 * @param {*} dir 文件夹
 * @param {*} file 文件
 * @param {*} answers 模块参数对象
 */
function checkFile(dir, file, answers) {
  const filePath = answers.template.key==="view"?dir:path.resolve(dir, `./${file}`)
  const _name = answers.template.key==="view"?`${answers.template.key}KebabNameUpper`:`${answers.template.key}KebabUpper`
  return fs.statAsync(filePath)
    .then(stat => {
      if (stat.isDirectory()) {
        if (answers[_name] === (answers.template.key==="view"?file.replace(".vue",""):file)) {
          return Promise.reject(answers.template.desc+`中已经存在名为${answers[_name]}！请仔细核对后重新创建.`)
        }
      }
      return
    })
}

function sync(answers) {
  const newRouterjs = path.resolve(CWD, `./src/routers/${answers.moduleKebabUpper}.js`)
  return Promise.all([
    // syncToFile(answers,MODULE_ENV_LOCAL,1),//#### 2、配置环境变量，修改环境变量文件（新增新模块的配置）
    // syncToFile(answers,MODULE_ENV_INT,1),
    // syncToFile(answers,MODULE_ENV_UAT,1),
    // syncToFile(answers,MODULE_ENV_STA,1),
    // syncToFile(answers,MODULE_ENV_PROD,1),
    // addToFile(answers,MODULE_ROUTER_TEMPLATE,newRouterjs),//#### 3、新增新路由js文件
    // syncToFile(answers,MODULE_ROUTER,2),//#### 4、路由router index.js新增新模块配置
    syncToComponentJson(answers),// 创建模块记录json
  ]).then(() =>answers)
}
function syncRouter(answers) {
  const newRouterjs = path.resolve(CWD, `./src/routers/${answers.moduleName}.js`)
  return Promise.all([
    answers.isCreateRouter=='true'&&syncToFile(answers,newRouterjs,3),//#### 3、同步router-children
  ]).then(() =>answers)
}
function syncVuex(answers) {
  const newRouterjs = path.resolve(CWD, `./src/modules/${answers.moduleName}/vuex/${answers.moduleName}.js`)
  return Promise.all([
    syncVuexToFile(answers,newRouterjs,2),// 替换vuex js
  ]).then(() =>answers)
}

/**
 * 同步
 * @param {*} answers 
 */
function syncToFile(answers,filePath,is) {
  fs.readFileAsync(filePath, 'utf8')
    .then(str => {
      if(is===1){
        return compileEnv(answers, str)
      }else if(is===2){
        return compile(answers, str)
      }else if(is===3){
        return compilerouter(answers, str)
      }
    })
    .then(str => fs.writeFileAsync(filePath, str, 'utf8'))
    .then(() => answers)
}
/**
 * 同步vuex
 * @param {*} answers 
 */
function syncVuexToFile(answers,filePath) {
  fs.readFileAsync(filePath, 'utf8')
    .then(str => {
      return compileVuex(answers, str)
    })
    .then(str => fs.writeFileAsync(filePath, str, 'utf8'))
    .then(() => answers)
}
/**
 * 新增
 * @param {*} answers 
 */
function addToFile(answers,filePath,weiteFilePath) {
  let matchls = ""
  fs.readFileAsync(filePath, 'utf8')
    .then(str => {
      return compileInitNewRouter(answers, str, matchls)
    })
    .then(str => fs.writeFileAsync(weiteFilePath, str, 'utf8'))
    .then(() => answers)
}

function compile(metaData, fileStr) {
  return String.prototype.replace.call(fileStr, /\/\*.*@init<%(.*)%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
}
function compileVuex(metaData, fileStr) {
  let val = String.prototype.replace.call(fileStr, /\/\*.*@init<%(.*)%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
  val = String.prototype.replace.call(val, /\/\*.*@moreLine<%([\s\S]*)moreLine%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
  return val
}

function compileEnv(metaData, fileStr) {
  return String.prototype.replace.call(fileStr, /.*VUE_APP_MODULE_moduleListDefaul = (.*).*/g, function (match, p1) {
    reval = JSON.parse(p1)
    reval.push(metaData.moduleKebabUpper)
    return "VUE_APP_MODULE_moduleListDefaul = "+JSON.stringify(reval)
  })
}

function compileInitNewRouter(metaData, fileStr,matchls) {
  let val = ""
  val = String.prototype.replace.call(fileStr, /\$desc{(\w*)}/g, function (match, p1) {
    return metaData[p1]
  })
  val = String.prototype.replace.call(val, /\/\*.*@init<#([\s\S]*)#>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\#{(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    }))
  })
  val = String.prototype.replace.call(val, /(.*)@import%>.*/g, function (match, p1) {
    return p1+"%> */"
  })
  val = String.prototype.replace.call(val, /(.*)@children%>.*/g, function (match, p1) {
    return "            },children%> */"
  })
  return val
}
function compilerouter(metaData, fileStr,matchls) {
  let val = ""
  val = String.prototype.replace.call(fileStr, /\$firstChildren{(\w*)}/g, function (match, p1) {
    return metaData[p1]
  })
  val = String.prototype.replace.call(val, /\/\*.*@init<%(.*)%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
  val = String.prototype.replace.call(val, /\/\*.*@children<%([\s\S]*)children%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })

  return val
}


/**
 * 拉取模板进行创建生成
 * @param {*} answers 
 */
function create(answers) {
  if (exists(templatePath)) {
    generate(answers,answers[`${answers.template.key}KebabNameUpper`], templatePath, answers.dest, err => {
      if (err) logger.fatal(err)
      logger.success(answers.template.desc+'创建成功 "%s".', answers[`${answers.template.key}CnName`])
      answers.template.key==="module"
    })
  } else {
    logger.fatal('Local template "%s" not found.', "createError")
  }
  // exec('expect', [EXPECT_SHELL, answers.moduleCnName, answers.moduleKebabNameUpper, answers.componentType, answers.moduleDesc, answers.author, answers.time, MODULE_PATH])
  return answers
}

/**
 * 记录模块json
 */
function syncToComponentJson(answers) {
  const json = require(COMPONENT_JSON)
  console.log("%c json","color:#00CD00",json)
  let index = json.findIndex(item => item.category === answers.componentType)
  if (index === -1) {
    index = json.length
    json.push({
      category: answers.componentType,
      list: [],
    })
  }
  let l = json[index].list.length;
  let nextPort = "8180";
  if(json[index].list[l-1]&&json[index].list[l-1].port){
    nextPort = Number(json[index].list[l-1].port)+1;
  }
  json[index].list.push({
    name: answers.moduleKebabUpper,
    path: `/${answers.moduleKebabUpper}`,
    text: answers.moduleCnName,
    desc: answers.moduleDesc,
    port: nextPort+"",
  })
  Array.prototype.forEach.call(json, element => {
    Array.prototype.sort.call(element.list, function(a, b) {
      return a.name > b.name ? 1 : -1
    })
  })
  Array.prototype.sort.call(json, (a, b) => {
    return a.category > b.category ? 1: -1
  })
  return fs.writeFileAsync(COMPONENT_JSON, JSON.stringify(json), 'utf8')
            .then(answers => answers)
}

/**
 * 字符串首字母转大写
 * @param {*} str 
 */
function upperFirst(str) {
  return String.prototype.replace.call(str, /^\w/, function (match) {
    return String.prototype.toUpperCase.call(match)
  })
}
/**
 * 字符串**-a**中的字母转大写，去掉-
 * @param {*} str 
 */
function changeKebabToCamel(str) {
  return String.prototype.replace.call(str, /\-(\w)/g, function(match, p1) {
    return String.prototype.toUpperCase.call(p1)
  })
}
/**
 * 字符串**-**中的字母转‘_’
 * @param {*} str 
 */
function changeKebabToDown(str) {
  return String.prototype.replace.call(str, /\-(\w)/g, function(match, p1) {
    return `_${p1}`
  })
}
/**
 * // 驼峰转换‘-’
 * @param {*} str 
 */
function changeKebabToLine(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function changeKebabToNull(str) {
  return String.prototype.replace.call(str, /\-(\w)/g, function(match, p1) {
    return p1
  })
}
/**
 * 获取git用户信息
 */
function getUserInfo() {
  let user = userName()
  if (!user) {
    user = 'anonymous'
  }
  const email = userEmail()
  if (email) {
    user += ` <${email}>`
  }
  return user
}

function dealModuleAnswers(answersFirst,answers) {
  answers = Object.assign(answers, {
    template: createType.filter((v)=> v.key===answersFirst.template)[0],//创建type
    files: answersFirst.files,//view下的模块数组
    moduleNameVal: changeKebabToLine(answers.moduleName), //模块驼峰转‘-’
    moduleKebabUpper: changeKebabToCamel(answers.moduleName),//首字母小写的驼峰 myExample
    moduleKebabNameUpper: upperFirst(changeKebabToCamel(answers.moduleName)),//首字母大写的驼峰 MyExample
    moduleKebabToDown: changeKebabToDown(answers.moduleName),//小写 -转_ my_example
    moduleKebabToNull: String.prototype.toUpperCase.call(changeKebabToNull(answers.moduleName)),//小写 -转 myexample
    viewKebabUpper: changeKebabToCamel(answers.viewName),//页面-首字母小写的驼峰 myExample
    viewKebabNameUpper: upperFirst(changeKebabToCamel(answers.viewName)),//页面-首字母大写的驼峰 MyExample
    viewKebabToDown: changeKebabToDown(answers.viewName),//页面-小写 -转_ my_example
    routerName: changeKebabToCamel(answers.moduleName) + upperFirst(changeKebabToCamel(answers.viewName)), //子路由name
    webpackChunkName: '/* webpackChunkName: "'+changeKebabToCamel(answers.moduleName)+'" */',//import引入的webpackChunkName
    dest: `${MODULE_PATH}/${changeKebabToCamel(answers.moduleName)}`,
  })
  return answers;
}
function dealViewAnswers(answersFirst,answers) {
  answers = Object.assign(answers, {
    template: createType.filter((v)=> v.key===answersFirst.template)[0],//创建type
    moduleNameVal: changeKebabToLine(answers.moduleName), //模块驼峰转‘-’
    viewKebabUpper: changeKebabToCamel(answers.viewName),//首字母小写的驼峰 myExample
    viewKebabNameUpper: upperFirst(changeKebabToCamel(answers.viewName)),//首字母大写的驼峰 MyExample
    viewKebabToDown: changeKebabToDown(answers.viewName),//小写 -转_ my_example
    moduleKebabUpper: changeKebabToCamel(answers.moduleName),//首字母小写的驼峰 myExample
    webpackChunkName: '/* webpackChunkName: "'+changeKebabToCamel(answers.moduleName)+changeKebabToCamel(answers.viewName)+'" */',//import引入的webpackChunkName
    routerName: changeKebabToCamel(answers.moduleName) + upperFirst(changeKebabToCamel(answers.viewName)), //子路由name
    VIEW_PATH: path.resolve(CWD, `./src/modules/${answers.moduleName}`),//需要创建的页面所对应的path
    dest:  path.resolve(CWD, `./src/modules/${answers.moduleName}`),
  })
  return answers;
}
function dealVuexAnswers(answersFirst,answers) {
  answers = Object.assign(answers, {
    template: createType.filter((v)=> v.key===answersFirst.template)[0],// 创建type
    vuexStateKebabUpper: changeKebabToCamel(answers.vuexState),// 首字母小写的驼峰 myExample
    vuexType: String.prototype.toUpperCase.call(changeKebabToNull(answers.vuexState)),// 小写 -转 MYEXAMPLE
    VUEX_PATH: path.resolve(CWD, `./src/modules/${answers.moduleName}/vuex/${answers.moduleName}.js`),//需要创建的页面所对应的path
  })
  console.log("%c dealVuexAnswers","color:#00CD00",answers)
  return answers;
}

/**
 * 初始化创建模块、页面、组件...
 */
function init(answersFirst) {
  if(answersFirst.template==="module"){
    let promptparam = [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入要创建的模块名称(eg: my-example):',
        required: true,
        default: "aaa",
        validate: function (str) {
          return /^[a-z][a-z|-]*[a-z]$/.test(str)
        }
      },
      {
        type: 'input',
        name: 'moduleCnName',
        message: '请输入要创建的模块中文名称(中文):',
        required: true,
        default: "aaa",
      }, 
      {
        type: 'input',
        name: 'viewName',
        message: '请输入要创建的该模块的第一个页面名称(eg: my-view):',
        required: true,
        default: "aaa",
        validate: function (str) {
          return /^[a-z][a-z|-]*[a-z]$/.test(str)
        }
      },
      {
        type: 'input',
        name: 'viewCnName',
        message: '请输入要创建的页面中文名称(中文):',
        required: true,
      },
      {
        type: 'list',
        choices: [
          "basic",
          "business",
        ],
        name: 'componentType',
        message: '模块类型',
        default: "business",
      },
      {
        type: 'input',
        name: 'moduleDesc',
        message: '模块描述',
        required: true,
        default: "aaa",
      },
      {
        type: 'input',
        name: 'author',
        message: '作者',
        default: getUserInfo(),
      },
      {
        type: 'input',
        name: 'time',
        message: 'time',
        default: moment().format('YYYY年MM月DD日')
      }
    ]
    return prompt(promptparam)
      .then(answers => {
        answers = dealModuleAnswers(answersFirst,answers);
        return initModule(answers)
      })
  }else if(answersFirst.template==="view"){
    let promptparam = [
      {
        type: 'list',
        name: 'moduleName',
        choices: answersFirst.files,
        message: '请选择您要创建哪个模块的页面:',
        required: true,
      },
      {
        type: 'input',
        name: 'viewName',
        message: '请输入要创建的页面名称(eg: my-example1):',
        required: true,
        default: "aaa",
        validate: function (str) {
          return /^[a-z][a-z|-]*[a-z]$/.test(str)
        }
      },
      {
        type: 'input',
        name: 'viewCnName',
        message: '请输入要创建的页面中文名称(中文):',
        required: true,
      },
      {
        type: 'list',
        choices: [
          'true',
          'false',
        ],
        name: 'isCreateRouter',
        message: '是否将页面更新进入路由表，默认更新进路由表。',
        default: 'true',
      },
    ]
    return prompt(promptparam)
      .then(answers => {
        answers = dealViewAnswers(answersFirst,answers);
        return initView(answers)
      })
  }else if(answersFirst.template==="vuex"){
    let promptparam = [
      {
        type: 'list',
        name: 'moduleName',
        choices: answersFirst.files,
        message: '请选择您要创建哪个模块的vuex:',
        required: true,
      },
      {
        type: 'input',
        name: 'vuexState',
        message: '请输入要创建的vuex-state名称(eg: my-example):',
        required: true,
        validate: function (str) {
          return /^[a-z][a-z|-]*[a-z]$/.test(str)
        }
      },
      {
        type: 'input',
        name: 'vuexDesc',
        message: '请输入要创建vuex的注释描述:',
        required: true,
      },
      {
        type: 'input',
        name: 'vuexStateDefault',
        message: '请输入要创建vuex-state的默认值:',
        default: "",
        required: true,
      },
    ]
    return prompt(promptparam)
      .then(answers => {
        answers = dealVuexAnswers(answersFirst,answers);
        return initVuex(answers)
      })
  }
}

/**
 * 获取views下的所有模块名称
 */
function getModuleList(answers) {
  return fs.readdirAsync(MODULE_PATH)
    .then(files => {
      answers.files = files
      return Promise.resolve(answers)
    })
}

/**
 * 获取需要创建的模式
 */
function launch() {
  let promptparamType = [
    {
      type: 'list',
      choices: createType.map((v)=> v.key),
      name: 'template',
      message: 'what do you want to create',
      required: true,
    },
  ]
  return prompt(promptparamType)
    .then(getModuleList)
    .then(init)
}

// launch()