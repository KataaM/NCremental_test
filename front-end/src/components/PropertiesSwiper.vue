<template>
  <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }"
    :pagination="true"
    :modules="modules"
    class="PropertiesSwiper"
  >
    <swiper-slide v-for="(property, index) in properties" :key="index">
      <div class="property-info">
        <img :src="property.image" alt="Property Image" class="rounded-image" />
        <h2>{{ property.name }}</h2>
        <p>${{ property.price_per_night }} night</p>
        <p>Rating: {{ property.rate }}/5</p>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    properties: Array
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination]
    }
  }
}
</script>

<style scoped>
body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  padding-bottom: 160px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.property-info {
  text-align: center;
}

.rounded-image {
  border-radius: 10px;
  max-width: 100%;
  height: auto;
}
</style>
