<template>
  <Aside />
  <main
    class="relative flex-auto py-24 sm:px-6 md:px-12 lg:px-6 xl:px-12 2xl:px-24"
  >
    <Header />
    <router-view />
  </main>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";

export default {
  name: "Layout",
  components: {
    Aside,
    Header,
  },
  beforeMount() {
    this.$store.commit("setApp");
  },
};
</script>
