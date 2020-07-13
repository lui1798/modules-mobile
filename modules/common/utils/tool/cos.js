/*
  npm i cos-js-sdk-v5 --save

  大文件上传样例:
  // 永久授权大文件上传
  cosUtils.sliceUploadFile(
    // Config 可使用: cosUtils.getConfig()
    {
      bucket: 'gBucket',
      region: 'gRegion'
    },
    // Auth 可使用: cosUtils.getAuthConfig()
    {
      secretId: 'authConfig.tmpSecretId',
      secretKey: 'authConfig.tmpSecretKey'
    },
    // Path
    {
      modelName: 'model',
      pageName: 'page'
    }, file, (progress) => {
      console.log(JSON.stringify(progress))
    }, (data, err) => {
      if (err != null) {
        console.error(err)
      } else {
        console.log(data)
      }
    })

  // 临时授权大文件上传
  cosUtils.sliceUploadFile(
    // Config
    {
      bucket: 'gBucket',
      region: 'gRegion'
    },
    // Auth
    {
      type: 'temp', // 认证类型
      region: '/tmp/', // 授权访问的入口目录
      secretId: 'authConfig.tmpSecretId',
      secretKey: 'authConfig.tmpSecretKey',
      xCosSecurityToken: 'authConfig.xCosSecurityToken',
      expiredTime: 'authConfig.expiredTime'
    },
    // Path
    {
      modelName: 'entry',
      pageName: 'image_page'
    }, file, (progress) => {
      console.log(JSON.stringify(progress))
    }, (data, err) => {
      if (err != null) {
        console.error(err)
      } else {
        console.log(data)
      }
    })
*/

// 全局配置常量
const globalConfig = {
  AppName: "App", // 应用名称
  gBucket: "spoongsb-1253997188", // 存储桶的名称
  gRegion: "ap-chengdu", // 存储桶所在地域
  gSecretId: "AKID42pSt9AHBvtkQuQtgJk05zpkT4Xso8A0",
  gSecretKey: "RqW3Sgw6gASaWHwTr45kNo4C9vhOwISP",
};

console.log(">>>>", globalConfig);
import { format } from "date-fns";
const COS = require("cos-js-sdk-v5");
console.log("%c ========== COS CONFIG START ========== ", "color:blue");
const gBucket = globalConfig.gBucket;
console.log("%c COS BUCKET : ", "color:blue", gBucket);
const gRegion = globalConfig.gRegion;
console.log("%c COS REGION : ", "color:blue", gRegion);
const gSecretId = globalConfig.gSecretId;
console.log("%c COS SECRETID : ", "color:blue", gSecretId);
const gSecretKey = globalConfig.gSecretKey;
console.log("%c COS SECRETKEY : ", "color:blue", gSecretKey);
console.log("%c ========== COS CONFIG END ========== ", "color:blue");

const cosUtils = {
  /**
   * 获取配置
   */
  getConfig() {
    console.log("config cos ... ");
    return {
      bucket: gBucket,
      region: gRegion,
    };
  },
  /**
   * 获取永久授权配置
   */
  getAuthConfig() {
    console.log("auth config cos ... ");
    return {
      secretId: gSecretId,
      secretKey: gSecretKey,
    };
  },
  /**
   * 永久认证
   * @param {secretId} SecretId
   * @param {secretKey} SecretKey
   */
  auth({ secretId, secretKey }) {
    console.log("auth cos ... ");
    console.log("%c COS AUTH SECRETID : ", "color:blue", secretId);
    console.log("%c COS AUTH SECRETKEY : ", "color:blue", secretKey);
    return new COS({
      SecretId: secretId,
      SecretKey: secretKey,
    });
  },
  /**
   * 临时认证
   * @param {region} 授权安全目录
   * @param {secretId} 临时授权 SecretId
   * @param {secretKey} 临时授权 SecretKey
   * @param {xCosSecurityToken} 临时授权 Token
   * @param {expiredTime} expiredTime 临时密钥失效时间戳,申请临时密钥
   */
  tmpAuth({ secretId, secretKey, xCosSecurityToken, expiredTime }) {
    console.log("tmp auth cos ... ");
    console.log("%c COS TMP AUTH SECRETID : ", "color:blue", secretId);
    console.log("%c COS TMP AUTH SECRETKEY : ", "color:blue", secretKey);
    console.log("%c COS TMP AUTH GTOKEN : ", "color:blue", xCosSecurityToken);
    console.log("%c COS TMP AUTH GEXPIREDTIME : ", "color:blue", expiredTime);
    return new COS({
      getAuthorization: (options, callback) => {
        const result = {
          TmpSecretId: secretId,
          TmpSecretKey: secretKey,
          XCosSecurityToken: xCosSecurityToken,
          ExpiredTime: expiredTime,
        };
        callback(result);
      },
    });
  },
  /**
   * 获取通过认证的COS对象
   */
  getAuthCos(authConfig) {
    let cos;
    if (authConfig.type === "temp") {
      // 临时认证
      cos = this.tmpAuth({
        secretId: authConfig.secretId,
        secretKey: authConfig.secretKey,
        xCosSecurityToken: authConfig.xCosSecurityToken,
        expiredTime: authConfig.expiredTime,
      });
    } else {
      // 永久认证
      cos = this.auth({
        secretId: authConfig.secretId,
        secretKey: authConfig.secretKey,
      });
    }
    console.log(cos);
    return cos;
  },
  /**
   *
   * COS上传对象
   *
   * @param {配置桶名和区域名} config
   * @param {配置认证方式和相关秘钥} authConfig
   * @param {路径} {modelName = 'model', pageName = 'page'}
   * @param {文件对象} file
   * @param {上传进度} progress
   * @param {上传回调} callback
   */
  putObject(config, authConfig, { modelName = "model", pageName = "page" }, file, progress, callback) {
    // 授权获取COS对象
    const cos = this.getAuthCos(authConfig);
    const path =
      modelName +
      "/" +
      pageName +
      "/" +
      format(new Date(), "yyyy-MM-dd") +
      "/" +
      new Date().getTime() +
      "_" +
      file.name;
    console.log("上传路径 :", path);
    cos.putObject(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: (authConfig.region !== undefined ? authConfig.region : "") + path,
        Body: file,
        onProgress: progressData => {
          progress(JSON.stringify(progressData));
        },
      },
      (err, data) => {
        callback(data, err);
      },
    );
  },
  /**
   *
   * COS实现文件的分块上传，适用于大文件上传
   *
   * @param {配置桶名和区域名} config
   * @param {配置认证方式和相关秘钥} authConfig
   * @param {路径} {modelName = 'model', pageName = 'page'}
   * @param {文件对象} file
   * @param {上传进度} progress
   * @param {上传回调} callback
   */
  sliceUploadFile(config, authConfig, { modelName = "model", pageName = "page" }, file, progress, callback) {
    // 授权获取COS对象
    const cos = this.getAuthCos(authConfig);
    const path =
      modelName +
      "/" +
      pageName +
      "/" +
      format(new Date(), "yyyy-MM-dd") +
      "/" +
      new Date().getTime() +
      "_" +
      file.name;
    console.log("上传路径 :", path);
    cos.sliceUploadFile(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: (authConfig.region !== undefined ? authConfig.region : "") + path,
        Body: file,
        onTaskReady: taskId => {
          // 可回传任务号非必须
          console.log(taskId);
        },
        onHashProgress: progressData => {
          console.log(JSON.stringify(progressData));
        },
        onProgress: progressData => {
          // 回传进度
          progress(progressData);
        },
      },
      (err, data) => {
        // 回传结果
        callback(data, err);
      },
    );
  },
};

export { cosUtils };
