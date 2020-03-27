/* eslint-disable */
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
/* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
};

const state = {
/* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
};

const getters = {};

const actions = {};

const mutations = {
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
