<template>
    <div class="chat-container">
      <h2>アンクルサムの投資相談室 🇺🇸</h2>
  
      <img src="./assets/uncle-sam.png" alt="Uncle Sam" class="uncle-img" /><br>
   
      <label>カテゴリ:</label>
      <select v-model="category">
        <option>個別株</option>
        <option>債券</option>
        <option>REIT</option>
        <option>投資信託</option>
      </select>
  
      <textarea v-model="question" placeholder="相談したいことを入力..."></textarea>
      <button @click="askUncleSam">相談する</button>
  
      <div v-if="loading">🧠 アンクル・サムが考え中...</div>
      <div v-if="reply" class="response">{{ reply }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const category = ref('個別株');
  const question = ref('');
  const reply = ref('');
  const loading = ref(false);
  
  const askUncleSam = async () => {
    loading.value = true;
    reply.value = '';
  
    try {
      const res = await axios.post('http://localhost:3000/api/advice', {
        category: category.value,
        userQuestion: question.value,
        marketData: "S&P500: +0.5%, NASDAQ: +1.2%" // モックデータ
      });
  
      reply.value = res.data.reply;
    } catch (e) {
      reply.value = 'エラーが発生しました。';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 600px;
    margin: auto;
    text-align: center;
  }
  .uncle-img {
    width: 200px;
    height: auto;
    margin: 20px auto;
  }
  textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
  }
  .response {
    margin-top: 15px;
    padding: 10px;
    background: #eef;
    border: 1px solid #99f;
    text-align: left;
  }
  </style>
  