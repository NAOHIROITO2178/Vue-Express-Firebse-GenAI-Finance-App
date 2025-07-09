import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // ←追加

createApp(App).mount('#app')
app.use(router); // ←追加
app.mount('#app');
