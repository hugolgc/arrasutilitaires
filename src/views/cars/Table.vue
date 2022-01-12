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
        <th class="px-2 py-1.5 font-normal">Entreprise</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray">
      <tr v-for="car in cars" :key="car.id" class="divide-x divide-gray">
        <td>
          <router-link
            :to="'/app/cars/edit/' + car.id"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ car.brand }} {{ car.model }}</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
        <td class="px-2 py-1.5 select-all">{{ car.numberplate }}</td>
        <td class="px-2 py-1.5 select-all">{{ setDate(car.service) }}</td>
        <td>
          <router-link
            v-if="car.compagny"
            :to="'/app/companies/edit/' + car.compagny.id"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ car.compagny ? car.compagny.name : "" }}</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Title from "../../components/Title.vue";

export default {
  components: {
    Title,
  },
  data() {
    return {
      title: "🚘 Véhicules",
      link: "/app/cars",
      type: "véhicule",
    };
  },
  computed: {
    cars() {
      return this.$store.getters.getCars;
    },
  },
  methods: {
    setDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  async beforeMount() {
    try {
      const { data } = await axios.get(this.$store.getters.getUrl("/cars"), {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      });
      this.$store.commit("setCars", data);
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
