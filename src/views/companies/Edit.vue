<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto px-6 sm:px-0"
  >
    <label>
      <input
        required
        v-model="company.name"
        type="text"
        maxlength="255"
        placeholder="Nom de l'entreprise"
        class="w-full bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Adresse
        </th>
        <td class="pb-1.5">
          <input
            v-model="company.adress"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Détail
        </th>
        <td class="pb-1.5">
          <input
            v-model="company.detail"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="flex px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Véhicules ({{ company.cars.length }})
        </th>
        <td class="pb-1.5">
          <router-link
            v-for="car in company.cars"
            :key="car.id"
            :to="'/app/cars/edit/' + car.id"
            class="group flex justify-between mb-1.5 px-2 py-1.5 rounded hover:bg-gray"
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
    </table>
    <button
      v-if="
        $store.getters.getUser.role.type == 'super_admin' ||
        $store.getters.getUser.role.type == 'authenticated'
      "
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      company: null,
      load: false,
    };
  },
  methods: {
    setLoad() {
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 3000);
    },
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/compagnies/${this.company.id}`),
          this.company,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.company = data;
          this.setLoad();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async handleDelete() {
      if (confirm("Supprimer cette entreprise ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/compagnies/${this.company.id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) this.$router.push("/app/companies");
        } catch (error) {
          alert("Erreur durant la suppression de l'entreprise.");
        }
      }
    },
  },
  beforeMount() {
    this.company = this.$store.getters.findCompany(this.$route.params.id);
  },
  beforeUpdate() {
    this.$store.commit("setHeader", [
      {
        name: "🏗 Entreprises",
        link: "/app/companies",
      },
      {
        name: this.company.name,
        link: `/app/companies/edit/${this.company.id}`,
      },
    ]);
  },
  watch: {
    $route() {
      this.company = this.$store.getters.findCompany(this.$route.params.id);
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🏗 Entreprises",
        link: "/app/companies",
      },
      {
        name: this.company.name,
        link: `/app/companies/edit/${this.company.id}`,
      },
    ]);
  },
};
</script>
