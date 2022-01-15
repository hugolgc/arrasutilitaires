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
          <div
            v-if="car.compagny"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              @click="$router.push('/app/companies/edit/' + car.compagny.id)"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{ car.compagny.name }}</span
            >
            <div class="space-x-3">
              <span
                @click="$router.push('/app/companies/edit/' + car.compagny.id)"
                class="text-gray-light font-medium opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</span
              >
              <span
                v-if="
                  $store.getters.getUser.role.type == 'super_admin' ||
                  $store.getters.getUser.role.type == 'authenticated'
                "
                @click="associateCompany = true"
                class="text-gray-light font-medium opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else-if="
              $store.getters.getUser.role.type == 'super_admin' ||
              $store.getters.getUser.role.type == 'authenticated'
            "
            @click="associateCompany = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Conducteur
        </th>
        <td class="pb-1.5">
          <div
            v-if="car.driver"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <span
              @click="$router.push('/app/drivers/edit/' + car.driver.id)"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{ car.driver.name }}</span
            >
            <div class="space-x-3">
              <span
                @click="$router.push('/app/drivers/edit/' + car.driver.id)"
                class="text-gray-light font-medium opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</span
              >
              <span
                v-if="
                  $store.getters.getUser.role.type == 'super_admin' ||
                  $store.getters.getUser.role.type == 'authenticated'
                "
                @click="associateCar = true"
                class="text-gray-light font-medium opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else-if="
              $store.getters.getUser.role.type == 'super_admin' ||
              $store.getters.getUser.role.type == 'authenticated'
            "
            @click="associateCar = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="block text-left text-gray-light font-medium">
          <p class="flex items-center mb-1.5 px-2 py-1.5 space-x-2">
            <span>Kilométrages</span>
            <span
              v-if="
                !mileage.show &&
                ($store.getters.getUser.role.type == 'super_admin' ||
                  $store.getters.getUser.role.type == 'authenticated')
              "
              @click="mileage.show = true"
              class="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p v-show="compare.distance" class="mb-1.5 px-2 py-1.5 text-white">
            {{ compare.distance ? compare.distance.toLocaleString("fr") : "" }}
            km en {{ compare.time }} jour{{ compare.time > 1 ? "s" : "" }}
          </p>
        </th>
        <td>
          <p v-show="mileage.show" class="flex mb-1.5 px-2 py-1.5">
            <input
              v-model="mileage.distance"
              type="text"
              placeholder="Distance (km)"
              maxlength="255"
              class="w-full bg-transparent placeholder:text-gray-light outline-none"
            />
            <input
              v-model="mileage.date"
              type="text"
              placeholder="Date (jj/mm/aaaa)"
              maxlength="255"
              class="w-full bg-transparent placeholder:text-gray-light outline-none"
            />
            <span
              @click="handleMileage()"
              class="flex-none text-gray-light cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </p>
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
        <th class="block text-left text-gray-light font-medium">
          <p class="flex items-center mb-1.5 px-2 py-1.5 space-x-2">
            <span>Interventions ({{ car.maintenances.length }})</span>
            <span
              v-if="
                !maintenance.show &&
                ($store.getters.getUser.role.type == 'super_admin' ||
                  $store.getters.getUser.role.type == 'authenticated')
              "
              @click="maintenance.show = true"
              class="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </p>
        </th>
        <td>
          <p v-show="maintenance.show" class="flex mb-1.5 px-2 py-1.5">
            <input
              v-model="maintenance.date"
              type="text"
              placeholder="Date (jj/mm/aaaa)"
              maxlength="255"
              class="w-full bg-transparent placeholder:text-gray-light outline-none"
            />
            <span
              @click="handleMaintenance()"
              class="flex-none text-gray-light cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </p>
          <router-link
            :to="`/app/cars/edit/${car.id}/maintenance/${maintenance.id}`"
            v-for="maintenance in car.maintenances"
            :key="maintenance.id"
            class="flex justify-between mb-1.5 px-2 py-1.5 rounded cursor-pointer hover:bg-gray"
          >
            <span
              class="font-medium underline underline-offset-2 decoration-white/30"
              >{{ setDate(maintenance.date) }}</span
            >
            <span class="text-gray-light font-medium">{{
              setDate(maintenance.date)
            }}</span>
          </router-link>
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
    <div class="pb-6 grid grid-cols-4 gap-6">
      <img
        v-for="file in car.files"
        :key="file.id"
        @click="image = file"
        :src="$store.getters.getUrl(file.url)"
        class="h-24 w-full rounded object-cover cursor-pointer"
      />
      <div
        v-if="
          $store.getters.getUser.role.type == 'super_admin' ||
          $store.getters.getUser.role.type == 'authenticated'
        "
        @click="setFile()"
        class="h-24 flex justify-center items-center rounded bg-gray text-gray-light hover:text-white cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
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
  <input
    @change="addFile()"
    id="upload"
    ref="file"
    type="file"
    accept="image/*"
    hidden
  />
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
  <div
    v-if="image"
    class="z-20 fixed top-0 left-0 bottom-0 right-0 flex justify-center bg-black/75"
  >
    <div class="px-12 py-24">
      <img
        @click="image = false"
        :src="$store.getters.getUrl(image.url)"
        :style="{ maxHeight: '100%', maxWidth: '100%' }"
        class="rounded cursor-pointer"
      />
      <p
        v-if="$store.getters.getUser.role.type == 'super_admin'"
        @click="deleteFile(image.id)"
        class="py-6 text-center font-medium cursor-pointer"
      >
        Supprimer
      </p>
    </div>
  </div>
  <Associate
    :list="drivers"
    :id="car.id"
    type="cars"
    fieldChange="driver"
    searchField="name"
    placeholder="Nom du conducteur"
    v-if="associateCar"
    @emit="setAssociate"
  />
  <Associate
    :list="companies"
    :id="car.id"
    type="cars"
    fieldChange="compagny"
    searchField="name"
    placeholder="Nom de l'entreprise"
    v-if="associateCompany"
    @emit="setAssociate"
  />
  <router-view />
</template>

<script>
import axios from "axios";
import moment from "moment";
import Associate from "../../components/Associate.vue";

export default {
  components: {
    Associate,
  },
  data() {
    return {
      associateCar: false,
      associateCompany: false,
      mileage: {
        show: false,
        date: "",
        distance: "",
      },
      maintenance: {
        show: false,
        date: "",
        distance: "",
      },
      car: {},
      load: false,
      image: false,
      compare: {
        mileages: [],
        time: null,
        distance: null,
      },
    };
  },
  computed: {
    drivers() {
      return this.$store.getters.getDrivers;
    },
    companies() {
      return this.$store.getters.getCompanies;
    },
  },
  methods: {
    async deleteFile(id) {
      if (this.$store.getters.getUser.role.type != "super_admin") return;
      try {
        const { data } = await axios.delete(
          this.$store.getters.getUrl(`/upload/files/${id}`),
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.image = false;
          this.car.files = this.car.files.filter((file) => file.id != id);
        }
      } catch (error) {
        alert("Erreur durant la la modification des données.");
      }
    },
    setFile() {
      document.getElementById("upload").click();
    },
    async addFile() {
      let form = new FormData();
      form.append("files", document.getElementById("upload").files[0]);
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl("/upload"),
          form,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.car.files.push(data[0]);
          this.handleSubmit();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    setAssociate(show) {
      this.associateCar = show;
      this.associateCompany = show;
      this.setLoad();
    },
    getCar() {
      this.car = this.$store.getters.findCar(this.$route.params.id);
      if (this.car.id) {
        this.car.service = this.setDate(this.car.service);
        this.car.mileages.forEach((mileage) => {
          mileage.date = this.setDate(mileage.date);
        });
        console.log(this.car);
      }
    },
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
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
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
    async handleMileage() {
      if (this.mileage.date.length && this.mileage.distance.length) {
        this.mileage.date = moment(this.mileage.date, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        try {
          const { data } = await axios.post(
            this.$store.getters.getUrl(`/mileages`),
            {
              car: this.car.id,
              date: this.mileage.date,
              kilometers: this.mileage.distance,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) {
            this.car.mileages.push(data);
            this.mileage.date = "";
            this.mileage.distance = "";
          }
        } catch (error) {
          alert("Erreur durant l'envoie des données.");
        }
      }
    },
    async handleMaintenance() {
      if (this.maintenance.date.length) {
        try {
          const { data } = await axios.post(
            this.$store.getters.getUrl("/maintenances"),
            {
              date: moment(this.maintenance.date, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
              car: this.car.id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) {
            this.car.maintenances.push(data);
            this.maintenance.date = "";
          }
        } catch (error) {
          alert("Erreur durant l'envoie des données.");
        }
      }
    },
  },
  beforeMount() {
    this.getCar();
  },
  beforeUpdate() {
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
  watch: {
    $route() {
      this.getCar();
    },
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
    document.addEventListener("appSetup", () => this.getCar());
  },
};
</script>
