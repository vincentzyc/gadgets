import Vue from 'vue';
import Profile from "./loading.vue";

const Loading = Vue.extend(Profile);

let instance: any;

export default {
  open(options = { text: "", type: "" }) {
    if (!instance) {
      instance = new Loading({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text;
    instance.type = options.type || 'snake';
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};