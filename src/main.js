import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/style.css";
import VueSignaturePad from "vue-signature-pad";

createApp(App).use(store).use(router).use(VueSignaturePad).mount("#app");
