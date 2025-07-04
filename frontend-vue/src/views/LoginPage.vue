<template>
  <div class="min-h-screen flex items-center justify-center relative z-10">
    <div class="w-full max-w-md">
      <!-- Login Card -->
      <div class="glass-card p-8 animate-slide-up">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-white/70">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-white/80 mb-2">Username</label>
            <input 
              v-model="form.username"
              type="text" 
              class="input-field w-full"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label class="block text-white/80 mb-2">Password</label>
            <input 
              v-model="form.password"
              type="password" 
              class="input-field w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
            {{ error }}
          </div>

          <!-- Loading State -->
          <button 
            type="submit" 
            class="btn-primary w-full"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="text-center mt-6">
          <p class="text-white/70">
            Don't have an account? 
            <router-link to="/register" class="text-blue-400 hover:text-blue-300 transition-colors">
              Sign up here
            </router-link>
          </p>
        </div>

        <!-- Back to Home -->
        <div class="text-center mt-4">
          <router-link to="/" class="text-white/60 hover:text-white transition-colors text-sm">
            ← Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''

      try {
        const response = await axios.post('/api/auth/login', this.form)
        const { token } = response.data

        // Store JWT token
        localStorage.setItem('jwt_token', token)
        
        // Redirect to React dashboard (or show success message)
        this.$router.push('/dashboard')
        
      } catch (error) {
        console.error('Login error:', error)
        this.error = error.response?.data?.error || 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style> 