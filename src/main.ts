import Vue from 'vue';
import './cube-ui';
import "./components/base/index"; //导入组件库
import App from './App.vue';
import router from './router';
import "./assets/css/base.css";
import "./assets/js";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
