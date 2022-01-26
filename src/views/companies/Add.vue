<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto px-6 sm:px-0"
  >
    <label>
      <input
        required
        v-model="name"
        type="text"
        maxlength="255"
        placeholder="Nom de l'entreprise"
        class="w-full bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto sm:table-fixed w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Adresse
        </th>
        <td class="pb-1.5">
          <input
            v-model="adress"
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
            v-model="detail"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
    </table>
    <button
      type="submit"
      class="w-full bg-gray p-1.5 border border-gray rounded"
    >
      Ajouter
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      adress: "",
      detail: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl(`/compagnies`),
          this.$data,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$store.commit("addCompany", data);
          this.$router.push(`/app/companies/edit/${data.id}`);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🏗 Entreprises",
        link: "/app/companies",
      },
      {
        name: "Ajouter une entreprise",
        link: "/app/companies/add",
      },
    ]);
  },
};
</script>
