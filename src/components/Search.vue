<template>
  <div
    id="search"
    v-show="show"
    class="z-20 fixed top-0 left-0 bottom-0 right-0 flex justify-center bg-black/75"
  >
    <div id="background" class="w-full max-w-xl py-12 sm:py-24 px-6 sm:px-0">
      <div class="bg-gray-dark rounded overflow-hidden">
        <label
          class="relative flex items-center px-4 space-x-2.5 text-gray-light cursor-pointer"
        >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="search"
            id="input"
            autofocus
            type="text"
            maxlength="255"
            placeholder="Trouver..."
            class="h-12 w-full bg-transparent text-lg placeholder:text-gray-light outline-none"
          />
        </label>

        <div
          v-show="companies.length && search.length > 1"
          class="border-t border-gray"
        >
          <p
            class="px-3 py-2 text-xs text-gray-light font-medium tracking-wide"
          >
            ENTREPRISES
          </p>
          <ul class="pb-2">
            <li v-for="company in companies" :key="company.id">
              <router-link
                @click="$emit('emit', false)"
                :to="'/app/companies/edit/' + company.id"
                class="group flex justify-between items-center px-3 py-2 hover:bg-gray"
              >
                <p>
                  <span>🏗</span>
                  <strong class="pl-2.5 pr-1.5 font-medium">{{
                    company.name
                  }}</strong>
                  <span
                    class="text-xs text-gray-light font-medium tracking-wide"
                    >— Entreprise</span
                  >
                </p>
                <p class="group-hover:opacity-100 opacity-0 text-gray-light">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </p>
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-show="cars.length && search.length > 1"
          class="border-t border-gray"
        >
          <p
            class="px-3 py-2 text-xs text-gray-light font-medium tracking-wide"
          >
            VÉHICULES
          </p>
          <ul class="pb-2">
            <li v-for="car in cars" :key="car.id">
              <router-link
                @click="$emit('emit', false)"
                :to="'/app/cars/edit/' + car.id"
                class="group flex justify-between items-center px-3 py-2 hover:bg-gray"
              >
                <p>
                  <span>🚘</span>
                  <strong class="pl-2.5 pr-1.5 font-medium"
                    >{{ car.model }} {{ car.brand }}</strong
                  >
                  <span
                    class="text-xs text-gray-light font-medium tracking-wide"
                    >{{ car.numberplate }} — Véhicule</span
                  >
                </p>
                <p class="group-hover:opacity-100 opacity-0 text-gray-light">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </p>
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-show="drivers.length && search.length > 1"
          class="border-t border-gray"
        >
          <p
            class="px-3 py-2 text-xs text-gray-light font-medium tracking-wide"
          >
            CONDUCTEURS
          </p>
          <ul class="pb-2">
            <li v-for="driver in drivers" :key="driver.id">
              <router-link
                @click="$emit('emit', false)"
                :to="'/app/drivers/edit/' + driver.id"
                class="group flex justify-between items-center px-3 py-2 hover:bg-gray"
              >
                <p>
                  <span>👷</span>
                  <strong class="pl-2.5 pr-1.5 font-medium">{{
                    driver.name
                  }}</strong>
                  <span
                    class="text-xs text-gray-light font-medium tracking-wide"
                    >— Conducteur</span
                  >
                </p>
                <p class="group-hover:opacity-100 opacity-0 text-gray-light">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </p>
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-show="users.length && search.length > 1"
          class="border-t border-gray"
        >
          <p
            class="px-3 py-2 text-xs text-gray-light font-medium tracking-wide"
          >
            UTILISATEUR
          </p>
          <ul class="pb-2">
            <li v-for="user in users" :key="user.id">
              <router-link
                @click="$emit('emit', false)"
                :to="'/app/users/edit/' + user.id"
                class="group flex justify-between items-center px-3 py-2 hover:bg-gray"
              >
                <p>
                  <span>👨‍💼</span>
                  <strong class="pl-2.5 pr-1.5 font-medium">{{
                    user.username
                  }}</strong>
                  <span
                    class="text-xs text-gray-light font-medium tracking-wide"
                    >— Utilisateur</span
                  >
                </p>
                <p class="group-hover:opacity-100 opacity-0 text-gray-light">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </p>
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-show="maintenances.length && search.length > 1"
          class="border-t border-gray"
        >
          <p
            class="px-3 py-2 text-xs text-gray-light font-medium tracking-wide"
          >
            INTERVENTIONS
          </p>
          <ul class="pb-2">
            <li v-for="maintenance in maintenances" :key="maintenance.id">
              <router-link
                @click="$emit('emit', false)"
                :to="'/app/maintenances/edit/' + maintenance.id"
                class="group flex justify-between items-center px-3 py-2 hover:bg-gray"
              >
                <p>
                  <span>🔧</span>
                  <strong class="pl-2.5 pr-1.5 font-medium">{{
                    setDate(maintenance.date)
                  }}</strong>
                  <span
                    class="text-xs text-gray-light font-medium tracking-wide"
                    >— Intervention</span
                  >
                </p>
                <p class="group-hover:opacity-100 opacity-0 text-gray-light">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </p>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- <p
          class="px-3 py-2 space-x-1.5 border-t border-gray text-xs text-gray-light tracking-wide"
        >
          <span class="px-1 py-0.5 bg-gray rounded">Alt + Espace</span>
          <span>pour Ouvrir/Fermer</span>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("fr");

export default {
  name: "Search",
  props: {
    show: Boolean,
  },
  data() {
    return {
      search: "",
      keys: [],
    };
  },
  methods: {
    setDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  computed: {
    companies() {
      return this.$store.getters.getCompanies
        .filter((company) =>
          company.name.toLowerCase().includes(this.search.toLowerCase())
        )
        .splice(0, 3);
    },
    cars() {
      let cars = this.$store.getters.getCars;
      if (cars) {
        return cars
          .filter((car) =>
            car.numberplate.toLowerCase().includes(this.search.toLowerCase())
          )
          .splice(0, 3);
      }
      return [];
    },
    drivers() {
      return this.$store.getters.getDrivers
        .filter((driver) =>
          driver.name.toLowerCase().includes(this.search.toLowerCase())
        )
        .splice(0, 3);
    },
    users() {
      return this.$store.getters.getUsers
        .filter((user) =>
          user.username.toLowerCase().includes(this.search.toLowerCase())
        )
        .splice(0, 3);
    },
    maintenances() {
      return this.$store.getters.getMaintenances
        .filter((maintenance) =>
          this.setDate(maintenance.date).includes(this.search)
        )
        .splice(0, 3);
    },
  },
  mounted() {
    document.querySelector("#search").addEventListener("click", (e) => {
      if (
        e.target == document.querySelector("#search") ||
        e.target == document.querySelector("#background")
      )
        this.$emit("emit", false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.code == "Space") this.keys.push("space");
      if (e.key == "Alt") this.keys.push("alt");
      if (this.keys.includes("space") && this.keys.includes("alt")) {
        this.keys = [];
        this.$emit("emit", !this.show);
      }
    });
    document.addEventListener("keyup", () => {
      this.keys = [];
    });
  },
};
</script>
