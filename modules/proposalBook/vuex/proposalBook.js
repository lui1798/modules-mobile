/* eslint-disable */
import utils from "@@/utils";
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  WORKSHOWURL: "WORKSHOWURL",//文件展示url
/* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
};

const state = {
  workShowUrl: utils.cache.get("vuex-workShowUrl") || "",//文件展示url
/* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
};

const getters = {};

const actions = {};

const mutations = {
  [types.WORKSHOWURL](state, value) {
    console.log('%c 文件展示url', 'color:green;backgroundColor:black;', value);
    utils.cache.set("vuex-workShowUrl", value);
    state.workShowUrl = value;
  },
/* @moreLine<%  [types.${vuexType}](state, value) {
    console.log('%c ${vuexDesc}', 'color:green;', value);
    state.${vuexStateKebabUpper} = value;
  },moreLine%> */
};

export default {
  state,
  getters,
  actions,
  mutations
};
