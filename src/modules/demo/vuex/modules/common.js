import utils from "@@/utils";
// import {
// 	getUser,
// 	getAddressList
// } from '@/service/getData'

/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  //navigatorConnectionEffectiveType
  NAVIGATORCONNECTIONEFFECTIVETYPE: "NAVIGATORCONNECTIONEFFECTIVETYPE",
  //是否显示登陆
  SHOWLOGIN: "SHOWLOGIN",
  //接口请求成功错误标识
  HTTP_INVALID: "HTTP_INVALID",
  //路由信息
  ROUTERS: "ROUTERS",
  //是否重载页面
  ISROUTERALIVE: "ISROUTERALIVE",
  //是否显示搜索
  SHOWSEARCH: "SHOWSEARCH",
  //是否保存back还是正常back标识
  SAVEORNORMALBACK: "SAVEORNORMALBACK",
  //   加载子router--默认不展示
  IS_SHOW_ROUTER_VIEW: "IS_SHOW_ROUTER_VIEW",
  //Dialog
  DIALOG: "DIALOG",
  //记录router-to
  ISLOGINGO: "ISLOGINGO",
  LOADING: "LOADING",
  // 是否自动提示
  TOAST_DISABLED: "TOAST_DISABLED",
  RECORD_ADDRESS: "RECORD_ADDRESS",
  // 是否有底部导航
  SHOW_FOOTER: "SHOW_FOOTER",
  // 设置proposal对象
  SET_PROPOSAL: "SET_PROPOSAL",
  // 默认选中tab
  TAB_SELECTED: "TAB_SELECTED",
  // 获取用户信息
  USER_INFO: "USER_INFO",
  // 设置是否有秦秋loadding
  LOADING_DISABLED: "LOADING_DISABLED",
  // 设置滚动
  DISABLE_DSCROLL: "DISABLE_DSCROLL",
  // app版本管理
  APP_VESION: "APP_VESION",
  // app设备信息
  APP_DEVICE: "APP_VESION",
  // 消息
  HAS_NOTICE: "HAS_NOTICE",
  ADD_PRODUCT: "test",
  VIEW_START_TIME: "VIEW_START_TIME",
  // 消息缓存
  MESSAGE_CACHE: "MESSAGE_CACHE",
  // 销售方式
  SALE_TYPE: "SALE_TYPE",
  //是否第一次登入，firstLogin
  FIRSTlOGIN: "FIRSTlOGIN",
  //是否最后一次登入，lastLogin
  LASTlOGIN: "LASTlOGIN"
};

const state = {
  viewStartTime: "",
  viewEndTime: "",
  routers: {
    to: {},
    from: {}
  }, // routers路由信息
  showlogin: false, // 是否显示登陆
  httpInvalid: false, // 接口请求成功错误标识
  isRouterAlive: true, // 是否重载页面
  showsearch: false, // 是否显示搜索
  saveOrNormalBack: utils.cache.get("saveOrNormalBack") || "", // 是否保存back还是正常back标识
  Dialog: "", // Dialog
  navigatorConnectionEffectiveType: "", // navigator.connection
  isLoginGo: "", // 记录router-to
  latitude: "39", // 当前位置纬度
  longitude: "116", // 当前位置经度
  userInfo: utils.cache.get("userInfo") || {},
  // 是否有底部导航
  showFooter: false,
  // 加载子router--默认不展示
  isShowRouterView: false,
  tabSelected: "1",
  proposal: null,
  loadingDisabled: false,
  // 禁止底部滚动
  disabledScroll: false,
  //
  disabledToast: false,
  // 当前app的版本号
  appVersion: utils.cache.get("appVersion"),
  // 自助入司完善信息模块的对象key
  trainPersonInfo: "TRAINPERSONINFO",
  // 自动入职合同签订模块的数据
  contactInfo: "CONTACTINFO",
  // 是否有未读消息
  hasNotice: utils.cache.get("NOTICE"),
  loading: {},
  messageCache: utils.cache.get("messageCache") || {},
  saleType: utils.cache.get("saleType") || "",
  firstLogin: "",
  lastLogin: ""
};

const getters = {
  // getUser: () => {
  //   return state.userInfo
  // },
  // loading: () => {
  //   return state.loading
  // },
  // messageCache: () => {
  //   return state.messageCache
  // },
  // saleType: () => {
  //   return state.saleType
  // },
  getfooter() {
    return state.showFooter;
  }
};

const actions = {
  add({ commit, state }, product) {
    console.log("%c state", "color:green;", state);
    commit(types.ADD_PRODUCT, product);
  }
  // async getUserInfo({
  // 	commit,state
  // }) {
  //   let res = await getUser();
  //   console.log('%c vuex-common-getUserInfo','color:#00CD00',res)
  // 	commit(types.USER_INFO, res)
  // },
};

const mutations = {
  // relation关系
  [types.RELATION](state, relation) {
    console.log("%c 产品详情信息 types.PRODUCT", "color:green;", relation);
    state.relation = relation;
  },
  // 页面初始化时间
  [types.VIEW_START_TIME](state, viewStartTime) {
    state.viewStartTime = viewStartTime;
  },
  // 登陆成功后将要跳转的地址
  [types.ISLOGINGO](state, isLoginGo) {
    if (isLoginGo.name != "login") {
      state.isLoginGo = isLoginGo;
    }
  },
  // 设置显示是否登陆
  [types.SHOWLOGIN](state, showlogin) {
    state.showlogin = showlogin;
  },
  // 接口请求成功错误标识更改
  [types.HTTP_INVALID](state, httpInvalid) {
    console.log(
      "%c 全局common接口请求成功错误更改为",
      "color:green;",
      httpInvalid
    );
    state.httpInvalid = httpInvalid;
  },
  // 路由信息
  [types.ROUTERS](state, routers) {
    state.routers = routers;
  },
  // 设置重载页面
  [types.ISROUTERALIVE](state, isRouterAlive) {
    state.isRouterAlive = isRouterAlive;
  },
  // 设置显示是否搜索弹出层
  [types.SHOWSEARCH](state, showsearch) {
    utils.cache.set("showsearch", showsearch);
    state.showsearch = showsearch;
  },
  // 是否保存back还是正常back标识
  [types.SAVEORNORMALBACK](state, saveOrNormalBack) {
    console.log("%c saveOrNormalBack", "color:green;", saveOrNormalBack);
    utils.cache.set("saveOrNormalBack", saveOrNormalBack);
    state.saveOrNormalBack = saveOrNormalBack;
  },
  // Dialog
  [types.DIALOG](state, dialog) {
    utils.cache.set("dialog", dialog);
    state.dialog = dialog;
  },
  // navigatorConnectionEffectiveType
  [types.NAVIGATORCONNECTIONEFFECTIVETYPE](
    state,
    navigatorConnectionEffectiveType
  ) {
    state.navigatorConnectionEffectiveType = navigatorConnectionEffectiveType;
  },
  // 设置加载loadding样式
  [types.LOADING](state, params) {
    state.loading = params.loading;
    state.loadingMsg = params.msg || "";
  },
  // 记录当前经度纬度
  [types.RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 设置是否需要loadding
  [types.LOADING_DISABLED](state, flag) {
    state.loadingDisabled = flag;
  },
  // 是否有底部导航
  [types.SHOW_FOOTER](state, flag) {
    state.showFooter = flag;
  },
  // 加载子router--默认不展示
  [types.IS_SHOW_ROUTER_VIEW](state, flag) {
    console.log(
      "%c common-vuex-加载子router--默认不展示",
      "color:green;",
      flag
    );
    state.isShowRouterView = flag;
  },
  // 设置底部导航属于active状态
  [types.TAB_SELECTED](state, flag) {
    state.tabSelected = flag;
  },
  // [types.SET_PROPOSAL] (state, value) {
  //   state.proposal = value
  // },
  [types.TOAST_DISABLED](state, params) {
    state.disabledToast = params;
  },
  // 存储用户信息
  [types.USER_INFO](state, params) {
    // 调试模式下存储用户信息入 storage
    utils.cache.setAlways("userInfo", params);
    console.log("%c 记录用户信息", "color:#00CD00", params);
    state.userInfo = params;
    console.log("%c 记录用户信息xxxx", "color:#00CD00", state.userInfo);
  },
  // 存储用户信息
  [types.DISABLE_DSCROLL](state, params) {
    // 调试模式下存储用户信息入 storage
    state.disabledScroll = params;
  },
  // app版本号管理
  [types.APP_VESION](state, params) {
    // 调试模式下存储用户信息入 storage
    state.appVersion = params;
  },
  // 消息
  [types.HAS_NOTICE](state, params) {
    utils.cache.set("NOTICE", params);
    state.hasNotice = params;
  },
  // 消息缓存
  [types.MESSAGE_CACHE](state, params) {
    utils.cache.setAlways("messageCache", params);
    state.messageCache = params;
  },
  // 销售方式
  [types.SALE_TYPE](state, params) {
    utils.cache.setAlways("saleType", params);
    state.saleType = params;
  },
  // 是否第一次登入
  [types.FIRSTlOGIN](state, firstLogin) {
    state.firstLogin = firstLogin;
  },
  // 是否最后一次登入
  [types.LASTlOGIN](state, lastLogin) {
    state.lastLogin = lastLogin;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
