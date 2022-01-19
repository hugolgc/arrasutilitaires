<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto px-6 sm:px-0"
  >
    <label>
      <input
        v-model="user.username"
        required
        type="text"
        maxlength="255"
        placeholder="Nom du conducteur"
        class="w-full bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Email
        </th>
        <td class="pb-1.5">
          <input
            v-model="user.email"
            required
            type="email"
            maxlength="255"
            placeholder="Saisir du texte"
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
            type="text"
            maxlength="255"
            placeholder="Écrire pour changer"
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
              v-model="user.role.type"
              class="w-full bg-transparent outline-none appearance-none cursor-pointer"
            >
              <option value="technician">Technicien</option>
              <option value="customer">Commercial</option>
              <option value="authenticated">Éditeur</option>
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
      user: null,
      password: "",
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
      if (this.password.length) {
        this.user.password = this.password;
      }
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/users/${this.user.id}`),
          this.user,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.user = data;
          this.setLoad();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async handleDelete() {
      if (confirm("Supprimer ce conducteur ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/users/${this.user.id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) this.$router.push("/app/users");
        } catch (error) {
          alert("Erreur durant la suppression de l'utilisateur.");
        }
      }
    },
  },
  beforeMount() {
    this.user = this.$store.getters.findUser(this.$route.params.id);
  },
  beforeUpdate() {
    this.$store.commit("setHeader", [
      {
        name: "👨‍💼 Utilisateurs",
        link: "/app/users",
      },
      {
        name: this.user.username,
        link: `/app/users/edit/${this.user.id}`,
      },
    ]);
  },
  watch: {
    $route() {
      this.user = this.$store.getters.findUser(this.$route.params.id);
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "👨‍💼 Utilisateurs",
        link: "/app/users",
      },
      {
        name: this.user.username,
        link: `/app/users/edit/${this.user.id}`,
      },
    ]);
  },
};
</script>
