import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: () => {
      store.commit("setToken", null);
      store.commit("setUser", null);
    },
  },
  {
    path: "/app",
    name: "App",
    redirect: "/app/companies",
    component: () => import("../components/Layout.vue"),
    beforeEnter: () => {
      return store.getters.getUser == null ? "/" : true;
    },
    children: [
      // Companies
      {
        path: "companies",
        component: () => import("../views/companies/Table.vue"),
      },

      // Cars
      {
        path: "cars",
        component: () => import("../views/cars/Table.vue"),
      },
      {
        path: "cars/add",
        component: () => import("../views/cars/Add.vue"),
      },
      {
        path: "cars/edit/:id",
        component: () => import("../views/cars/Edit.vue"),
      },

      // Drivers
      {
        path: "drivers",
        component: () => import("../views/drivers/Table.vue"),
      },

      // Commercials
      {
        path: "commercials",
        component: () => import("../views/commercials/Table.vue"),
      },

      // Providers
      {
        path: "providers",
        component: () => import("../views/providers/Table.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
