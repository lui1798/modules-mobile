// import './ext'
// Indicator,
// MessageBox,
// 引入自定义工具类
import cache from "./cache";
import ui from "./ui";
// import n22des3 from "./N22DES3";
import utilsPlugin from "./utilsPlugin";
//码表
// import code from "./code/";
//导入错误码表数据
import errorCode from "@@/data/error/errorCode";

//模块
// import insured from './insured'

// // 引入接口配置类
// import htag from './../assets/interface/interface'

/**
 * cache 缓存数据
 * n22des3 n22des3
 * utilsPlugin 工具类包总
 * format 日期格式化
 * validator 输入数据验证
 * native 和原生的cordova方法进行交互
 * ui 页面公共弹出框 eg: 确定
 * http 后台请求交互
 * htag 配置后台接口配置参数
 */
const utils = {
  cache,
  // n22des3: n22des3,
  ui,
  utilsPlugin,
  //码表-移植进行单独导入
  // code,
  errorCode
};

export default utils;
