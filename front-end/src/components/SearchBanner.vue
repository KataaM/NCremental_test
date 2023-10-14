<template>
  <div class="search-banner">
    <div class="search-card">
      <div class="search-input">
        <input type="text" placeholder="Search for a city" />
        <button @click="search" class="search-button">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    search() {
      this.$emit('search-clicked')
    }
  }
}
</script>

<style scoped>
.search-banner {
  text-align: center;
  padding: 80px 0;
}

.search-card {
  display: inline-block;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s,
    transform 0.2s;
  text-align: center;
}

.search-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.search-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

i {
  margin-left: 10px;
  color: #555;
  font-size: 20px;
  cursor: pointer;
}

i:hover {
  color: #333;
}

.search-button {
  background: #ff5a5f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
}

.search-button:hover {
  background: #e8494c;
}
</style>
