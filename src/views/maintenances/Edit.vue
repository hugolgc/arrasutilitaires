<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto px-6 sm:px-0"
  >
    <label>
      <input
        required
        v-model="date"
        type="text"
        maxlength="255"
        placeholder="Date (jj/mm/aaaa)"
        class="w-full bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
      <input
        required
        v-model="time"
        type="text"
        maxlength="255"
        placeholder="Heure (hh:mm)"
        class="w-full bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Technicien
        </th>
        <td class="pb-1.5">
          <div
            v-if="maintenance.technician"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              @click="$router.push('/app/users/edit/' + maintenance.technician)"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{
                $store.getters.findUser(maintenance.technician).username
              }}</span
            >
            <div class="space-x-3">
              <span
                @click="
                  $router.push('/app/users/edit/' + maintenance.technician)
                "
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</span
              >
              <span
                @click="associateTechnician = true"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else
            @click="associateTechnician = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Véhicule
        </th>
        <td class="pb-1.5">
          <div
            v-if="maintenance.car"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              @click="$router.push('/app/cars/edit/' + maintenance.car.id)"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{ maintenance.car.brand }} {{ maintenance.car.model }}</span
            >
            <div class="space-x-3">
              <span
                @click="$router.push('/app/cars/edit/' + maintenance.car.id)"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</span
              >
              <span
                @click="associateCar = true"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else
            @click="associateCar = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          État
        </th>
        <td class="pb-1.5">
          <label
            class="flex justify-between items-center px-2 py-1.5 rounded hover:bg-gray"
          >
            <select
              v-model="maintenance.state"
              class="w-full bg-transparent outline-none appearance-none cursor-pointer"
            >
              <option value="true">Terminée</option>
              <option value="false">À faire</option>
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
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Temps d'intervention
        </th>
        <td class="px-2 pt-1.5 pb-3">
          {{
            maintenance.end ? getDiff(maintenance.date, maintenance.end) : ""
          }}
        </td>
      </tr>
    </table>
    <button
      type="submit"
      class="w-full bg-gray p-1.5 border border-gray rounded"
    >
      Enregistrer
    </button>
    <p
      :class="load ? 'opacity-100' : 'opacity-0'"
      class="mt-4 text-center text-gray-light animate-bounce duration-200"
    >
      Modifications enregistrées !
    </p>
  </form>
  <div
    v-if="this.$store.getters.getUser.role.type == 'super_admin'"
    class="fixed top-0 right-0 p-3"
  >
    <button
      @click="handleDelete()"
      class="p-1.5 text-gray-light rounded hover:bg-gray"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
  <Associate
    :list="cars"
    :id="maintenance.id"
    type="maintenances"
    fieldChange="car"
    searchField="numberplate"
    placeholder="Immatriculation"
    v-if="associateCar"
    @emit="setAssociate"
  />
  <Associate
    :list="technicians"
    :id="maintenance.id"
    type="maintenances"
    fieldChange="technician"
    searchField="username"
    placeholder="Nom du technicien"
    v-if="associateTechnician"
    @emit="setAssociate"
  />
</template>

<script>
import axios from "axios";
import moment from "moment";
import Associate from "../../components/Associate.vue";

export default {
  components: {
    Associate,
  },
  data() {
    return {
      date: null,
      time: null,
      maintenance: null,
      load: false,
      associateTechnician: false,
      associateCar: false,
    };
  },
  computed: {
    cars() {
      return this.$store.getters.getCars;
    },
    technicians() {
      return this.$store.getters.getUsers.filter(
        (user) => user.role.type == "technician"
      );
    },
  },
  methods: {
    async getCars() {
      try {
        const { data } = await axios.get(this.$store.getters.getUrl("/cars"), {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        });
        if (data) {
          this.$store.commit("setCars", data.reverse());
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
    setLoad() {
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 3000);
    },
    twoDigits(n) {
      return n > 9 ? n : `0${n}`;
    },
    getDiff(a, b) {
      let hours = Math.abs(moment(a).diff(moment(b), "hours"));
      let minutes = Math.abs(moment(a).diff(moment(b), "minutes")) - hours * 60;
      return `${this.twoDigits(hours)}:${this.twoDigits(minutes)}`;
    },
    setAssociate(show) {
      this.associateCar = show;
      this.associateTechnician = show;
      this.setLoad();
    },
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      if (!this.date.length || this.time.length) {
        this.maintenance.date = moment(
          `${this.date} ${this.time}`,
          "DD/MM/YYYY HH:mm"
        ).format();
        try {
          const { data } = await axios.put(
            this.$store.getters.getUrl(`/maintenances/${this.maintenance.id}`),
            this.maintenance,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) {
            this.maintenance = data;
            this.date = moment(this.maintenance.date).format("DD/MM/YYYY");
            this.time = moment(this.maintenance.date).format("HH:mm");
            this.setLoad();
          }
        } catch (error) {
          alert("Erreur durant l'envoie des données.");
        }
      }
    },
    async handleDelete() {
      if (confirm("Supprimer cette intervention ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/maintenances/${this.maintenance.id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) this.$router.push("/app/maintenances");
        } catch (error) {
          alert("Erreur durant la suppression de l'intervention.");
        }
      }
    },
    init() {
      this.maintenance = this.$store.getters.findMaintenance(
        this.$route.params.id
      );
      if (this.maintenance) {
        this.date = moment(this.maintenance.date).format("DD/MM/YYYY");
        this.time = moment(this.maintenance.date).format("HH:mm");
      }
      this.getCars();
      this.getUsers();
    },
  },
  beforeMount() {
    this.init();
  },
  beforeUpdate() {
    this.$store.commit("setHeader", [
      {
        name: "🔧 Interventions",
        link: "/app/maintenances",
      },
      {
        name: `${this.maintenance.car.brand} ${this.maintenance.car.model}`,
        link: `/app/maintenances/edit/${this.maintenance.id}`,
      },
    ]);
  },
  watch: {
    $route() {
      this.init();
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🔧 Interventions",
        link: "/app/maintenances",
      },
      {
        name: `${this.maintenance.car.brand} ${this.maintenance.car.model}`,
        link: `/app/maintenances/edit/${this.maintenance.id}`,
      },
    ]);
    document.addEventListener("appSetup", () => this.init());
  },
};
</script>
