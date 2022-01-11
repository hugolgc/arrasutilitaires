import { createStore } from "vuex";

export default createStore({
  state: {
    url: "http://localhost:1337",
    token: null,
    user: null,
    header: [],
    cars: [],
  },
  getters: {
    getUrl: (state) => (link) => {
      return state.url + link;
    },
    getApi(state) {
      return state.api;
    },
    getUser(state) {
      return state.user;
    },
    getHeader(state) {
      return state.header;
    },
    getCars(state) {
      return state.cars;
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
    setCars(state, cars) {
      state.cars = cars;
    },
  },
  actions: {},
  modules: {},
});
