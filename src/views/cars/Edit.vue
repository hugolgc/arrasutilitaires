<template>
  <form method="post" class="max-w-2xl mx-auto">
    <label>
      <input
        type="text"
        maxlength="255"
        placeholder="Nom du véhicule"
        class="bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Immatriculation
        </th>
        <td class="pb-1.5">
          <input
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
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
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
    </table>
    <button class="w-full bg-gray p-1.5 border border-gray rounded">
      Enregistrer
    </button>
  </form>
  <div class="fixed top-0 right-0 p-3">
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
export default {
  methods: {
    handleDelete() {
      if (confirm("Supprimer ce véhicule ?")) {
        console.log("oui");
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
        name: "BMW 6 Series",
        link: "/app/cars/edit/1",
      },
    ]);
  },
};
</script>
