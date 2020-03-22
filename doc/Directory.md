# 项目目录结构
+ .vscode--有关ide的配置（此处为vscode）
+ public--本地项目的主入口（后期静态资源static最好放在此处）
+ src
  - assets--本地项目级别的静态资源
  - components--本地项目级别的组件库（全局模块公用的可以放在此处）
  - handlers--全局模块公共处理函数（主要存放native插件掉用等等。。。）
  - modules
    - common
      - assets--本地项目级别的静态资源
      - components--本地项目级别的组件库（注意新建的组件要注入到index.js中--目前本地组件库为全局引入，因此注意开发的组件要尽量全局使用的封装）
      - config--本地项目系统级配置
         * axiosHttp--请求总入口
      -data--预制话的静态数据
      - translation.js--国际化的字段值（ 页面直接使用如下 )
      ```
      {{ $t('edit.backBtn') }}
      ```
      - routers--路由管理器
      - service--服务管理器
      - utils--全局window工具类（详细各种方法见utils/index.js）
        * 调用eg：判断对象是否为空对象---utils.utilsPlugin.isEmptyObject(Object)
      - views--页面组件管理器
      - vuex--状态管理器
      - App--入口
      - main.js--配置
    - 其他模块
+ env
  - .env.[env]各个环境的配置参数
+ tests--测试管理器
+ .browserslistrc--控制兼容性版本

# 模块目录结构
- src/modules/模块名/下新增homeTest文件夹--模板如下
```
├── modules          模块代码
    ├── homeTest       组件目录
      ├── assets         模块静态文件（图片、样式）
          ├── images       图片
          ├── css          样式
      ├── components     模块业务组件
      ├── html      
          ├── index.html   模块页面模版
      ├── routers        模块路由目录
          ├── index.js     模块路由主入口
          ├── {module}.js  模块路由文件
      ├── views          模块所有页面
      ├── vuex           模块vuex文件夹
      ├── App.css        模块父级核心入口样式
      ├── App.vue        模块父级核心入口
      ├── main.js        模块入口
      ├── README.md      模块说明文档
      ├── ...            模块其他业务页面代码（自行添加）
    ├── ...
```

# 注
common模块为公用模块，例如相关的http的封装，码表数据data的封装...在common模块中都会有，其他模块可以直接选择引入使用（使用@@别名直接进入src/modules/common目录），也可以在各自模块创建自己的封装。