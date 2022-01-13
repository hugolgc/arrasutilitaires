import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    // url: "http://localhost:1337",
    url: "https://arrasutilitairesapi.ddns.net",
    token: null,
    user: null,
    header: [],
    companies: [],
    drivers: [],
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
      return state.companies;
    },
    findCompany: (state) => (id) => {
      return state.companies.find((company) => company.id == id);
    },
    getDrivers(state) {
      return state.drivers;
    },
    findDriver: (state) => (id) => {
      return state.drivers.find((driver) => driver.id == id);
    },
    getCars(state) {
      return state.cars;
    },
    findCar: (state) => (id) => {
      return state.cars.find((car) => car.id == id);
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
    async setApp(state) {
      // Companies
      try {
        const { data } = await axios.get(state.url + "/compagnies", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        state.companies = data.reverse();
        console.log("Companies", data);
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Cars
      try {
        const { data } = await axios.get(state.url + "/cars", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        state.cars = data.reverse();
        console.log("Cars", data);
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Drivers
      try {
        const { data } = await axios.get(state.url + "/drivers", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        state.drivers = data.reverse();
        console.log("Drivers", data);
      } catch (error) {
        alert("Erreur lors de la récupération des données.");
        return;
      }

      // Commercials

      // Providers

      const event = new CustomEvent("appSetup");
      document.dispatchEvent(event);
    },
  },
  actions: {},
  modules: {},
});
