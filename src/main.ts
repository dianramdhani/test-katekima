import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './utils/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.config.errorHandler = (err, vm, info) => {
  console.error('Error:', err)
  console.error('Vue component:', vm)
  console.error('Additional info:', info)

  if (err instanceof Error) alert(err.message)
}

app.mount('#app')
