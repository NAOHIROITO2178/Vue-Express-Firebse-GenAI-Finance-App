import { defineStore } from 'pinia';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.loading = false;
      });
    },
    logout() {
      auth.signOut();
    }
  }
});
