// store/filters.ts
import { defineStore } from 'pinia'
import type { User } from '~/assets/interface/user';

export const useStore = defineStore({
  id: 'auth-store',
  state: () => {
    return {
      authenticated: false,
      user: {} as User,
    }
  },
  actions: {
    changeAuthenticated(value: boolean) {
      this.authenticated = value;
    },
    setUser(value: User) {
        this.user = value
    },
    removeUser() {
        this.user = {} as User
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
})