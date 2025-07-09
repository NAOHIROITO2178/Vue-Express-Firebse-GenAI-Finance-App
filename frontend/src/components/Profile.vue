<template>
    <div v-if="user">
      <h2>プロフィール作成・編集</h2>
      <form @submit.prevent="saveProfile">
        <label>
          ニックネーム:
          <input v-model="nickname" required />
        </label>
        <label>
          投資経験年数:
          <input type="number" v-model.number="experience" min="0" />
        </label>
        <button type="submit">保存</button>
      </form>
    </div>
    <div v-else>
      <p>ログインしてください。</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { auth, db } from '../firebase';
  import { doc, setDoc, getDoc } from 'firebase/firestore';
  
  const user = ref(auth.currentUser);
  const nickname = ref('');
  const experience = ref<number | null>(null);
  
  auth.onAuthStateChanged(async (u) => {
    user.value = u;
    if (u) {
      const docRef = doc(db, 'profiles', u.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        nickname.value = data.nickname || '';
        experience.value = data.experience || null;
      }
    }
  });
  
  const saveProfile = async () => {
    if (!user.value) return;
    await setDoc(doc(db, 'profiles', user.value.uid), {
      nickname: nickname.value,
      experience: experience.value
    });
    alert('プロフィールを保存しました');
  };
  </script>
  