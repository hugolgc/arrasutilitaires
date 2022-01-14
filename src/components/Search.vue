<template>
  <div
    id="search"
    v-show="show"
    class="z-20 fixed top-0 left-0 bottom-0 right-0 flex justify-center bg-black/75"
  >
    <div id="background" class="w-full max-w-xl py-24">
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

        <div v-show="companies.length" class="border-t border-gray">
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

        <div v-show="cars.length" class="border-t border-gray">
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

        <div v-show="drivers.length" class="border-t border-gray">
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

        <p
          class="px-3 py-2 space-x-1.5 border-t border-gray text-xs text-gray-light tracking-wide"
        >
          <span class="px-1 py-0.5 bg-gray rounded">Alt + Espace</span>
          <span>pour Ouvrir/Fermer</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
