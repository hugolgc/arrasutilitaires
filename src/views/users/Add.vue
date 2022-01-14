<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto"
  >
    <label>
      <input
        v-model="username"
        required
        type="text"
        maxlength="255"
        placeholder="Nom de l'utilisateur"
        class="w-full bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Email
        </th>
        <td class="pb-1.5">
          <input
            v-model="email"
            required
            type="email"
            maxlength="255"
            placeholder="Saisir du text"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Mot de passe
        </th>
        <td class="pb-1.5">
          <input
            v-model="password"
            required
            type="text"
            maxlength="255"
            placeholder="Saisir du text"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Type
        </th>
        <td class="pb-1.5">
          <label
            class="flex justify-between items-center px-2 py-1.5 rounded hover:bg-gray"
          >
            <select
              v-model="role"
              class="w-full bg-transparent outline-none appearance-none cursor-pointer"
            >
              <option value="4" selected>Commercial</option>
              <option value="1">Éditeur</option>
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
      username: "",
      email: "",
      password: "",
      role: "4",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      if (
        this.$store.getters.getUsers.filter((user) => user.email == this.email)
          .length ||
        this.$store.getters.getUsers.filter(
          (user) => user.username == this.username
        ).length
      ) {
        alert("Le nom ou l'adresse e-mail sont déjà utilisés.");
        return;
      }
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl(`/users`),
          this.$data,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$store.commit("addUser", data);
          this.$router.push(`/app/users/edit/${data.id}`);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "👨‍💼 Utilisateurs",
        link: "/app/users",
      },
      {
        name: "Ajouter un utilisateur",
        link: "/app/users/add",
      },
    ]);
  },
};
</script>
