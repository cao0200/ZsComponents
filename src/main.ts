import {createApp} from 'vue'
import {createPinia} from 'pinia'

// import App from './App.vue'
import router from './router'
import App from "@/App.vue";
// @ts-ignore
import VueTestUI from '../contextmenu-ui/dist/contextmenu-ui.js'
import '../contextmenu-ui/dist/index.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTestUI)
app.mount('#app')