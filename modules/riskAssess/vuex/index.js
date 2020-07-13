import Vue from "vue";
import Vuex from "vuex";
//公用模块
import common from "@@/vuex/modules/common";
import riskAssess from "./riskAssess";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    common,
    riskAssess,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
