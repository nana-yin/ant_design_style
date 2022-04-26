/*eslint-disable*/
/**
 * @file App入口文件
 * @Author heyuze
 * @Date 2018-11-21
 */
// import '@babel/polyfill'
// import 'promise-polyfill/src/polyfill';
import "core-js/modules/es6.promise";
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/es7.array.includes";

if (global._babelPolyfill) {
  throw new Error("only one instance of @babel/polyfill is allowed");
}
global._babelPolyfill = true;

import "core-js/shim";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "ant-design-vue/dist/antd.css";
import "./assets/style/variable.styl";
import "@/assets/style/fullpage-reset.styl";

import axios from "axios";
Vue.prototype.$axios = axios;
import {
  Switch,
  Carousel,
  Card,
  LocaleProvider,
  ConfigProvider,
  Layout,
  Button,
  Dropdown,
  Menu,
  Icon,
  Steps,
  Row,
  Col,
  Form,
  FormModel,
  Input,
  InputNumber,
  Select,
  Table,
  Checkbox,
  message,
  notification,
  Radio,
  Spin,
  Tooltip,
  Modal,
  Slider,
  DatePicker,
  Popconfirm,
  Pagination,
  Popover,
  Skeleton,
  Breadcrumb,
  Tabs,
  Tag,
  List,
  BackTop,
  Upload,
  Avatar,
  TreeSelect
} from "ant-design-vue";
import echarts from 'echarts/lib/echarts'
import "./config/echart.config";
Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts;
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.use(Carousel);
Vue.use(Switch);
Vue.use(Card);
Vue.use(LocaleProvider);
Vue.use(ConfigProvider);
Vue.use(BackTop);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Steps);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Table);
Vue.use(Checkbox);
Vue.use(Spin);
Vue.use(Tooltip);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(Slider);
Vue.use(DatePicker);
Vue.use(Popconfirm);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Skeleton);
Vue.use(Breadcrumb);
Vue.use(Tag);
Vue.use(List);
Vue.use(Tabs);
Vue.use(Upload);
Vue.use(Avatar);
Vue.use(TreeSelect);

Vue.config.productionTip = false;

//系统错误捕获
const errorHandler = (error, vm) => {
  // console.error('抛出全局异常');
  // console.error(vm);
  // console.error(error);
};
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);
//当页面 加载 script标签404的时候 表示新的项目已更新 刷新页面获取新的代码
window.addEventListener(
  "error",
  (msg, url, row, col, error) => {
    console.log("我知道 404 错误了");
    // console.log(
    //   msg, url, row, col, error
    // );
    // alert(msg)
    if (msg.target.localName === "script") {
      setTimeout(() => {
        history.go(0);
      }, 1000);
    }
  },
  true
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
