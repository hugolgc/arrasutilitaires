import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    // url: "http://localhost:1337",
    url: "http://gyis3d.n0c.world",
    token: null,
    user: null,
    header: [],
    companies: [],
    drivers: [],
    users: [],
    maintenances: [],
    aside: false,
  },
  getters: {
    getUrl: (state) => (link) => {
      return state.url + link;
    },
    getApi(state) {
      return state.api;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
    getHeader(state) {
      return state.header;
    },
    getCompanies(state) {
      return state.companies.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    findCompany: (state) => (id) => {
      return state.companies.find((company) => company.id == id);
    },
    getDrivers(state) {
      return state.drivers.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    findDriver: (state) => (id) => {
      return state.drivers.find((driver) => driver.id == id);
    },
    getCars(state) {
      return state.cars
        ? state.cars.sort((a, b) => {
            if (a.brand < b.brand) {
              return -1;
            }
            if (a.brand > b.brand) {
              return 1;
            }
            return 0;
          })
        : [];
    },
    findCar: (state) => (id) => {
      return state.cars.find((car) => car.id == id);
    },
    getUsers(state) {
      return state.users.sort((a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
    },
    findUser: (state) => (id) => {
      return state.users.find((user) => user.id == id);
    },
    getMaintenances(state) {
      return state.maintenances.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    findMaintenance: (state) => (id) => {
      return state.maintenances.find((maintenance) => maintenance.id == id);
    },
    getAside(state) {
      return state.aside;
    },
  },
  mutations: {
    setToken(state, jwt) {
      state.token = jwt;
    },
    setUser(state, data) {
      state.user = data;
    },
    setHeader(state, items) {
      state.header = items;
    },
    setCompanies(state, companies) {
      state.companies = companies;
    },
    addCompany(state, company) {
      state.companies.push(company);
    },
    setDrivers(state, drivers) {
      state.drivers = drivers;
    },
    addDriver(state, driver) {
      state.drivers.push(driver);
    },
    setCars(state, cars) {
      state.cars = cars;
    },
    addCar(state, car) {
      state.cars.push(car);
    },
    setUsers(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    setMaintenances(state, maintenances) {
      state.maintenances = maintenances;
    },
    addMaintenance(state, maintenance) {
      state.maintenances.push(maintenance);
    },
    setAside(state, aside) {
      state.aside = aside;
    },
    async setApp(state) {
      // Companies
      try {
        const { data } = await axios.get(state.url + "/compagnies", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (data) {
          state.companies = data.reverse();
          console.log("Companies", data);
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Cars
      try {
        const { data } = await axios.get(state.url + "/cars", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (data) {
          state.cars = data.reverse();
          console.log("Cars", data);
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Drivers
      try {
        const { data } = await axios.get(state.url + "/drivers", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (data) {
          state.drivers = data.reverse();
          console.log("Drivers", data);
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Maintenances
      try {
        const { data } = await axios.get(state.url + "/maintenances", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (data) {
          state.maintenances = data.reverse();
          console.log("Maintenances", data);
        }
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Users
      if (state.user.role.type == "super_admin") {
        try {
          const { data } = await axios.get(state.url + "/users", {
            headers: { Authorization: `Bearer ${state.token}` },
          });
          if (data) {
            state.users = data.reverse();
            console.log("Users", data);
          }
        } catch (error) {
          alert("Erreur lors de la récupération des données.");
          return;
        }
      }

      // Providers

      const event = new CustomEvent("appSetup");
      document.dispatchEvent(event);
    },
  },
  actions: {},
  modules: {},
});
