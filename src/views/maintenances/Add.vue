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
    <button
      type="submit"
      class="w-full mt-6 bg-gray p-1.5 border border-gray rounded"
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
      date: this.$route.params.date
        ? moment(this.$route.params.date).format("DD/MM/YYYY")
        : "",
      time: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      let setup = moment(
        `${this.date} ${this.time}`,
        "DD/MM/YYYY HH:mm"
      ).format();
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl(`/maintenances`),
          { date: setup },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$store.commit("addMaintenance", data);
          this.$router.push(`/app/maintenances/edit/${data.id}`);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🔧 Interventions",
        link: "/app/maintenances",
      },
      {
        name: "Ajouter une intervention",
        link:
          "/app/maintenances/add/" +
          (this.$route.params.date ? this.$route.params.date : ""),
      },
    ]);
  },
};
</script>
