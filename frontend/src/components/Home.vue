<template>
    <div>
      <h1>米国株投資相談アプリ</h1>
      <div v-if="loading">Loading market data...</div>
      <div v-else>
        <div v-for="index in indices" :key="index.symbol">
          <strong>{{ index.symbol }}</strong>: ${{ index.price }} ({{ index.changePercent }})
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const indices = ref<{symbol: string; price: string; changePercent: string;}[]>([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/indices');
      indices.value = res.data;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  });
  </script>
  