<script setup>
import PropertiesSwiper from './components/PropertiesSwiper.vue'
import SearchBanner from './components/SearchBanner.vue'
</script>

<script>
export default {
  data() {
    return {
      images: [
        // { src: '/src/assets/image1.jpg', alt: 'Image 1' },
        // { src: '/src/assets/image2.jpg', alt: 'Image 2' }
      ],
      destinationData: {
        title: 'Montreal Adventure',
        description:
          'Explore the vibrant city of Montreal, known for its rich culture and beautiful landscapes. Discover a variety of rental properties that cater to your comfort and style.',
        rental_properties: [
          {
            name: 'Cozy Cabin Retreat',
            rate: 4.8,
            price_per_night: 120.0,
            available_dates: ['2023-12-15', '2023-12-16', '2023-12-17']
          },
          {
            name: 'Seaside Villa',
            rate: 4.9,
            price_per_night: 250.0,
            available_dates: ['2023-12-20', '2023-12-21', '2023-12-22']
          },
          {
            name: 'Mountain Chalet',
            rate: 4.5,
            price_per_night: 160.0,
            available_dates: ['2023-12-18', '2023-12-19', '2023-12-20']
          }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      console.log('FETCH DATA CALLED')
      fetch('http://localhost:3000/montreal', {
        method: 'GET',
        headers: {}
      })
        .then((response) => {
          response.json().then((res) => console.log(res))
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  mounted() {
    this.fetchData()
  }
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

    <SearchBanner @search-clicked="fetchData" />
    <div class="container">
      <h1>{{ destinationData.title }}</h1>
      <p>
        {{ destinationData.description }}
      </p>
      <PropertiesSwiper />

      <button @click="fetchData">Click Me!</button>
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
