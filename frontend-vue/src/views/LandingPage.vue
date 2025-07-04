<template>
  <div class="min-h-screen flex items-center justify-center relative z-10">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Library Management
        </h1>
        <p class="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          Modern library management system with advanced features, beautiful UI, and seamless user experience
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/login" class="btn-primary text-lg px-8 py-4">
            Get Started
          </router-link>
          <router-link to="/register" class="glass-card text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
            Create Account
          </router-link>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mt-20">
        <div v-for="(feature, index) in features" :key="index" 
             class="glass-card p-8 text-center card-3d animate-fade-in"
             :style="{ animationDelay: `${index * 0.2}s` }">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-white mb-4">{{ feature.title }}</h3>
          <p class="text-white/70">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 text-center">
        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" 
               class="glass-card p-6 animate-fade-in"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="text-3xl font-bold text-blue-400 mb-2">{{ stat.value }}</div>
            <div class="text-white/70">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      features: [
        {
          icon: '📚',
          title: 'Book Management',
          description: 'Efficiently manage your library collection with advanced cataloging and search features.'
        },
        {
          icon: '👥',
          title: 'Member Management',
          description: 'Keep track of library members with detailed profiles and borrowing history.'
        },
        {
          icon: '🔄',
          title: 'Loan Tracking',
          description: 'Monitor book loans, returns, and overdue items with automated notifications.'
        }
      ],
      stats: [
        { value: '1000+', label: 'Books Available' },
        { value: '500+', label: 'Active Members' },
        { value: '24/7', label: 'Online Access' },
        { value: '99.9%', label: 'Uptime' }
      ]
    }
  }
}
</script>

<style scoped>
.card-3d:hover {
  transform: translateY(-10px) rotateY(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style> 