<template>
  <Aside />
  <main class="relative flex-auto p-24">
    <Header />
    <router-view />
  </main>
</template>

<script>
import axios from "axios";
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    Aside,
    Header,
  },
  async beforeMount() {
    // Companies
    try {
      const { data } = await axios.get(
        this.$store.getters.getUrl("/compagnies"),
        {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
        }
      );
      this.$store.commit("setCompanies", data);
      console.log("Companies", data);
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
      return;
    }

    // Cars
    try {
      const { data } = await axios.get(this.$store.getters.getUrl("/cars"), {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      });
      this.$store.commit("setCars", data);
      console.log("Cars", data);
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
      return;
    }

    // Drivers
    try {
      const { data } = await axios.get(this.$store.getters.getUrl("/drivers"), {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      });
      this.$store.commit("setDrivers", data);
      console.log("Drivers", data);
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
      return;
    }

    // Commercials

    // Providers
  },
};
</script>
