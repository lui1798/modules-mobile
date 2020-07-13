//判定最大版本号=>得到当前系统版本号
const getV = function(globalConfig) {
  let versionMax = "V";
  if (globalConfig.version && globalConfig.version.native && globalConfig.version.plist && globalConfig.version.all) {
    const nativels = parseInt(globalConfig.version.native.replace("V", "").replace(/\./g, ""));
    const plistls = parseInt(globalConfig.version.plist.replace("V", "").replace(/\./g, ""));
    const allls = parseInt(globalConfig.version.all.replace("V", "").replace(/\./g, ""));
    const verMax = Math.max(nativels, plistls, allls) + "";
    verMax.split("").forEach((el, i) => {
      if (i === 1 || i === 4) {
        versionMax += "." + el;
      } else {
        versionMax += el;
      }
    });
    return versionMax;
  }
};
export { getV };
