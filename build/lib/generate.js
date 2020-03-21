/* eslint-disable */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const render = require('consolidate').handlebars.render
const path = require('path')
const logger = require('./logger')

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} answers 命令数据参数对象
 * @param {String} name 文件名称
 * @param {String} src 创建文件目录
 * @param {String} dest 
 * @param {Function} done
 */

module.exports = function generate (answers,name, src, dest, done) {
  const metalsmith = Metalsmith(path.join(src, answers.template.key))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  },answers)
  metalsmith
    // .use(askQuestions(opts.prompts))
    // .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(name, answers))

  metalsmith.clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      logger.log(`To get started: \n     npm run dev`)
    })

  return data
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles (name,answers) {
  return (files, metalsmith, done) => {
    if (answers.template.key === "module") {
      //替换views入口模板为当前模块的名称
      files[`views/${answers.moduleKebabNameUpper}.vue`] = files['views/viewIndexTemplate.vue']
      delete files['views/viewIndexTemplate.vue']
      //替换views第一个页面模板为当前模块的名称
      files[`views/${answers.viewKebabNameUpper}.vue`] = files['views/viewTemplate.vue']
      delete files['views/viewTemplate.vue']
      //替换vuex模板为当前模块的名称
      files[`vuex/${answers.moduleKebabUpper}.js`] = files['vuex/vuexTemplate.js']
      delete files['vuex/vuexTemplate.js']
      //替换router模板为当前模块的名称
      files[`routers/${answers.moduleKebabUpper}.js`] = files['routers/routerTemplate.js']
      delete files['routers/routerTemplate.js']
    } else if (answers.template.key === "view") {
      //替换viewTemplate模板为当前模块的名称
      files[`${answers.viewKebabNameUpper}.vue`] = files['viewTemplate.vue']
      delete files['viewTemplate.vue']
    }
    
    const keys = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString()
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer.from(res)
        next()
      })
    }, done)
  }
}
