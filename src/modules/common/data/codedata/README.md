# 码表

### 新增码表步骤
因为目前只设置了common模块

- 1、新增公共码表数据 在/common/index.js 文件中配置相应的码表数据。
    注：如果码表数据量过大(超过五个)，请配置到当前文件夹下的json文件中 eg: /common/json/address.json
    正常的码表数据格式为 [{},{},{}]
- 2、新增不同模块特殊码表数据 创建common同级的文件夹，类似于common的形式创建各自模块的码表模块。
    注：新增的模块最后要注入 ./index.js 中
- 3、目前产化的职业逻辑为三级json拼接格式，可以使用命令行由excel表格创建生成json文件，
    ```
    npm run build:codetables
    ```
    excel的格式参考assets/codetables/README.md