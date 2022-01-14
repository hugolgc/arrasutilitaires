<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto"
  >
    <label>
      <input
        required
        v-model="model"
        type="text"
        maxlength="255"
        placeholder="Marque"
        class="w-full bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
      <input
        required
        v-model="brand"
        type="text"
        maxlength="255"
        placeholder="Modèle"
        class="w-full bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Numéro de série
        </th>
        <td class="pb-1.5">
          <input
            v-model="serie"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Mise en service
        </th>
        <td class="pb-1.5">
          <input
            required
            v-model="service"
            type="text"
            maxlength="255"
            placeholder="Saisir une date (jj/mm/aaaa)"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Immatriculation
        </th>
        <td class="pb-1.5">
          <input
            v-model="numberplate"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Motorisation
        </th>
        <td class="pb-1.5">
          <input
            v-model="motor"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à carburant
        </th>
        <td class="pb-1.5">
          <input
            v-model="fuel"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à huile
        </th>
        <td class="pb-1.5">
          <input
            v-model="oil"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à air
        </th>
        <td class="pb-1.5">
          <input
            v-model="air"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à habitacle
        </th>
        <td class="pb-1.5">
          <input
            v-model="lodge"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins avant
        </th>
        <td class="pb-1.5">
          <input
            v-model="brakePads"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins arrière
        </th>
        <td class="pb-1.5">
          <input
            v-model="brakePadsAr"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques de frein avant
        </th>
        <td class="pb-1.5">
          <input
            v-model="brakeDiscs"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques de frein arrière
        </th>
        <td class="pb-1.5">
          <input
            v-model="brakeDiscsAr"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Observation
        </th>
        <td class="pb-1.5">
          <input
            v-model="observation"
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
import moment from "moment";

export default {
  data() {
    return {
      model: "",
      brand: "",
      serie: "",
      service: "",
      motor: "",
      brakePads: "",
      brakePadsAr: "",
      oil: "",
      air: "",
      fuel: "",
      lodge: "",
      brakeDiscs: "",
      brakeDiscsAr: "",
      observation: "",
      numberplate: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (
        this.$store.getters.getUser.role.type != "super_admin" ||
        this.$store.getters.getUser.role.type != "authenticated"
      ) {
        return;
      }
      this.service = moment(this.service, "DD/MM/YYYY").format("YYYY-MM-DD");
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl(`/cars`),
          this.$data,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$store.commit("addCar", data);
          this.$router.push(`/app/cars/edit/${data.id}`);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🚘 Véhicules",
        link: "/app/cars",
      },
      {
        name: "Ajouter un véhicule",
        link: "/app/cars/add",
      },
    ]);
  },
};
</script>
