<template>
  <header class="absolute top-0 right-0 left-0 px-3 py-2.5">
    <div class="flex items-center">
      <p class="px-1.5 py-0.5 rounded hover:bg-gray">Arras Utilitaires</p>
      <p v-for="(item, key) in items" :key="key">
        <span class="px-1 text-gray">/</span>
        <router-link
          :to="item.link"
          class="inline-block px-1.5 py-0.5 rounded hover:bg-gray"
          >{{ item.name }}</router-link
        >
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    items() {
      return this.$store.getters.getHeader;
    },
  },
};
</script>
