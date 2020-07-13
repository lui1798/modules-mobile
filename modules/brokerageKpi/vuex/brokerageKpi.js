/* eslint-disable */
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  /* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
  AGENTCODE: "AGENTCODE", //代理人工号
  MYEXAMINETABS: "MYEXAMINETABS", //我的考核tabs
  MYEXAMINE: "MYEXAMINE", //我的考核数据，
  HISAGENTCODE: "HISAGENTCODE", // 组员工号
  HISTABS: "HISTABS", // 组员工号
};

const state = {
  /* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
  agentCode: "",
  myExamineTabs: [],
  myExamine: {},
  hisAgentCode: "",
  hisTabs: [],
};

const getters = {};

const actions = {};

const mutations = {
  /* @moreLine<%  [types.${vuexType}](state, value) {
    console.log('%c ${vuexDesc}', 'color:green;', value);
    state.${vuexStateKebabUpper} = value;
  },moreLine%> */
  [types.AGENTCODE](state, value) {
    console.log("%c 代理人工号", "color:green;", value);
    state.agentCode = value;
  },
  [types.MYEXAMINETABS](state, value) {
    console.log("%c 我的考核tabs", "color:green;", value);
    state.myExamineTabs = value;
  },
  [types.MYEXAMINE](state, value) {
    console.log("%c 我的考核", "color:green;", value);
    state.myExamine = value;
  },
  [types.HISAGENTCODE](state, value) {
    console.log("%c ta的考核工号", "color:green;", value);
    state.hisAgentCode = value;
  },
  [types.HISTABS](state, value) {
    console.log("%c ta的考核 tabs", "color:green;", value);
    state.hisTabs = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
