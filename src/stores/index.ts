import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      loader: false,
      user: {}
    }
  },
  persist: {
    storage: sessionStorage,
  },
})
