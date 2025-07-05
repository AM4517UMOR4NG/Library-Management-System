<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Particle Background -->
    <div id="particles" class="absolute inset-0 pointer-events-none"></div>
    
    <!-- Navigation -->
    <nav class="relative z-10 p-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c2.332 0 4.332.477 5.5 1.253v13C20.832 18.477 18.832 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white">Library System</h1>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/login" class="btn-secondary">Sign In</router-link>
          <router-link to="/register" class="btn-primary">Get Started</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-6">
      <div class="text-center max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Modern Library
          <span class="block text-blue-400">Management System</span>
        </h1>
        <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Streamline your library operations with our comprehensive management solution. 
          Built with modern technologies for optimal performance and user experience.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/login" class="btn-primary text-lg px-8 py-4">
            Get Started
          </router-link>
          <button class="btn-secondary text-lg px-8 py-4">
            Learn More
          </button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="relative z-10 py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-white/60">
            Everything you need to manage your library efficiently
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="glass-card p-8 text-center card-3d">
            <div class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c2.332 0 4.332.477 5.5 1.253v13C20.832 18.477 18.832 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Book Management</h3>
            <p class="text-white/70 leading-relaxed">
              Efficiently manage your library collection with advanced cataloging and search capabilities.
            </p>
          </div>

          <div class="glass-card p-8 text-center card-3d">
            <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Member Management</h3>
            <p class="text-white/70 leading-relaxed">
              Keep track of library members with comprehensive profiles and membership details.
            </p>
          </div>

          <div class="glass-card p-8 text-center card-3d">
            <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Loan Tracking</h3>
            <p class="text-white/70 leading-relaxed">
              Monitor book loans, returns, and overdue items with automated notifications.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="glass-card p-12 card-3d">
          <h2 class="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Library?
          </h2>
          <p class="text-xl text-white/70 mb-8">
            Join thousands of libraries worldwide using our modern management system
          </p>
          <router-link to="/register" class="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            Start Your Free Trial
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative z-10 py-8 px-6 border-t border-white/10">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-white/60">
          © 2024 Library Management System. Built with Vue.js, Spring Boot, and modern web technologies.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  mounted() {
    this.createParticles()
  },
  methods: {
    createParticles() {
      const particlesContainer = document.getElementById('particles')
      const particleCount = 20
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        
        const size = Math.random() * 10 + 5
        particle.style.width = size + 'px'
        particle.style.height = size + 'px'
        
        particle.style.left = Math.random() * 100 + 'vw'
        particle.style.top = Math.random() * 100 + 'vh'
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's'
        particle.style.animationDelay = Math.random() * 5 + 's'
        
        particlesContainer.appendChild(particle)
      }
    }
  }
}
</script>

<style scoped>
.card-3d {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 