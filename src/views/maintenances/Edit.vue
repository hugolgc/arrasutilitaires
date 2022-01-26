<template>
  <form
    @submit.prevent="handleSubmit()"
    method="post"
    class="max-w-2xl mx-auto px-6 sm:px-0"
  >
    <label class="flex flex-wrap">
      <input
        required
        v-model="date"
        type="text"
        maxlength="255"
        placeholder="Date (jj/mm/aaaa)"
        class="w-72 mr-auto bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
      <input
        required
        v-model="time"
        type="text"
        maxlength="255"
        placeholder="Heure (hh:mm)"
        class="w-36 bg-transparent text-4xl sm:text-5xl placeholder:text-gray font-bold outline-none"
      />
    </label>
    <table v-if="maintenance" class="table-auto sm:table-fixed w-full my-6">
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Technicien
        </th>
        <td class="pb-1.5">
          <div
            v-if="maintenance.technician"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <router-link
              :to="'/app/users/edit/' + maintenance.technician"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{
                $store.getters.findUser(maintenance.technician).username
              }}</router-link
            >
            <div class="space-x-3">
              <router-link
                :to="'/app/users/edit/' + maintenance.technician"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</router-link
              >
              <span
                @click="associateTechnician = true"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else
            @click="associateTechnician = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Véhicule
        </th>
        <td class="pb-1.5">
          <div
            v-if="maintenance.car"
            class="group flex justify-between px-2 py-1.5 rounded hover:bg-gray"
          >
            <router-link
              :to="'/app/cars/edit/' + maintenance.car.id"
              class="block font-medium underline underline-offset-2 decoration-white/30 cursor-pointer"
              >{{ maintenance.car.brand }}
              {{ maintenance.car.model }}</router-link
            >
            <div class="space-x-3">
              <router-link
                :to="'/app/cars/edit/' + maintenance.car.id"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Voir</router-link
              >
              <span
                @click="associateCar = true"
                class="text-gray-light font-medium opacity-100 sm:opacity-0 cursor-pointer group-hover:opacity-100"
                >Modifier</span
              >
            </div>
          </div>
          <p
            v-else
            @click="associateCar = true"
            class="px-2 py-1.5 rounded font-medium underline underline-offset-2 decoration-white/30 cursor-pointer hover:bg-gray"
          >
            Associer
          </p>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          État
        </th>
        <td class="pb-1.5">
          <label
            class="flex justify-between items-center px-2 py-1.5 rounded hover:bg-gray"
          >
            <select
              v-model="maintenance.state"
              class="w-full bg-transparent outline-none appearance-none cursor-pointer"
            >
              <option value="false">À faire</option>
              <option value="true">Terminée</option>
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
      <tr v-if="maintenance.end">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Temps d'intervention
        </th>
        <td class="px-2 pt-1.5 pb-3">
          {{ getDiff(maintenance.date, maintenance.end) }}
        </td>
      </tr>
      <tr v-if="maintenance.cost">
        <th class="px-2 py-1.5 pb-3 text-left text-gray-light font-medium">
          Montant des pièces
        </th>
        <td class="px-2 py-1.5 pb-3">{{ maintenance.cost }}€</td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveaux
        </th>
        <td
          @click="controls.levels = !controls.levels"
          class="px-2 pt-1.5 pb-3 text-gray-light font-medium"
        >
          <label
            v-show="!controls.levels"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Voir</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <label
            v-show="controls.levels"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Cacher</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau d'huile moteur
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.engine_oil_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.engine_oil_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau d'huile de boite et pont
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.gearbox_oil_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.gearbox_oil_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau du liquide de refroidissement
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.coolant_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.coolant_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau du liquide de frein
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.brake_fluid_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.brake_fluid_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau du lave-glaces
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.washer_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.washer_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.levels">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau d'eau déminéralisée
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.water_level"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.water_level"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Freinages
        </th>
        <td
          @click="controls.brakes = !controls.brakes"
          class="px-2 pt-1.5 pb-3 text-gray-light font-medium"
        >
          <label
            v-show="!controls.brakes"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Voir</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <label
            v-show="controls.brakes"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Cacher</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins avant
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_brake_pad"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_brake_pad"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Plaquettes de freins arrière
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_brake_pad"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_brake_pad"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques avant
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_disc"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_disc"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Disques arrière
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_disc"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_disc"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Kit machoire arrière
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_jaw_kit"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_jaw_kit"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Usure pneus avant
        </th>
        <td class="pb-1.5">
          <input
            v-model="maintenance.front_tire_wear"
            type="text"
            maxlength="255"
            placeholder="% Usure"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr v-show="controls.brakes">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Usure pneus arrière
        </th>
        <td class="pb-1.5">
          <input
            v-model="maintenance.rear_tire_wear"
            type="text"
            maxlength="255"
            placeholder="% Usure"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Éclairages
        </th>
        <td
          @click="controls.lightings = !controls.lightings"
          class="px-2 pt-1.5 pb-3 text-gray-light font-medium"
        >
          <label
            v-show="!controls.lightings"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Voir</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <label
            v-show="controls.lightings"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Cacher</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </td>
      </tr>
      <tr v-show="controls.lightings">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Feux avant
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_lights"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_lights"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.lightings">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Feux arrière
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_lights"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_lights"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.lightings">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Phares
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.headlights"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.headlights"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.lightings">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Clignotants
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.blinkers"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.blinkers"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Vérifications
        </th>
        <td
          @click="controls.checks = !controls.checks"
          class="px-2 pt-1.5 pb-3 text-gray-light font-medium"
        >
          <label
            v-show="!controls.checks"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Voir</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <label
            v-show="controls.checks"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <span>Cacher</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Niveau de carburant
        </th>
        <td class="pb-1.5">
          <input
            v-model="maintenance.fuel_level"
            type="text"
            maxlength="255"
            placeholder="Pourcentage %"
            class="w-full px-2 py-1.5 bg-transparent rounded outline-none placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark focus:shadow-xl"
          />
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Amortisseurs avant
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_shock_absorbers"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.front_shock_absorbers"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Amortisseurs arrière
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_shock_absorbers"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.rear_shock_absorbers"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Pot d'échappement
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.exhaust_pipe"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.exhaust_pipe"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Pare-brise
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.windshield"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.windshield"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Batterie
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.battery"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.battery"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Kit distribution et pompes à eaux
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.distribution_kit"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.distribution_kit"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr v-show="controls.checks">
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Kit courroie accessoire
        </th>
        <td class="flex space-x-8">
          <label class="cursor-pointer">
            <input
              v-model="maintenance.belt_kit"
              value="true"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >Bon</span
            >
          </label>
          <label class="cursor-pointer">
            <input
              v-model="maintenance.belt_kit"
              value="false"
              type="radio"
              class="sr-only peer"
            />
            <span
              class="px-2 py-1.5 rounded-md border border-transparent peer-checked:border-white"
              >À vérifier</span
            >
          </label>
        </td>
      </tr>
      <tr>
        <th class="px-2 pt-1.5 pb-3 text-left text-gray-light font-medium">
          Observation
        </th>
        <td class="pb-1.5">
          <input
            v-model="maintenance.observation"
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
  <Pieces v-if="maintenance" :propsMaintenance="maintenance" @emit="setCost" />
  <Associate
    :list="cars"
    :id="maintenance.id"
    type="maintenances"
    fieldChange="car"
    searchField="numberplate"
    placeholder="Immatriculation"
    v-if="associateCar"
    @emit="setAssociate"
  />
  <Associate
    :list="technicians"
    :id="maintenance.id"
    type="maintenances"
    fieldChange="technician"
    searchField="username"
    placeholder="Nom du technicien"
    v-if="associateTechnician"
    @emit="setAssociate"
  />
</template>

<script>
import axios from "axios";
import moment from "moment";
import Associate from "../../components/Associate.vue";
import Pieces from "../../components/Pieces.vue";

export default {
  components: {
    Associate,
    Pieces,
  },
  data() {
    return {
      date: null,
      time: null,
      maintenance: null,
      load: false,
      associateTechnician: false,
      associateCar: false,
      controls: {
        levels: false,
        brakes: false,
        lightings: false,
        checks: false,
      },
    };
  },
  computed: {
    cars() {
      return this.$store.getters.getCars;
    },
    technicians() {
      return this.$store.getters.getUsers.filter(
        (user) => user.role.type == "technician"
      );
    },
  },
  methods: {
    setCost(cost) {
      this.maintenance.cost = cost;
    },
    async getCars() {
      try {
        const { data } = await axios.get(this.$store.getters.getUrl("/cars"), {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        });
        if (data) {
          this.$store.commit("setCars", data.reverse());
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    async getUsers() {
      try {
        const { data } = await axios.get(this.$store.getters.getUrl("/users"), {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        });
        if (data) {
          this.$store.commit("setUsers", data.reverse());
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
      }
    },
    setLoad() {
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 3000);
    },
    twoDigits(n) {
      return n > 9 ? n : `0${n}`;
    },
    getDiff(a, b) {
      let hours = Math.abs(moment(a).diff(moment(b), "hours"));
      let minutes = Math.abs(moment(a).diff(moment(b), "minutes")) - hours * 60;
      return `${this.twoDigits(hours)}:${this.twoDigits(minutes)}`;
    },
    setAssociate(show) {
      this.associateCar = show;
      this.associateTechnician = show;
      this.setLoad();
    },
    async handleSubmit() {
      if (this.$store.getters.getUser.role.type == "customer") return;
      if (!this.date.length || this.time.length) {
        this.maintenance.date = moment(
          `${this.date} ${this.time}`,
          "DD/MM/YYYY HH:mm"
        ).format();
        try {
          const { data } = await axios.put(
            this.$store.getters.getUrl(`/maintenances/${this.maintenance.id}`),
            this.maintenance,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) {
            this.maintenance = data;
            this.date = moment(this.maintenance.date).format("DD/MM/YYYY");
            this.time = moment(this.maintenance.date).format("HH:mm");
            this.setLoad();
          }
        } catch (error) {
          alert("Erreur durant l'envoie des données.");
        }
      }
    },
    async handleDelete() {
      if (confirm("Supprimer cette intervention ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/maintenances/${this.maintenance.id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) this.$router.push("/app/maintenances");
        } catch (error) {
          alert("Erreur durant la suppression de l'intervention.");
        }
      }
    },
    async init() {
      this.maintenance = await this.$store.getters.findMaintenance(
        this.$route.params.id
      );
      if (this.maintenance) {
        this.date = moment(this.maintenance.date).format("DD/MM/YYYY");
        this.time = moment(this.maintenance.date).format("HH:mm");
      }
      this.getCars();
      this.getUsers();
    },
  },
  beforeMount() {
    this.init();
  },
  beforeUpdate() {
    this.$store.commit("setHeader", [
      {
        name: "🔧 Interventions",
        link: "/app/maintenances",
      },
    ]);
  },
  watch: {
    $route() {
      this.init();
    },
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: "🔧 Interventions",
        link: "/app/maintenances",
      },
    ]);
    document.addEventListener("appSetup", () => this.init());
  },
};
</script>
