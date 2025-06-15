<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('')

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/hello')
  message.value = res.data.message
})
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
