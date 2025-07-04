<template>
  <div id="app" class="min-h-screen relative overflow-hidden">
    <!-- Particle Background -->
    <div class="particles-container">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    
    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getParticleStyle(index) {
      const size = Math.random() * 4 + 2
      const left = Math.random() * 100
      const animationDelay = Math.random() * 6
      const animationDuration = Math.random() * 4 + 3
      
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      }
    }
  }
}
</script>

<style scoped>
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0.8;
  }
}
</style> 