<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="w-full max-w-xs m-auto"
  >
    <h1 class="mb-6 text-4xl sm:text-5xl text-center font-bold">Connexion</h1>
    <label>
      <span class="block text-gray-light text-sm font-light">Email</span>
      <input
        v-model="identifier"
        required
        type="email"
        maxlength="255"
        class="w-full mt-1 mb-2 px-2 py-1.5 bg-gray-dark border border-gray rounded outline-none"
      />
    </label>
    <label>
      <span class="block text-gray-light text-sm font-light">Mot de passe</span>
      <input
        v-model="password"
        required
        type="password"
        maxlength="255"
        class="w-full mt-1 mb-2 px-2 py-1.5 bg-gray-dark border border-gray rounded outline-none"
      />
    </label>
    <button
      type="submit"
      class="block w-full mt-2 bg-gray p-1.5 border border-gray rounded outline-none"
    >
      Continuer
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      identifier: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl("/auth/local"),
          {
            identifier: this.identifier,
            password: this.password,
          }
        );
        if (data) {
          localStorage.setItem("token", data.jwt);
          this.$store.commit("setToken", data.jwt);
          this.$store.commit("setUser", data.user);
          this.redirectApp();
        }
      } catch (error) {
        alert("Ces identifiants ne correspondent pas.");
        // alert(error);
      }
    },
    redirectApp() {
      this.$router.push("/app/companies");
    },
  },
  async beforeMount() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { data } = await axios.get(
          this.$store.getters.getUrl("/users/me"),
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data) {
          this.$store.commit("setToken", token);
          this.$store.commit("setUser", data);
          this.redirectApp();
        }
      } catch (error) {
        // alert(error);
        localStorage.clear();
      }
    }
  },
};
</script>
