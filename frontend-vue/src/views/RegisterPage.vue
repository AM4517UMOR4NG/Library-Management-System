<template>
  <div class="min-h-screen flex items-center justify-center relative z-10">
    <div class="w-full max-w-md">
      <!-- Register Card -->
      <div class="glass-card p-8 animate-slide-up">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p class="text-white/70">Join our library management system</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-white/80 mb-2">Username</label>
            <input 
              v-model="form.username"
              type="text" 
              class="input-field w-full"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label class="block text-white/80 mb-2">Password</label>
            <input 
              v-model="form.password"
              type="password" 
              class="input-field w-full"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label class="block text-white/80 mb-2">Confirm Password</label>
            <input 
              v-model="form.confirmPassword"
              type="password" 
              class="input-field w-full"
              placeholder="Confirm your password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-300 text-sm">
            {{ success }}
          </div>

          <!-- Loading State -->
          <button 
            type="submit" 
            class="btn-primary w-full"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <p class="text-white/70">
            Already have an account? 
            <router-link to="/login" class="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in here
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
  name: 'RegisterPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async handleRegister() {
      // Validate passwords match
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const response = await axios.post('/api/auth/register', {
          username: this.form.username,
          password: this.form.password
        })

        this.success = 'Account created successfully! You can now sign in.'
        
        // Clear form
        this.form = {
          username: '',
          password: '',
          confirmPassword: ''
        }

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)

      } catch (error) {
        console.error('Register error:', error)
        this.error = error.response?.data?.error || 'Registration failed. Please try again.'
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