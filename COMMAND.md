# 相关运行命令

## dev-本地运行
 ```
 npm run dev -m-{module} -p-{platform}
 ```
- 将`{module}`替换成需要运行的模块(模块名称以自动化命令创建时候的首字母小写的驼峰名称)
  - 因为本地运行所以此处每次运行只能运行一个模块，如果要运行多个模块，另启cmd终端再次运行，程序会根据自动命令创建模块是记录的port端口来运行各自模块的
  - 将`{platform}`替换成需要运行的native
  - 可选`web`、`native`、`phoneweb`、（可在`main.js`中维护）
  - 可以不添加此参数-默认`web`
  ```
  -p-{platform}
  ```

## int-测试环境运行
```
npm run int -m-{module} -p-{platform}
```
- 同`dev`模式
- 与`dev`不同的是此处`{module}`可以用逗号分割多个模块
  - eg：`npm run int -m-train,insured,demo`

## uat-测试环境运行
```
npm run int -m-{module} -p-{platform}
```
- 同`int`模式

## sta-预生产环境运行
```
npm run int -m-{module} -p-{platform}
```
- 同`int`模式

## prod-生产环境运行
```
npm run int -m-{module} -p-{platform}
```
- 同`int`模式


## 创建模、页面、vuex块命令
- 运行
  - [ ] `npm run create`
- 选择
  - [ ] `module`创建模块
  - [ ] `view`创建页面（创建之前选择模块）
  - [ ] `vuex`创建简单的vuex（创建之前选择模块）
  - [ ] `component `创建简单的component（-暂时未启用）
  - 注：在创建模块的时候会默认引导进行创建模块的第一个页面
- 输入要创建的模块/页面名称(eg: my-example1)
  - [ ] 名称根据实际含义以英文拼接，如果是一个单词就直接小写，如果是多个单词，使用-中间进行连接
- 入要创建的页面中文名称(中文)
  - [ ] ...
- 是否将页面更新进入路由表，默认更新进路由表
  - [ ] 默认是，会在创建页面的同时，将页面挂载到当前模块的路由表中。如果选择false，那么仅仅只是创建页面，不挂载路由。


# 注意
- 各个环境的配置尽量抽取到四个环境变量配置文件中（`.env.int`,`.env.uat`,`.env.sta`,`.env.prod`）
  - 然后通过process.env.{param} 来在代码中获取相应的配置参数（避免在main.js中写死相关的配置参数）