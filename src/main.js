import {createApp} from "vue";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from "./App.vue";
import router from "./router";
import store from "./store";

var app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
