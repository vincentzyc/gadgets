<template>
  <!-- <BaseView> -->
  <div class="personal-tax">
    <h1>This is an about page</h1>
    <h1>Hello world</h1>
    <cube-button :primary="true" @click="$router.back()">back</cube-button>
    <cube-button :primary="true" @click="test()">test</cube-button>
  </div>
  <!-- </BaseView> -->
</template>

<script>
// import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/hello-world.vue"; // @ is an alias to /src
export default {
  methods: {
    test() {
      this.$loading.open("123");
    }
  }
};
// @Component({
//   components: {
//     HelloWorld
//   }
// })
// export default class Home extends Vue {
//   protected test() {
//     // console.log(this);
//     this.$loading('123')
//   }
// }
</script>

