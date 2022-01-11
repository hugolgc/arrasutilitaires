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
      Ajouter
    </button>
  </form>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state);
    this.$store.commit("setHeader", [
      {
        name: "🚘 Véhicules",
        link: "/app/cars",
      },
      {
        name: "Nouveau véhicule",
        link: "/app/cars/add",
      },
    ]);
  },
};
</script>
