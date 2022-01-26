<template>
  <ul class="min-h-screen w-full bg-white text-black text-3xl">
    <li
      v-for="maintenance in getMaintenances"
      :key="maintenance.id"
      class="peer"
    >
      <img
        v-if="
          maintenance.car &&
          maintenance.car.compagny &&
          getCompany(maintenance.car.compagny).picture
        "
        style="max-height: 40vh"
        class="w-full object-cover"
        :src="
          $store.getters.getUrl(
            getCompany(maintenance.car.compagny).picture.url
          )
        "
      />
      <ul v-if="maintenance.car" class="grid grid-cols-2 divide-black">
        <li class="p-8 space-y-0.5 border-b border-r border-black">
          <span class="block text-xl text-black/50">Heure</span>
          <span class="block">{{ getDate(maintenance.date) }}</span>
        </li>
        <li class="p-8 space-y-1 border-b border-black">
          <span class="block text-xl text-black/50">Entreprise</span>
          <span class="block">{{
            maintenance.car.compagny
              ? getCompany(maintenance.car.compagny).name
              : "Non renseignée"
          }}</span>
        </li>
        <li class="p-8 space-y-0.5 border-b border-r border-black">
          <span class="block text-xl text-black/50">Conducteur</span>
          <span class="block">{{
            maintenance.car.driver
              ? getDriver(maintenance.car.driver).name
              : "Non renseigné"
          }}</span>
        </li>
        <li class="p-8 space-y-0.5 border-b border-black">
          <span class="block text-xl text-black/50">Véhicule</span>
          <span class="block"
            >{{ maintenance.car.brand }} {{ maintenance.car.model }}</span
          >
        </li>
        <li class="p-8 space-y-0.5 border-b border-r border-black">
          <span class="block text-xl text-black/50">Téléphone</span>
          <span class="block">{{
            maintenance.car.driver
              ? getDriver(maintenance.car.driver).phone
              : "Non renseigné"
          }}</span>
        </li>
        <li class="p-8 space-y-0.5 border-b border-black">
          <span class="block text-xl text-black/50">Immatriculation</span>
          <span class="block">{{ maintenance.car.numberplate }}</span>
        </li>
        <li class="col-span-2 p-8 space-y-1">
          <span class="block text-xl text-black/50">Adresse</span>
          <span class="block">{{
            maintenance.car.compagny
              ? getCompany(maintenance.car.compagny).adress
              : "Non renseignée"
          }}</span>
        </li>
      </ul>
      <router-link
        v-if="maintenance.car"
        :to="'/technician/maintenances/' + maintenance.id"
        :class="maintenance.state ? 'bg-green-500' : 'bg-black'"
        class="block p-12 text-center text-white font-medium uppercase"
        >{{ maintenance.state ? "Fait" : "Contrôler" }}</router-link
      >
    </li>
    <li class="peer-empty:block hidden p-16 text-center">
      Intervention prévue sans véhicule.
    </li>
    <li v-if="!getMaintenances.length" class="p-16 text-center">
      Aucune intervention prévue.
    </li>
  </ul>
</template>

<style scoped>
* {
  font-family: "Rubik", sans-serif;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("fr");

export default {
  data() {
    return {
      maintenances: [],
      companies: [],
      drivers: [],
    };
  },
  computed: {
    getMaintenances() {
      return this.maintenances.filter(
        (maintenance) =>
          maintenance.technician == this.$store.getters.getUser.id &&
          moment(maintenance.date).isSame(moment(new Date()), "day")
      );
    },
  },
  methods: {
    getDate(date) {
      return moment(date).format("HH:mm");
    },
    async setMaintenances() {
      try {
        const { data } = await axios.get(
          this.$store.getters.getUrl("/maintenances"),
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.maintenances = data;
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    async setCompanies() {
      try {
        const { data } = await axios.get(
          this.$store.getters.getUrl("/compagnies"),
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.companies = data;
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    getCompany(id) {
      return this.companies.find((company) => company.id == id);
    },
    async setDrivers() {
      try {
        const { data } = await axios.get(
          this.$store.getters.getUrl("/drivers"),
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.drivers = data;
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    getDriver(id) {
      return this.drivers.find((driver) => driver.id == id);
    },
  },
  beforeMount() {
    this.setMaintenances();
    this.setCompanies();
    this.setDrivers();
  },
};
</script>
