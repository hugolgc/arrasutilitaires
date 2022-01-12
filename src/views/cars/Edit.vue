<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto"
  >
    <label>
      <input
        required
        v-model="car.model"
        type="text"
        maxlength="255"
        placeholder="Marque"
        class="w-full bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
      <input
        required
        v-model="car.brand"
        type="text"
        maxlength="255"
        placeholder="Modèle"
        class="w-full bg-transparent text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table class="table-auto w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Numéro de série
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.serie"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Mise en service
        </th>
        <td class="pb-1.5">
          <input
            required
            v-model="car.service"
            type="text"
            maxlength="255"
            placeholder="Saisir une date (jj/mm/aaaa)"
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
            v-model="car.numberplate"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Entreprise
        </th>
        <td class="pb-1.5">
          <router-link
            v-if="car.compagny"
            :to="'/app/companies/edit/' + car.compagny.id"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ car.compagny.name }}</span
            >
            <span
              class="text-gray-light font-medium opacity-0 group-hover:opacity-100"
              >Voir</span
            >
          </router-link>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Motorisation
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.motor"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="block text-left text-gray-light font-medium">
          <p class="mb-1.5 px-2 py-1.5">Kilométrages</p>
          <p v-show="compare.distance" class="mb-1.5 px-2 py-1.5 text-white">
            {{ compare.distance ? compare.distance.toLocaleString("fr") : "" }}
            km en {{ compare.time }} jour{{ compare.time > 1 ? "s" : "" }}
          </p>
        </th>
        <td>
          <p
            v-for="mileage in car.mileages"
            :key="mileage.id"
            :class="
              compare.mileages.includes(mileage) ? 'bg-gray-dark shadow-xl' : ''
            "
            @click="compareMileages(mileage)"
            class="flex justify-between mb-1.5 px-2 py-1.5 rounded cursor-pointer hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ mileage.kilometers.toLocaleString("fr") }} km</span
            >
            <span class="text-gray-light font-medium">{{
              setDate(mileage.date)
            }}</span>
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à carburant
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.fuel"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à huile
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.oil"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à air
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.air"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Filtre à habitacle
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.lodge"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins avant
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.brakePads"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins arrière
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.brakePadsAr"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques de frein avant
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.brakeDiscs"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques de frein arrière
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.brakeDiscsAr"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Interventions (0)
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.serie"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Observation
        </th>
        <td class="pb-1.5">
          <input
            v-model="car.observation"
            type="text"
            maxlength="255"
            placeholder="Saisir du texte"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
    </table>
    <button
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
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      car: {},
      load: false,
      compare: {
        mileages: [],
        time: null,
        distance: null,
      },
    };
  },
  methods: {
    compareMileages(mileage) {
      if (this.compare.mileages.length > 1) {
        this.compare.mileages = [];
        this.compare.time = null;
        this.compare.distance = null;
      }
      if (!this.compare.mileages.includes(mileage)) {
        this.compare.mileages.push(mileage);
      }
      if (this.compare.mileages.length == 2) {
        this.compare.time = Math.abs(
          moment(this.compare.mileages[0].date).diff(
            moment(this.compare.mileages[1].date),
            "days"
          )
        );
        this.compare.distance = Math.abs(
          this.compare.mileages[0].kilometers -
            this.compare.mileages[1].kilometers
        );
      }
    },
    setLoad() {
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 3000);
    },
    setDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    async handleSubmit() {
      this.car.service = moment(this.car.service, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      this.car.mileages.forEach((mileage) => {
        mileage.date = moment(mileage.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      });
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/cars/${this.car.id}`),
          this.car,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.car = data;
          this.car.service = this.setDate(this.car.service);
          this.setLoad();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async handleDelete() {
      if (confirm("Supprimer ce véhicule ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/cars/${this.car.id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) this.$router.push("/app/cars");
        } catch (error) {
          alert("Erreur durant la suppression de l'entreprise.");
        }
      }
    },
  },
  beforeMount() {
    this.car = this.$store.getters.findCar(this.$route.params.id);
    if (this.car.id) {
      this.car.service = moment(this.car.service).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🚘 Véhicules",
        link: "/app/cars",
      },
      {
        name: `${this.car.model} ${this.car.brand}`,
        link: `/app/cars/edit/${this.car.id}`,
      },
    ]);
  },
};
</script>
