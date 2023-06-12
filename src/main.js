
import '@/styles/index.scss'
import 'uno.css'

import 'virtual:svg-icons-register'
import { createApp } from "vue";
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from "./App.vue";
const app = createApp(App)
setupStore(app)
await setupRouter(app)
app.mount('#app')
