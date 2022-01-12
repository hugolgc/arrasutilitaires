<template>
  <Title :title="title" :link="link" :type="type" />
  <table
    class="table-auto w-full border-t border-b border-gray divide-y divide-gray"
  >
    <thead class="text-left text-gray-light">
      <tr class="divide-x divide-gray">
        <th class="px-2 py-1.5 font-normal">Nom</th>
        <th class="px-2 py-1.5 font-normal">Adresse</th>
        <th class="px-2 py-1.5 text-right font-normal">Véhicules</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray">
      <tr
        v-for="company in companies"
        :key="company.id"
        class="divide-x divide-gray"
      >
        <td>
          <router-link
            :to="'/app/companies/edit/' + company.id"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ company.name }}</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
        <td class="px-2 py-1.5 select-all">{{ company.adress }}</td>
        <td>
          <p class="px-2 py-1.5 text-right">
            {{ company.cars.length }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
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
  computed: {
    companies() {
      return this.$store.getters.getCompanies;
    },
  },
  async beforeMount() {
    try {
      const { data } = await axios.get(
        this.$store.getters.getUrl("/compagnies"),
        { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } }
      );
      this.$store.commit("setCompanies", data);
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
    }
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
