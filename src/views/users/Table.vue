<template>
  <Title :title="title" :link="link" :type="type" />
  <table
    class="table-auto w-full border-t border-b border-gray divide-y divide-gray"
  >
    <thead class="text-left text-gray-light">
      <tr class="divide-x divide-gray">
        <th class="px-2 py-1.5 font-normal">Nom</th>
        <th class="px-2 py-1.5 font-normal">Type</th>
        <th class="px-2 py-1.5 font-normal">Email</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray">
      <tr v-for="user in users" :key="user.id" class="divide-x divide-gray">
        <td>
          <p v-if="user.role.type == 'super_admin'" class="px-2 py-1.5">
            {{ user.username }}
          </p>
          <router-link
            v-else
            :to="'/app/users/edit/' + user.id"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ user.username }}</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
        <td class="px-2 py-1.5 select-all">{{ getRole(user.role.type) }}</td>
        <td class="px-2 py-1.5 select-all">{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import Title from "../../components/Title.vue";

export default {
  components: {
    Title,
  },
  data() {
    return {
      title: "👨‍💼 Utilisateurs",
      link: "/app/users",
      type: "utilisateur",
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    getRole(type) {
      if (type == "super_admin") return "Administrateur";
      if (type == "authenticated") return "Éditeur";
      if (type == "customer") return "Commercial";
      return "";
    },
  },
  async beforeMount() {
    try {
      const { data } = await axios.get(this.$store.getters.getUrl("/users"), {
        headers: { Authorization: `Bearer ${this.$store.getters.getToken}` },
      });
      if (data) {
        this.$store.commit("setUsers", data.reverse());
        console.log(data);
      }
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
    }
  },
  async mounted() {
    this.$store.commit("setHeader", [
      {
        name: this.title,
        link: this.link,
      },
    ]);
  },
};
</script>
