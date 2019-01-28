import Vue from 'vue';
import Api from './api';
import Util from './util';

"use strict";

let MyPlugin = {
  install: function (Vue: any) {
    if (Vue) {
      Vue.prototype.$api = Api;
      Vue.prototype.$util = Util;
    }
  }
}

Vue.use(MyPlugin)

export default MyPlugin;