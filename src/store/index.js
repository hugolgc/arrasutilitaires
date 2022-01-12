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
      return state.companies.reverse();
    },
    findCompany: (state) => (id) => {
      return state.companies.find((company) => company.id == id);
    },
    getDrivers(state) {
      return state.drivers.reverse();
    },
    findDriver: (state) => (id) => {
      return state.drivers.find((driver) => driver.id == id);
    },
    getCars(state) {
      return state.cars.reverse();
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
  },
  actions: {},
  modules: {},
});
