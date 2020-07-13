/* eslint-disable */
import utils from "@@/utils";
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  WORDSHOW: "WORDSHOW", //文件展示url
  LSPRODATA: "LSPRODATA", //临时险种信息缓存
  /* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
  AGENTCODE: "AGENTCODE", //代理人工号
};

const state = {
  wordShow: utils.cache.get("vuex-wordShow") || "", //文件展示url
  lsProData: utils.cache.get("vuex-lsProData") || "", //临时险种信息缓存
  /* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
  agentCode: "",
};

const getters = {};

const actions = {};

const mutations = {
  [types.AGENTCODE](state, value) {
    console.log("%c 代理人工号", "color:green;", value);
    state.agentCode = value;
  },
  [types.WORDSHOW](state, value) {
    console.log("%c 文件展示对象", "color:green;backgroundColor:black;", value);
    utils.cache.set("vuex-wordShow", value);
    state.wordShow = value;
  },
  [types.LSPRODATA](state, value) {
    console.log("%c 临时险种信息缓存", "color:green;", value);
    utils.cache.set("vuex-lsProData", value);
    state.lsProData = value;
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
  mutations,
};
