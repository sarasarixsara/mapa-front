import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vue3-openlayers/dist/vue3-openlayers.css';
import OpenLayersMap from 'vue3-openlayers';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(OpenLayersMap);
app.use(ElementPlus)

app.mount("#app")
