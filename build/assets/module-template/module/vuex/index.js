import Vue from "vue";
import Vuex from "vuex";
import {{moduleKebabUpper}} from "./{{moduleKebabUpper}}";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    {{moduleKebabUpper}}
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
