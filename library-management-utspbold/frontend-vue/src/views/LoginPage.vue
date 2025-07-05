<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <!-- Particle Background -->
    <div id="particles" class="absolute inset-0 pointer-events-none"></div>
    
    <!-- Back to Landing -->
    <router-link to="/" class="absolute top-6 left-6 text-white/60 hover:text-white transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </router-link>

    <div class="w-full max-w-md relative z-10">
      <div class="glass-card p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-white/60">Sign in to your account</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
          {{ error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-white/80 mb-2">Username</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <input
                type="text"
                v-model="formData.username"
                class="input-field w-full pl-10"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-white/80 mb-2">Password</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                class="input-field w-full pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-white/5 rounded-lg">
          <p class="text-white/60 text-sm mb-2">Demo Credentials:</p>
          <div class="text-xs text-white/40 space-y-1">
            <p>Admin: admin / admin123</p>
            <p>User: user / user123</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6">
          <p class="text-white/60 text-sm">
            Don't have an account? 
            <router-link to="/register" class="text-blue-400 hover:text-blue-300 transition-colors">
              Sign up here
            </router-link>
          </p>
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
      formData: {
        username: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      error: ''
    }
  },
  mounted() {
    this.createParticles()
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = ''

      try {
        const response = await axios.post('/api/auth/login', this.formData)
        const { token } = response.data
        
        localStorage.setItem('jwt_token', token)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response?.data?.error || 'Login failed'
      } finally {
        this.loading = false
      }
    },
    createParticles() {
      const particlesContainer = document.getElementById('particles')
      const particleCount = 15
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        
        const size = Math.random() * 8 + 3
        particle.style.width = size + 'px'
        particle.style.height = size + 'px'
        
        particle.style.left = Math.random() * 100 + 'vw'
        particle.style.top = Math.random() * 100 + 'vh'
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's'
        particle.style.animationDelay = Math.random() * 3 + 's'
        
        particlesContainer.appendChild(particle)
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