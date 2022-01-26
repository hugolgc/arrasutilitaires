<template>
  <div class="overflow-x-auto max-w-screen sm:max-w-none">
    <form
      @submit.prevent="handleSubmit()"
      action="post"
      class="mt-24 border-t border-b sm:border-r sm:border-l border-gray sm:rounded overflow-hidden"
      style="min-width: 44rem"
    >
      <table class="table-auto w-full bg-gray-dark divide-y divide-gray">
        <thead class="text-left text-gray-light">
          <tr class="divide-x divide-gray">
            <td>
              <label
                class="flex justify-between items-center px-2 py-1.5 rounded hover:bg-gray"
              >
                <select
                  v-model="piece.part_type"
                  class="w-full bg-transparent outline-none appearance-none cursor-pointer"
                >
                  <option selected value="default">Pièce</option>
                  <option
                    v-for="part in part_types"
                    :key="part.id"
                    :value="part.id"
                  >
                    {{ part.name }}
                  </option>
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
            <td>
              <input
                v-model="piece.customer"
                type="text"
                maxlength="255"
                placeholder="Fournisseur"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td>
              <input
                v-model="piece.reference"
                type="text"
                maxlength="255"
                placeholder="Référence"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td>
              <input
                v-model="piece.amount"
                type="text"
                maxlength="255"
                placeholder="Quantité"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td>
              <input
                v-model="piece.publicPrice"
                type="text"
                maxlength="255"
                placeholder="Tarif Public"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td>
              <input
                v-model="piece.purchasePrice"
                type="text"
                maxlength="255"
                placeholder="Tarif Remisé"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td>
              <input
                v-model="piece.customerPrice"
                type="text"
                maxlength="255"
                placeholder="Tarif Client"
                class="w-full px-2 py-1.5 bg-transparent rounded outline-none text-white placeholder:text-gray-light hover:bg-gray focus:bg-gray-dark"
              />
            </td>
            <td class="pl-1 py-0.5">
              <button type="submit" class="px-1 py-1 rounded outline-none">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray">
          <tr
            v-for="part in maintenance.parts"
            :key="part.id"
            class="divide-x divide-gray"
          >
            <td class="px-2 py-1.5 select-all">
              {{ getPartType(part.part_type).name }}
            </td>
            <td class="px-2 py-1.5 select-all">{{ part.customer }}</td>
            <td class="px-2 py-1.5 select-all">{{ part.reference }}</td>
            <td class="px-2 py-1.5 select-all">{{ part.amount }}</td>
            <td class="px-2 py-1.5 select-all">
              {{ part.publicPrice ? `${part.publicPrice}€` : "" }}
            </td>
            <td class="px-2 py-1.5 select-all">
              {{ part.purchasePrice ? `${part.purchasePrice}€` : "" }}
            </td>
            <td class="px-2 py-1.5 select-all">
              {{ part.customerPrice ? `${part.customerPrice}€` : "" }}
            </td>
            <td class="pl-1 py-0.5">
              <span
                @click="handleDelete(part.id)"
                class="block px-1 py-1 text-gray-light cursor-pointer"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Pieces",
  props: {
    propsMaintenance: Object,
  },
  data() {
    return {
      maintenance: this.propsMaintenance,
      part_types: [],
      piece: {
        amount: null,
        customerPrice: null,
        maintenance: this.propsMaintenance.id,
        part_type: "default",
        publicPrice: null,
        purchasePrice: null,
        reference: null,
      },
    };
  },
  methods: {
    getPartType(id) {
      return this.part_types.length
        ? this.part_types.find((part) => part.id == id)
        : { name: "Pièce" };
    },
    async setMaintenance() {
      let cost = 0;
      this.maintenance.parts.forEach((part) => {
        if (part.customerPrice && part.amount) {
          cost += part.customerPrice * part.amount;
        }
      });
      try {
        const { data } = await axios.put(
          this.$store.getters.getUrl(`/maintenances/${this.maintenance.id}`),
          { cost: cost },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          this.$emit("emit", data.cost);
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async handleSubmit() {
      if (this.piece.part_type == "default" || !this.piece.amount) {
        alert("Saisir une pièce et une quantité.");
        return;
      }
      try {
        const { data } = await axios.post(
          this.$store.getters.getUrl("/parts"),
          this.piece,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        );
        if (data) {
          data.part_type = data.part_type.id;
          this.maintenance.parts.push(data);
          this.piece = {
            amount: null,
            customerPrice: null,
            maintenance: this.propsMaintenance.id,
            part_type: "default",
            publicPrice: null,
            purchasePrice: null,
            reference: null,
          };
          this.setMaintenance();
        }
      } catch (error) {
        alert("Erreur durant l'envoie des données.");
      }
    },
    async handleDelete(id) {
      if (confirm("Supprimer cette pièce ?")) {
        try {
          const { data } = await axios.delete(
            this.$store.getters.getUrl(`/parts/${id}`),
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          );
          if (data) {
            this.maintenance.parts = this.maintenance.parts.filter(
              (part) => part.id != id
            );
            this.setMaintenance();
          }
        } catch (error) {
          alert("Erreur lors de la récupération des données.");
        }
      }
    },
  },
  async beforeMount() {
    try {
      const { data } = await axios.get(
        this.$store.getters.getUrl("/part-types"),
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        }
      );
      if (data) {
        this.part_types = data;
      }
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
    }
  },
};
</script>
