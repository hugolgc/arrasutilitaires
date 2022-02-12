<template>
  <aside
    :class="
      $store.getters.getAside
        ? 'translate-x-0'
        : 'translate-x-negative lg:translate-x-0'
    "
    class="h-screen overflow-y-auto z-10 fixed lg:static top-0 left-0 bottom-0 w-60 flex flex-col flex-none bg-gray-dark shadow-2xl lg:shadow-none font-bold"
  >
    <div class="flex items-center px-4 py-3">
      <span
        @click="$store.commit('setAside', !$store.getters.getAside)"
        class="block lg:hidden mr-2 cursor-pointer opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <span
        class="w-5 h-5 flex justify-center items-center mr-2 rounded bg-white/40 text-gray-dark uppercase"
        >{{ user.username.charAt(0) }}</span
      >
      <span>{{ user.username }}</span>
    </div>
    <nav class="text-white/60">
      <p
        @click="setSearch(true)"
        class="flex items-center px-4 py-1 space-x-2 cursor-pointer hover:bg-gray"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span>Trouver</span>
      </p>
      <p class="flex items-center px-4 py-1 space-x-2 hover:bg-gray">
        <span>
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
        <span>Réglages</span>
      </p>
      <p
        @click="logout()"
        class="flex items-center px-4 py-1 space-x-2 cursor-pointer hover:bg-gray"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span>Déconnexion</span>
      </p>
    </nav>
    <ul class="pt-5 text-white/60">
      <li>
        <router-link
          to="/app/companies"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">🏗</span>
            <strong>Entreprises</strong>
          </p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/cars"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">🚘</span>
            <strong>Véhicules</strong>
          </p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/maintenances"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">🔧</span>
            <strong>Interventions</strong>
          </p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/drivers"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">👷</span>
            <strong>Conducteurs</strong>
          </p>
        </router-link>
      </li>
      <li v-if="$store.getters.getUser.role.type == 'super_admin'">
        <router-link
          to="/app/users"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">👨‍💼</span>
            <strong>Utilisateurs</strong>
          </p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/providers"
          class="flex items-center px-4 py-1 space-x-2 hover:bg-gray"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="space-x-2">
            <span class="text-white">🚚</span>
            <strong>Fournisseurs</strong>
          </p>
        </router-link>
      </li>
    </ul>
    <figure class="mt-auto p-6">
      <img
        src="../assets/logo.png"
        alt="Logo Atelier Utilitaires"
        class=""
      />
    </figure>
  </aside>
  <Search :show="search" @emit="setSearch" />
</template>

<script>
import Search from "../components/Search.vue";

export default {
  name: "Aside",
  components: {
    Search,
  },
  data() {
    return {
      search: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    setSearch(show) {
      this.search = show;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
aside a strong {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
}

aside a.router-link-exact-active {
  background-color: #4b5053;
}

aside a.router-link-exact-active strong {
  color: white;
}
</style>
