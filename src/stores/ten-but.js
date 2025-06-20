import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_TEN_BIN_ID

export const useTenStore = defineStore('tenStore', {
  state: () => ({
    tens: [],
    loaded: false
  }),

  actions: {
    async fetchTens() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the tens', error)
      }
    },

    async getTens() {
      if (this.loaded) return

      this.tens = await this.fetchTens()
      this.loaded = true
    },

    async addTen(newTen) {
      const tens = this.tens

      this.tens = addContentApi(jsonBinID, tens, newTen)
    }
  }
})
