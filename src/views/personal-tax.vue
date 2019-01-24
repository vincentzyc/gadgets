<template>
  <basePage title="personalTax">
    <div class="personal-tax">
      <h1>This is an about page</h1>
      <h1>Hello world</h1>
      <cube-button :primary="true" @click="$router.back()">back</cube-button>
      <cube-button :primary="true" @click="test()">test</cube-button>
    </div>
  </basePage>
</template>

<script>
export default {
  methods: {
    test() {
      this.$loading.open('123');
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
    }
  }
}
// import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/hello-world.vue"; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld
//   }
// })
// export default class Home extends Vue {
//   protected test() {
//     this.$loading.open('123')
//   }
// }
</script>

