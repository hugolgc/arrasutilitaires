<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="min-h-screen w-full bg-white text-black text-2xl"
  >
    <div class="relative p-8 border-b border-black text-center">
      <router-link
        to="/technician/maintenances"
        class="absolute inset-y-0 left-0 flex items-center pl-6"
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </router-link>
      <h1 v-if="maintenance && maintenance.car">
        {{ maintenance.car.model }} {{ maintenance.car.brand }}
        {{ maintenance.car.numberplate }}
      </h1>
    </div>
    <div class="flex justify-between items-center px-6 py-8">
      <p
        @click="step--"
        :class="step == 0 ? 'opacity-0' : ''"
        class="flex-none"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </p>
      <h2 class="flex-auto text-center">{{ steps[step] }}</h2>
      <p
        @click="step++"
        :class="step == 5 ? 'opacity-0' : ''"
        class="flex-none"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </p>
    </div>
    <table
      v-if="maintenance"
      class="table-auto w-full border-t border-b border-black"
    >
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">Niveau d'huile moteur</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.engine_oil_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.engine_oil_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">
          Niveau d'huile de boite et pont
        </th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.gearbox_oil_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.gearbox_oil_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">
          Niveau du liquide de refroidissement
        </th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.coolant_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.coolant_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">Niveau du liquide de frein</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.brake_fluid_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.brake_fluid_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">Niveau du lave-glaces</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.washer_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.washer_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 0">
        <th class="p-8 text-left font-normal">AD Blue</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.water_level"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.water_level"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Plaquettes de freins avant</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.front_brake_pad"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.front_brake_pad"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Plaquettes de freins arrière</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_brake_pad"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.rear_brake_pad"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Disques avant</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.front_disc"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.front_disc"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Disques arrière</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_disc"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.rear_disc"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Kit machoire arrière</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_jaw_kit"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.rear_jaw_kit"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Usure pneus avant</th>
        <td class="flex justify-end p-8">
          <label class="flex-none">
            <input
              v-model="maintenance.front_tire_wear"
              type="text"
              placeholder="% Usure"
              class="px-4 py-3 border border-black"
              style="width: 274px"
            />
          </label>
        </td>
      </tr>
      <tr v-show="step == 1">
        <th class="p-8 text-left font-normal">Usure pneus arrière</th>
        <td class="flex justify-end p-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_tire_wear"
              type="text"
              placeholder="% Usure"
              class="px-4 py-3 border border-black"
              style="width: 274px"
            />
          </label>
        </td>
      </tr>
      <tr v-show="step == 2">
        <th class="p-8 text-left font-normal">Feux avant</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.front_lights"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.front_lights"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 2">
        <th class="p-8 text-left font-normal">Feux arrière</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_lights"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.rear_lights"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 2">
        <th class="p-8 text-left font-normal">Phares</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.headlights"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.headlights"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 2">
        <th class="p-8 text-left font-normal">Clignotants</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.blinkers"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.blinkers"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Niveau de carburant</th>
        <td class="flex justify-end p-8">
          <label class="flex-none">
            <input
              v-model="maintenance.fuel_level"
              type="text"
              placeholder="Pourcentage %"
              class="px-4 py-3 border border-black"
              style="width: 274px"
            />
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Amortisseurs avant</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.front_shock_absorbers"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.front_shock_absorbers"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Amortisseurs arrière</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.rear_shock_absorbers"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.rear_shock_absorbers"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Pot d'échappement</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.exhaust_pipe"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.exhaust_pipe"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Pare-brise</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.windshield"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.windshield"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Batterie</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.battery"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.battery"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">
          Kit distribution et pompes à eaux
        </th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.distribution_kit"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.distribution_kit"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Kit courroie accessoire</th>
        <td class="flex justify-end p-8 space-x-8">
          <label class="flex-none">
            <input
              v-model="maintenance.belt_kit"
              type="radio"
              class="sr-only peer"
              value="true"
            />
            <span
              class="h-full flex items-center px-8 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >Bon</span
            >
          </label>
          <label class="flex-none">
            <input
              v-model="maintenance.belt_kit"
              type="radio"
              class="sr-only peer"
              value="false"
            />
            <span
              class="block px-4 py-3 border border-black peer-checked:bg-black peer-checked:text-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="step == 3">
        <th class="p-8 text-left font-normal">Observation</th>
        <td class="flex justify-end p-8">
          <label class="flex-none">
            <input
              v-model="maintenance.observation"
              type="text"
              placeholder="Saisir du texte"
              class="px-4 py-3 border border-black"
              style="width: 274px"
            />
          </label>
        </td>
      </tr>
      <tr v-if="step == 5">
        <td colspan="2">
          <VueSignaturePad height="calc(100vh - 422px)" ref="signaturePad" />
          <p
            @click="undo()"
            class="flex-none p-8 border-t border-black text-center"
          >
            Effacer
          </p>
        </td>
      </tr>
      <tr v-if="step == 4">
        <div
          class="p-8 grid grid-cols-2 gap-8"
          style="min-height: calc(100vh - 452px)"
        >
          <img
            v-for="picture in pictures"
            :key="picture.id"
            :src="$store.getters.getUrl(picture.url)"
            class="aspect-video object-cover cursor-pointer"
          />
        </div>
      </tr>
      <tr v-if="step == 4">
        <th
          @click="addPicture()"
          colspan="2"
          class="p-12 border-t border-black text-center text-black font-semibold uppercase"
        >
          Ajouter
        </th>
      </tr>
      <tr v-if="step == 4">
        <th
          @click="step++"
          colspan="2"
          class="p-12 bg-black text-center text-white font-semibold uppercase"
        >
          Suivant
        </th>
      </tr>
      <tr v-else-if="step == 5">
        <th
          @click="save()"
          colspan="2"
          class="p-12 bg-black text-center text-white font-semibold uppercase"
        >
          Terminé
        </th>
      </tr>
      <tr v-else>
        <th colspan="2" class="bg-black">
          <button
            type="submit"
            class="w-full p-12 bg-transparent text-center text-white font-semibold uppercase"
          >
            Enregistrer
          </button>
        </th>
      </tr>
    </table>
    <input
      @change="sendPicture()"
      id="upload"
      ref="file"
      type="file"
      accept="image/*"
      hidden
    />
  </form>
</template>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("fr");

export default {
  data() {
    return {
      step: 0,
      steps: [
        "Liquides",
        "Freinages",
        "Éclairages",
        "Vérifications",
        "Photo",
        "Signature",
      ],
      maintenance: null,
      pictures: [],
    };
  },
  methods: {
    addPicture() {
      document.getElementById("upload").click();
    },
    async sendPicture() {
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
          this.pictures.push(data[0]);
          this.maintenance.car.files.push(data[0]);
          this.setCar();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.maintenance.state = true;
        this.maintenance.end = moment().format();
        this.handleSubmit();
        this.$router.push("/technician/maintenances");
      }
    },
    async setCar() {
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/cars/${this.maintenance.car.id}`),
          this.maintenance.car,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          console.log("car", data);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async getMaintenance() {
      try {
        const { data } = await axios.get(
          this.$store.getters.getUrl(`/maintenances/${this.$route.params.id}`),
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.maintenance = data;
        }
      } catch (error) {
        alert("Erreur durant la récupération des données.");
      }
    },
    async handleSubmit() {
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/maintenances/${this.$route.params.id}`),
          this.maintenance,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.maintenance = data;
          this.step++;
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getMaintenance();
  },
};
</script>
