import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_PREFER_BIN_ID

export const usePreferStore = defineStore('preferStore', {
  state: () => ({
    prefers: [],
    loaded: false
  }),

  actions: {
    async fetchPrefers() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the trousses', error)
      }
    },

    async getPrefers() {
      if (this.loaded) return

      const prefers = await this.fetchPrefers()

      this.prefers = prefers
      this.loaded = true
    },

    async addPrefer(newPrefer) {
      const prefers = this.prefers

      const newPrefers = await addContentApi(jsonBinID, prefers, newPrefer)

      this.prefers = newPrefers
    }
  }
})
