import Vue from 'vue';

import BasePage from './base-page.vue'; //页面组件
import BaseView from './base-view.vue'; //路由嵌套组件
import Loading from "./loading"; // loading

let MyPlugin = {};

MyPlugin.install = function(Vue) {

	if (this.installed) return;

	Vue.component(BasePage.name, BasePage); //注册组件
	Vue.component(BaseView.name, BaseView); //注册组件

	Vue.$loading = Vue.prototype.$loading = Loading; //注册全局方法组件

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	MyPlugin.install(window.Vue);
}

Vue.use(MyPlugin)

export default MyPlugin

/**
 * 使用方法：
 * 1：将此文件夹复制到项目中
 * 2：在mainjs里引入 
 *    import "此文件夹路径";
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */