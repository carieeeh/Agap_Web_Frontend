import "./assets/main.css";

import { VueFire, VueFireAuth } from "vuefire";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "@/firebase";
import Vueform from "@vueform/vueform";
import vueformConfig from "./../vueform.config";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});
app.use(Vueform, vueformConfig);
app.mount("#app");
