/* eslint-disable */
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  CLEAN: "CLEAN", //清除数据
  DETAILINFOSTATE: "DETAILINFOSTATE", //人员详情页面数据状态
  TRAINING: "TRAINING", //培训信息
  EDUCATIONBACKGROUND: "EDUCATIONBACKGROUND", //学历信息
  WORKEXPERIENCE: "WORKEXPERIENCE", //工作信息
  ENTRY_STATEMENT: 'ENTRY_STATEMENT', //入职声明书
  OCCUPATION_STATEMENT: 'OCCUPATION_STATEMENT', //职业行为声明书
  /* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
};

const state = {
  detailInfoState: {}, //人员详情页面数据状态
  trainingState: [], //培训信息
  educationBackgroundState: [], //学历信息
  workExperienceState: [], //工作信息
  entryStatementState: false, //入职声明书是否已阅读
  occupationStatementState: false, //职业行为声明书是否已阅读
  /* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
};

const getters = {};

const actions = {};

const mutations = {
  [types.ENTRY_STATEMENT](state, value){
    state.entryStatementState = value
  },
  [types.OCCUPATION_STATEMENT](state, value){
    state.occupationStatementState = value
  },
  [types.CLEAN](state) {
    console.log("%c 清除数据", "color:green;");
    state.detailInfoState = {};
    state.trainingState = [];
    state.educationBackgroundState = [];
    state.workExperienceState = [];
  },
  [types.DETAILINFOSTATE](state, value) {
    console.log("%c 人员详情页面数据状态", "color:green;", value);
    state.detailInfoState = value;
    state.trainingState = value.training;
    state.educationBackgroundState = value.educationBackground;
    state.workExperienceState = value.workExperience;
  },
  [types.TRAINING](state, value) {
    console.log("%c 培训信息", "color:green;", value);
    state.trainingState.push(value);
  },
  [types.EDUCATIONBACKGROUND](state, value) {
    console.log("%c 学历信息", "color:green;", value);
    state.educationBackgroundState.push(value);
  },
  [types.WORKEXPERIENCE](state, value) {
    console.log("%c 工作信息", "color:green;", value);
    state.workExperienceState.push(value);
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
