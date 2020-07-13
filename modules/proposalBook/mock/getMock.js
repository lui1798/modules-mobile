import Mock from "mockjs";
import __getUrlParams from "@t/getUrlParams";

import productList from "../assets/data/productList";
import planShowData from "../assets/data/planShowData";

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      author: "@first",
      reviewer: "@first",
      "channelList|1": [1, 2],
      username: '@cword("王红短发粉缩放",3)',
      roleIdList: i % 2 === 0 ? ["01", "02"] : ["02"],
      "usersex|1": ["1", "2"],
      mobilePhone: "mock data",
      email: "baseContent@em",
      enabled: "",
      businessName: '@cword("王红短发粉缩放",3)',
    }),
  );
}
export const mocks = [
  {
    url: (localStorage.getItem("product/mainDebug") ? "/" : "nodebug/") + "proposal/product/main",
    type: "get",
    response: config => {
      console.log("%c config", "color:green;", config);
      // const { type } = config.query;
      const page = 1,
        size = 20;

      const pageList = productList.filter((item, index) => index < size * page && index >= size * (page - 1));

      return pageList;
    },
  },
  {
    url: (localStorage.getItem("proposal/queryforshowDebug") ? "/" : "nodebug/") + "proposal/proposal/queryforshow",
    type: "get",
    response: config => {
      console.log("%c config", "color:green;", config);
      return planShowData;
    },
  },
];

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null;
      if (respond instanceof Function) {
        console.log("%c mocks>>>>>>>>", "color:green;", options);
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: __getUrlParams(url),
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || "get", XHR2ExpressReqWrap(i.response));
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || "get",
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
    },
  };
};

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response);
});
