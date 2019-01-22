<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="test()">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
// import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default {
  components: {
    HelloWorld,
  },
  methods: {
    test() {
      console.log('111111');
    },
  },
};

// @Component({
//   components: {
//     HelloWorld,
//   },
// })
// export default class Home extends Vue {}
</script>
