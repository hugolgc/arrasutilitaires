<template>
  <div class="z-10 fixed top-0 right-0 bottom-0 w-60 bg-gray-dark shadow-2xl">
    <label class="flex border-b border-gray divide-x divide-gray">
      <span
        @click="handleClose()"
        class="w-11 flex flex-none justify-center items-center text-gray-light cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <input
        v-model="search"
        :placeholder="placeholder"
        type="text"
        maxlength="255"
        class="w-full h-11 px-4 bg-transparent outline-none placeholder:text-gray-light"
      />
    </label>
    <ul class="p-1.5">
      <li
        @click="handleSelect(null)"
        class="group flex justify-between mb-1.5 px-2 py-1.5 rounded cursor-pointer hover:bg-gray"
      >
        <span
          class="font-medium underline underline-offset-2 decoration-white/30"
          >Laisser vide</span
        >
        <span
          class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
          >Choisir</span
        >
      </li>
      <template v-if="search.length">
        <li
          v-for="item in getList"
          :key="item.id"
          @click="handleSelect(item)"
          class="group flex justify-between mb-1.5 px-2 py-1.5 rounded cursor-pointer hover:bg-gray"
        >
          <span
            class="font-medium underline underline-offset-2 decoration-white/30"
            >{{ item[searchField] }}</span
          >
          <span
            class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
            >Choisir</span
          >
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Associate",
  props: {
    list: Array,
    id: String,
    type: String,
    fieldChange: String,
    searchField: String,
    placeholder: String,
  },
  data() {
    return {
      info: null,
      search: "",
    };
  },
  computed: {
    getList() {
      return this.list.filter((item) =>
        item[this.searchField].toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    capitalize(string) {
      return string[0].toUpperCase() + string.substring(1);
    },
    handleClose() {
      this.$emit("emit", false);
    },
    async handleSelect(item) {
      let put = {};
      put[this.fieldChange] = item;
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/${this.type}/${this.id}`),
          put,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$store.commit("setApp");
          this.handleClose();
          // try {
          //   const { data } = await axios.get(
          //     this.$store.getters.getUrl(`/${this.type}`),
          //     {
          //       headers: {
          //         Authorization: `Bearer ${this.$store.getters.getToken}`,
          //       },
          //     }
          //   );
          //   if (data) {
          //     this.$store.commit(
          //       `set${this.capitalize(this.type)}`,
          //       data.reverse()
          //     );
          //     this.handleClose();
          //   }
          // } catch (error) {
          //   alert("Erreur lors de la récupération des données.");
          // }
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
};
</script>
