<template>
  <Title :title="title" :link="link" :type="type" />
  <div class="overflow-x-auto max-w-screen sm:max-w-none">
    <table
      class="table-auto w-full min-w-fit border-t border-b border-gray divide-y divide-gray"
    >
      <thead class="text-left text-gray-light">
        <tr class="divide-x divide-gray">
          <th class="font-normal">
            <label class="flex items-center px-2 py-1.5 rounded hover:bg-gray">
              <select
                v-model="date"
                class="w-full bg-transparent outline-none appearance-none cursor-pointer"
              >
                <option value="all">Dates</option>
                <option value="after">Dates à venir</option>
                <option value="before">Dates passées</option>
              </select>
              <span class="text-gray-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </th>
          <th class="font-normal">
            <label class="flex items-center px-2 py-1.5 rounded hover:bg-gray">
              <select
                v-model="technician"
                class="w-full bg-transparent outline-none appearance-none cursor-pointer"
              >
                <option value="default">Techniciens</option>
                <option
                  v-for="technicianUser in technicians"
                  :key="technicianUser.id"
                  :value="technicianUser.id"
                >
                  {{ technicianUser.username }}
                </option>
              </select>
              <span class="text-gray-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </th>
          <th class="px-2 py-1.5 font-normal">Véhicule</th>
          <th class="px-2 py-1.5 font-normal">Entreprise</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray">
        <tr
          v-for="maintenance in maintenancesByTechnician"
          :key="maintenance.id"
          class="divide-x divide-gray"
        >
          <td>
            <router-link
              :to="'/app/maintenances/edit/' + maintenance.id"
              class="group flex items-center px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                :class="
                  maintenance.state
                    ? 'bg-green-600 border-green-800'
                    : compareDate(maintenance.date)
                    ? 'bg-yellow-500 border-yellow-700'
                    : 'bg-red-600 border-red-800'
                "
                class="block w-4 h-4 flex-none border rounded-full"
              ></span>
              <span
                class="ml-2 mr-auto font-medium capitalize underline underline-offset-2 decoration-white/30"
                >{{ setDate(maintenance.date) }}</span
              >
              <span
                class="ml-2 text-gray-light font-medium opacity-100 md:opacity-0 group-hover:opacity-100"
                >Voir</span
              >
            </router-link>
          </td>
          <td>
            <router-link
              v-if="maintenance.technician"
              :to="'/app/users/edit/' + maintenance.technician"
              class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                class="font-medium capitalize underline underline-offset-2 decoration-white/30"
                >{{ getTechnician(maintenance.technician).username }}</span
              >
              <span
                class="ml-2 text-gray-light font-medium opacity-100 md:opacity-0 group-hover:opacity-100"
                >Voir</span
              >
            </router-link>
          </td>
          <td>
            <router-link
              v-if="maintenance.car"
              :to="'/app/cars/edit/' + maintenance.car.id"
              class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                class="font-medium capitalize underline underline-offset-2 decoration-white/30"
                >{{ maintenance.car.brand }} {{ maintenance.car.model }}</span
              >
              <span
                class="ml-2 text-gray-light font-medium opacity-100 md:opacity-0 group-hover:opacity-100"
                >Voir</span
              >
            </router-link>
          </td>
          <td>
            <router-link
              v-if="maintenance.car && maintenance.car.compagny"
              :to="'/app/companies/edit/' + maintenance.car.compagny"
              class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
            >
              <span
                class="font-medium capitalize underline underline-offset-2 decoration-white/30"
                >{{ getCompany(maintenance.car.compagny).name }}</span
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
    <div class="flex">
      <ul class="ml-auto px-2 pt-16 space-y-1">
        <li class="flex items-center space-x-2">
          <span
            class="block w-4 h-4 flex-none border bg-red-600 border-red-800 rounded-full"
          ></span>
          <span>À venir</span>
        </li>
        <li class="flex items-center space-x-2">
          <span
            class="block w-4 h-4 flex-none border bg-yellow-500 border-yellow-700 rounded-full"
          ></span>
          <span>En cours</span>
        </li>
        <li class="flex items-center space-x-2">
          <span
            class="block w-4 h-4 flex-none border bg-green-600 border-green-800 rounded-full"
          ></span>
          <span>Terminées</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Title from "../../components/Title.vue";
moment.locale("fr");

export default {
  components: {
    Title,
  },
  data() {
    return {
      title: "🔧 Interventions",
      link: "/app/maintenances",
      type: "e intervention",
      date: "all",
      technician: "default",
    };
  },
  computed: {
    maintenances() {
      let maintenances = this.$store.getters.getMaintenances;
      if (this.date == "after") {
        return maintenances
          .filter((maintenance) => {
            return new Date(maintenance.date) > new Date();
          })
          .reverse();
      }
      if (this.date == "before") {
        return maintenances.filter((maintenance) => {
          return new Date(maintenance.date) < new Date();
        });
      }
      return maintenances;
    },
    maintenancesByTechnician() {
      if (this.technician == "default") {
        return this.maintenances;
      }
      return this.maintenances.filter(
        (maintenance) => maintenance.technician == this.technician
      );
    },
    companies() {
      return this.$store.getters.getCompanies;
    },
    technicians() {
      return this.$store.getters.getUsers.filter(
        (user) => user.role.type == "technician"
      );
    },
  },
  methods: {
    compareDate(date) {
      let now = new Date();
      let maintenance = new Date(date);
      return now > maintenance;
    },
    setDate(date) {
      return moment(date).format("dddd DD MMMM - HH:mm");
    },
    async getMaintenances() {
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
          this.$store.commit("setMaintenances", data.reverse());
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    async getCompanies() {
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
          this.$store.commit("setCompanies", data.reverse());
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    async getUsers() {
      try {
        const { data } = await axios.get(this.$store.getters.getUrl("/users"), {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        });
        if (data) {
          this.$store.commit("setUsers", data.reverse());
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    getCompany(id) {
      return this.companies.find((company) => company.id == id);
    },
    getTechnician(id) {
      return this.technicians.find((user) => user.id == id);
    },
  },
  beforeMount() {
    this.getMaintenances();
    this.getCompanies();
    this.getUsers();
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
