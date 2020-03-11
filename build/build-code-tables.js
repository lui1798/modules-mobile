const path = require('path')
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))
const prompt = require('inquirer').createPromptModule()
const {
  resultLog
} = require('./utils')

const CWD = process.cwd()
const CODETABLES_PATH = path.resolve(CWD, './build/assets/codetables')

const XLSX = require('xlsx')

// function getFile(filename) {
//   const fileDir = path.resolve(allFileDir, filename)
//   const fileContent = fs.readFileSync(fileDir, {
//     encoding: 'utf8'
//   })
//   return fileContent
// }

function importExcel(filename, allFileDir) {
  resultLog('nomal', '开始创建json码表:' + filename)
  /**
   * FileReader共有4种读取方法：
    1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
    2.readAsBinaryString(file)：将文件读取为二进制字符串
    3.readAsDataURL(file)：将文件读取为Data URL
    4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为‘UTF-8‘
   */
  var wb //读取完成的数据
  var aa = []
  //导入
  if (!filename) {
    return
  }
  const fileDir = path.resolve(allFileDir, filename)
  wb = XLSX.readFile(fileDir, {
    //手动转化
    type: "base64"
  })
  //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
  //wb.Sheets[Sheet名]获取第一个Sheet的数据
  aa = JSON.stringify(
    XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
  )
  var u = eval("(" + aa + ")")
  // console.log(wb.Sheets[wb.SheetNames[0]])
  // console.log(u)
  return u
}

function createFile(files, allFileDir, outputLibDir) {
  try {
    files.forEach(file => {
      // const content = getFile(file.replace("json","xls"))
      const data = importExcel(file, allFileDir)
      if (!fs.existsSync(outputLibDir)) {
        fs.mkdirSync(outputLibDir)
      }
      // const fileLibDir = path.resolve(outputLibDir, file.replace("xls", "js"))
      // fs.createWriteStream(fileLibDir).write('export const insuredBankType = '+JSON.stringify(data))
      const fileLibDir = path.resolve(outputLibDir, file.replace("xls", "json"))
      fs.createWriteStream(fileLibDir).write(JSON.stringify(data))
    })

    resultLog('success', 'Build **json** Complete!')
  } catch (error) {
    console.info(error)
    resultLog('error', 'Build **json** Fail!')
  }
}

function getFileLsit(answers) {
  const allFileDir = path.resolve(__dirname, './assets/codetables/' + answers.module + '/excel')
  const outputLibDir = path.resolve(__dirname, '../src/data/codedata/' + answers.module + '/json')
  let pathName = path.resolve(allFileDir, "");
  fs.readdir(pathName, function (err, files) {
    var dirs = [];
    (function iterator(i) {
      if (i == files.length) {
        console.log(dirs);
        createFile(dirs, allFileDir, outputLibDir)
        return
      }
      console.log(pathName)
      fs.stat(path.join(pathName, files[i]), function (err, data) {
        if (data.isFile()) {
          dirs.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });
}


/**
 * 获取codetables下的所有模块名称
 */
function getModuleList(answers) {
  return fs.readdirAsync(CODETABLES_PATH)
    .then(files => {
      let promptparamType = [{
        type: 'list',
        choices: files.splice(0, files.length-1),
        name: 'module',
        message: 'Which module do you want to run?',
        required: true,
      }, ]
      return Promise.resolve(promptparamType)
    })
}

// getFileLsit(path.resolve(allFileDir, ""))

function lauch() {
  return getModuleList()
    .then(prompt)
    .then(getFileLsit)
}

lauch()
