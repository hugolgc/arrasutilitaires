<template>
  <Title :title="title" :link="link" :type="type" />
  <table
    class="table-auto w-full border-t border-b border-gray divide-y divide-gray"
  >
    <thead class="text-left text-gray-light">
      <tr class="divide-x divide-gray">
        <th class="px-2 py-1.5 font-normal">Nom</th>
        <th class="px-2 py-1.5 font-normal">Immatriculation</th>
        <th class="px-2 py-1.5 font-normal">Mise en service</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray">
      <tr
        v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="item"
        class="divide-x divide-gray"
      >
        <td>
          <router-link
            to="/app/cars"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >BMW 6 Series</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
        <td>
          <p
            class="group flex justify-between px-2 py-1.5 rounded cursor-pointer hover:bg-gray active:bg-gray-dark"
          >
            <span>EF-416-QT</span>
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Copier</span
            >
          </p>
        </td>
        <td>
          <p
            class="group flex justify-between px-2 py-1.5 rounded cursor-pointer hover:bg-gray active:bg-gray-dark"
          >
            <span>29/09/2016</span>
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Copier</span
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Title from "../../components/Title.vue";

export default {
  components: {
    Title,
  },
  data() {
    return {
      title: "🏗 Entreprises",
      link: "/app/companies",
      type: "entreprise",
    };
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: this.title,
        link: this.link,
      },
    ]);
  },
};
</script>
