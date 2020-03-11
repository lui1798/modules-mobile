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
    .use(renderTemplateFiles(name))

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

function renderTemplateFiles (name) {
  return (files, metalsmith, done) => {
    //替换index.vue模板为当前模块的名称
    files[`${name}.vue`] = files['index.vue']
    delete files['index.vue']
    
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
