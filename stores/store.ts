// store/filters.ts
import { defineStore } from 'pinia'
import type { User } from '~/assets/interface/user';

export const useStore = defineStore({
  id: 'auth-store',
  state: () => {
    return {
      authenticated: false,
      user: {} as User,
      desktop: true,
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
    },
    changeDevice(value: boolean) {
        this.desktop = value
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
    isDesktop: (state) => state.desktop
  },
})