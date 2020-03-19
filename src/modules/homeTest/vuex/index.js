import Vue from "vue";
import Vuex from "vuex";
import homeTest from "./homeTest";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    homeTest
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
