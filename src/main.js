import "./assets/main.css";

import { VueFire, VueFireAuth } from "vuefire";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "@/firebase";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});
app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyDhHbTksP6L2sw2qAk2ozLzi-utU47uh5A',
      libraries: "visualization"
  },
})
app.mount("#app");
