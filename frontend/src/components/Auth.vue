<template>
    <div>
      <h2>ログイン / 新規登録</h2>
      <button @click="loginGoogle">Googleでログイン</button>
      <button @click="loginApple">Appleでログイン</button>
      <button v-if="user" @click="logout">ログアウト</button>
      <div v-if="user">
        <p>ログイン中: {{ user.email }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { auth, googleProvider, appleProvider } from '../firebase';
  import { signInWithPopup, signOut } from 'firebase/auth';
  import { ref } from 'vue';
  
  const user = ref(auth.currentUser);
  
  auth.onAuthStateChanged((u) => {
    user.value = u;
  });
  
  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      alert('Googleログイン失敗');
    }
  };
  
  const loginApple = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (e) {
      alert('Appleログイン失敗');
    }
  };
  
  const logout = async () => {
    await signOut(auth);
  };
  </script>
  