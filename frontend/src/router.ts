import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import Auth from './components/Auth.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/auth', component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
