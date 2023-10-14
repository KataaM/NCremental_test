<script setup>
import mySwiper from './components/mySwiper.vue'
</script>

<script>
export default {
  data() {
    return {
      images: [
        // { src: '/src/assets/image1.jpg', alt: 'Image 1' },
        // { src: '/src/assets/image2.jpg', alt: 'Image 2' }
      ]
    }
  },
  mounted() {}
}
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

    <div class="container">
      <h1>Discover the Magic of Our Destination</h1>
      <p>
        Welcome to our breathtaking destination, where adventure awaits around every corner. Explore
        the beauty of our city and experience a vacation like no other. From cozy cottages to
        luxurious villas, we have a wide range of rental properties that will make your stay
        unforgettable.
      </p>
      <mySwiper />
    </div>
  </header>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f3f3f3;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 36px;
  margin: 0;
  padding: 0;
}

p {
  color: #666;
  font-size: 18px;
}
</style>
