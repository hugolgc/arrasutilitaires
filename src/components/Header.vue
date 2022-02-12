<template>
  <header class="absolute top-0 right-0 left-0 px-3 py-2.5">
    <div class="flex items-center flex-wrap">
      <span
        @click="$store.commit('setAside', !$store.getters.getAside)"
        class="block lg:hidden px-1 cursor-pointer opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <p class="px-1.5 py-0.5 rounded hover:bg-gray">Atelier Utilitaires</p>
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
