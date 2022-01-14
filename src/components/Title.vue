<template>
  <h1 class="mb-8 text-5xl font-bold">{{ title }}</h1>
  <p
    v-if="
      this.$store.getters.getUser.role.type == 'super_admin' ||
      this.$store.getters.getUser.role.type == 'authenticated'
    "
    class="mb-2 inline-block"
  >
    <router-link
      :to="link + '/add'"
      class="flex items-center pr-1.5 pl-1 py-0.5 space-x-1 rounded hover:bg-gray text-gray-light"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <span>Ajouter un {{ type }}</span>
    </router-link>
  </p>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
    link: String,
    type: String,
  },
};
</script>
