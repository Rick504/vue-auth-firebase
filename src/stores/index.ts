import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      loader: false,
      user: {
        name: null,
        email: null,
        photo: ''
      },
    }
  },
  persist: {
    storage: sessionStorage,
  },
})
