const fs = require('fs')
const path = require('path')
// path
const CWD = process.cwd()
const MODULE_PATH = path.resolve(CWD, '../modules')

const components = require('../build/assets/modules.json')
const siteQz = "site"

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function generateDemos (folderUrl) {
  const demoPath = resolve(`${folderUrl}/site-demo/cases`)

  if (fs.existsSync(demoPath)) {
    const files = fs.readdirSync(demoPath)
    return files.map(file => {
      return `${demoPath}/${file}`
    })
  } else {
    return []
  }
}

function generateSource (lang = 'zh-CN') {
  console.log("开始处理菜单对象>>>>>>>>>>>>>>>>>>>");
  const menus = []
  const moduleLists = components
  moduleLists.forEach(category => {
    const list = category.list
    list && list.forEach((modules,i) => {
      let files = fs.readdirSync(MODULE_PATH+modules.path);
      files = files.filter(item=>item.indexOf('.')<0)
      // console.log("%c files","color:#00CD00",files)
      const subMenus = []
      files.forEach(folder => {
        const folderUrl = `modules${modules.path}/${folder}`
        subMenus.push({
          name: folder,
          text: `${folder} <span>文件</span>`,
          markdown: resolve(`${folderUrl}/README.md`),
          demo: generateDemos(folderUrl)
        })
      });

      menus.push({
        name: modules.path.substr(1),
        text: `${modules.name} <span>${modules.text}</span>`,
        markdown: resolve(`modules${modules.path}/README.md`),
        menu: subMenus
      })
    })
  })

  // console.log("%c menus","color:#00CD00",menus)
  return menus
}

function generateSourceOld (lang = 'zh-CN') {
  console.log("开始处理components>>>>>>>>>>>>>>>>>>>");
  const menus = []
  components.forEach(category => {
    const list = category.list
    const subMenus = []

    list && list.forEach((component,i) => {
      subMenus.push({
        name: component.path.substr(1),
        text: `${component.name} <span>${component.text}</span>`,
        markdown: resolve(`modules${component.path}/README.md`),
        demo: generateDemos(component.path.substr(1))
      })
    })
    menus.push({
      name: category.category,
      text: `${category.name} <span>${category.text}</span>`,
      menu: subMenus
    })
  })

  console.log("%c menus","color:#00CD00",menus)
  return menus
}

module.exports = {
  title: 'app Mobile 2.0',
  subtitle: '光速宝开发使用文档',
  subtitleEnUs: 'A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios',
  logo: 'https://vue-mobile.gitee.io/static/image/al.svg',
  favicon: 'https://vue-mobile.gitee.io/static/image/al.svg',
  source: [{
    name: 'zh-CN',
    text: '中文',
    src: '/zh-CN/',
    menu: [{
      name: 'docs',
      text: '开发文档',
      src: '/zh-CN/docs/introduce',
      menu: [
        {
          name: 'introduce',
          text: 'app mobile',
          markdown: resolve(siteQz+'/docs/introduce.md'),
          // demo: [resolve('site/theme/default/components/GitContributors.vue')]
        },
        {
          name: 'started',
          text: '快速上手',
          markdown: resolve('README.md'),
        },
        {
          name: 'catalog',
          text: '项目目录',
          markdown: resolve(siteQz+'/docs/catalog.md'),
        },
        {
          name: 'command',
          text: '命令以及自动化处理',
          markdown: resolve(siteQz+'/docs/command.md'),
        },
        {
          name: 'vuecommonattr',
          text: 'common内置模块内置全局vue属性、方法',
          markdown: resolve(siteQz+'/docs/vuecommonattr.md'),
        },
        {
          name: 'process',
          text: '内置css',
          markdown: resolve(siteQz+'/docs/process.md'),
        },
        {
          name: 'compatible',
          text: '兼容性开发指南',
          markdown: resolve(siteQz+'/docs/compatible.md'),
        },
        {
          name: 'rules',
          text: '😡开发规范及常见问题指南',
          markdown: resolve(siteQz+'/docs/rules.md'),
        },
        {
          name: 'modules',
          text: 'Modules',
          menu: generateSource()
        },
        {
          name: 'changelog',
          text: '更新日志',
          markdown: resolve('CHANGELOG.md'),
        },
      ],
    },
  ]
  }, 
  // {
  //   name: 'en-US',
  //   text: 'English',
  //   src: '/en-US/',
  //   menu: [{
  //     name: 'docs',
  //     text: 'Components',
  //     src: '/en-US/docs/introduce',
  //     menu: [
  //       // {
  //       //   name: 'introduce',
  //       //   text: 'Al Mobile',
  //       //   markdown: resolve('site/docs/introduce.en-US.md'),
  //       //   // demo: [resolve('site/theme/default/components/GitContributors.vue')]
  //       // },
  //       // {
  //       //   name: 'started',
  //       //   text: 'Quick Start',
  //       //   markdown: resolve('site/docs/started.en-US.md'),
  //       // },
  //       // {
  //       //   name: 'development',
  //       //   text: 'Development Guide',
  //       //   markdown: resolve('site/docs/development.en-US.md'),
  //       // },
  //       // {
  //       //   name: 'changelog',
  //       //   text: 'Change Log',
  //       //   markdown: resolve('CHANGELOG.en-US.md'),
  //       // },
  //       // {
  //       //   name: 'components',
  //       //   text: 'Components',
  //       //   menu: generateSource('en-US')
  //       // },
  //     ],
  //   },
  //   {
  //     name: 'design',
  //     text: 'Design',
  //     src: '/en-US/design/principle/intuition',
  //     menu: [{
  //       name: 'principle',
  //       text: 'Principle',
  //       menu: [{
  //         name: 'intuition',
  //         text: 'Intuitive and simple',
  //         markdown: resolve('site/docs/design/principle/intuition.en-US.md'),
  //       }, {
  //         name: 'security',
  //         text: 'Safe and controllable',
  //         markdown: resolve('site/docs/design/principle/security.en-US.md'),
  //       }, {
  //         name: 'professional',
  //         text: 'Thoughtful and professional',
  //         markdown: resolve('site/docs/design/principle/professional.en-US.md'),
  //       }],
  //     }, {
  //       name: 'vision',
  //       text: 'Vision',
  //       menu: [{
  //         name: 'color',
  //         text: 'Color',
  //         markdown: resolve('site/docs/design/vision/color.en-US.md'),
  //       }, {
  //         name: 'layout',
  //         text: 'Layout',
  //         markdown: resolve('site/docs/design/vision/layout.en-US.md'),
  //       }, {
  //         name: 'font',
  //         text: 'Font',
  //         markdown: resolve('site/docs/design/vision/font.en-US.md'),
  //       }],
  //     }, {
  //       name: 'other',
  //       text: 'Other',
  //       menu: [{
  //         name: 'resource',
  //         text: 'Resource',
  //         markdown: resolve('site/docs/design/other/resource.en-US.md'),
  //       }],
  //     }]
  //   },
  // ]
  // }
],
  components: generateSource(),
  markdownBoundary: {
    '<!-- CUTOFF -->': '<div class="md-blog-cut-off"></div>',
    '<!-- LOGO -->':
      '<img src="//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png" width="200">',
  },
  links: {
    'zh-CN': [
      {
        title: '相关资源',
        link: [
          {
            text: 'Al Mobile',
            src: 'https://github.com/Aliangxu/al-mobile',
          },
        ],
      },
      {
        title: '社区',
        link: [
          {
            text: 'Organization',
            src: 'https://github.com/Aliangxu/al-mobile'
          },
        ],
      },
      {
        title: '帮助',
        link: [
          {
            text: '贡献指南',
            src: 'https://github.com/Aliangxu/al-mobile.git/blob/master/CONTRIBUTING.md',
          },
          {
            text: '问题反馈',
            src: 'https://github.com/Aliangxu/al-mobile.git/issues',
          },
          {
            text: '更新日志',
            src: 'https://github.com/Aliangxu/al-mobile.git/blob/master/CHANGELOG.md',
          },
          {
            text: '常见问题',
            src: 'https://github.com/Aliangxu/al-mobile.git/wiki/FAQ',
          },
          {
            text: '加入我们',
            src: 'https://github.com/Aliangxu/al-mobile.git',
          }
        ]
      },
    ],
    // 'en-US': [
    //   {
    //     title: 'Resources',
    //     link: [
    //       {
    //         text: 'app Mobile',
    //         src: 'https://github.com/Aliangxu/al-mobile',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Community',
    //     link: [
    //       {
    //         text: 'Organization',
    //         src: 'https://github.com/Aliangxu/al-mobile'
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Help',
    //     link: [
    //       {
    //         text: 'Contribute Guide',
    //         src: 'https://github.com/Aliangxu/al-mobile.git/blob/master/CONTRIBUTING.md',
    //       },
    //       {
    //         text: 'Issues',
    //         src: 'https://github.com/Aliangxu/al-mobile.git/issues',
    //       },
    //       {
    //         text: 'Change Log',
    //         src: 'https://github.com/Aliangxu/al-mobile.git/blob/master/CHANGELOG.md',
    //       },
    //       {
    //         text: 'FAQ',
    //         src: 'https://github.com/Aliangxu/al-mobile.git/wiki/FAQ',
    //       },
    //       {
    //         text: 'Join Us',
    //         src: 'https://github.com/Aliangxu/al-mobile.git',
    //       }
    //     ]
    //   },
    // ]
  },
  copyRight: '2012-2019 AL',
  routePrefix: '/app-mobile',
}
