import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import views
import LandingPage from './views/LandingPage.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'

// Router configuration
const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app') 