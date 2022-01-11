<template>
  <Aside />
  <main class="relative flex-auto p-24">
    <Header />
    <router-view />
  </main>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    Aside,
    Header,
  },
};
</script>
