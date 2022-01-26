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
      if (store.getters.getUser == null) return "/";
      if (store.getters.getUser.role.type == "technician") return "/technician";
      return true;
    },
    children: [
      // Companies
      {
        path: "companies",
        component: () => import("../views/companies/Table.vue"),
      },
      {
        path: "companies/add",
        component: () => import("../views/companies/Add.vue"),
      },
      {
        path: "companies/edit/:id",
        component: () => import("../views/companies/Edit.vue"),
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
      {
        path: "drivers/add",
        component: () => import("../views/drivers/Add.vue"),
      },
      {
        path: "drivers/edit/:id",
        component: () => import("../views/drivers/Edit.vue"),
      },

      // Maintenances
      {
        path: "maintenances",
        component: () => import("../views/maintenances/Table.vue"),
      },
      {
        alias: "maintenances/add",
        path: "maintenances/add/:date",
        component: () => import("../views/maintenances/Add.vue"),
      },
      {
        path: "maintenances/edit/:id",
        component: () => import("../views/maintenances/Edit.vue"),
      },

      // Users
      {
        path: "users",
        component: () => import("../views/users/Table.vue"),
      },
      {
        path: "users/add",
        component: () => import("../views/users/Add.vue"),
      },
      {
        path: "users/edit/:id",
        component: () => import("../views/users/Edit.vue"),
      },

      // Providers
      {
        path: "providers",
        component: () => import("../views/providers/Table.vue"),
      },
    ],
  },
  {
    path: "/technician",
    name: "Technician",
    redirect: "/technician/maintenances",
    component: () => import("../components/Technician.vue"),
    beforeEnter: () => {
      if (store.getters.getUser == null) return "/";
      if (store.getters.getUser.role.type != "technician")
        return "/app/companies";
      return true;
    },
    children: [
      {
        path: "maintenances",
        component: () => import("../views/technician/List.vue"),
      },
      {
        path: "maintenances/:id",
        component: () => import("../views/technician/Single.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
