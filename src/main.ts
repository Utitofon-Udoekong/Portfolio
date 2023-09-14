import './assets/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(AOS.init)
app.use(head)

app.mount('#app')
