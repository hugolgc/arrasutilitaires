<template>
  <Title :title="title" :link="link" :type="type" />
  <div class="overflow-x-auto max-w-screen sm:max-w-none">
    <table
      class="table-auto w-full min-w-fit border-t border-b border-gray divide-y divide-gray"
    >
      <thead class="text-left text-gray-light">
        <tr class="divide-x divide-gray">
          <th class="px-2 py-1.5 font-normal">Nom</th>
          <th class="px-2 py-1.5 font-normal">Téléphone</th>
          <th class="px-2 py-1.5 font-normal">Véhicules</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray">
        <tr
          v-for="driver in drivers"
          :key="driver.id"
          class="divide-x divide-gray"
        >
          <td>
            <router-link
              :to="'/app/drivers/edit/' + driver.id"
              class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                class="font-medium underline underline-offset-2 decoration-white/30"
                >{{ driver.name }}</span
              >
              <span
                class="ml-2 text-gray-light font-medium opacity-100 md:opacity-0 group-hover:opacity-100"
                >Voir</span
              >
            </router-link>
          </td>
          <td class="px-2 py-1.5 select-all">{{ driver.phone }}</td>
          <td>
            <router-link
              v-for="car in driver.cars"
              :key="car.id"
              :to="'/app/cars/edit/' + car.id"
              class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                class="font-medium underline underline-offset-2 decoration-white/30"
                >{{ car.model }} {{ car.brand }}</span
              >
              <span
                class="ml-2 text-gray-light font-medium opacity-100 md:opacity-0 group-hover:opacity-100"
                >Voir</span
              >
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
      title: "👷 Conducteurs",
      link: "/app/drivers",
      type: " conducteur",
    };
  },
  computed: {
    drivers() {
      return this.$store.getters.getDrivers;
    },
  },
  async beforeMount() {
    try {
      const { data } = await axios.get(this.$store.getters.getUrl("/drivers"), {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      });
      if (data) {
        this.$store.commit("setDrivers", data.reverse());
      }
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
