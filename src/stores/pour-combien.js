import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_POUR_COMBIEN_BIN_ID

export const usePourCombienStore = defineStore('pourCombienStore', {
  state: () => ({
    pourCombiens: [],
    loaded: false
  }),

  actions: {
    async fetchPourCombiens() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the pour combiens', error)
      }
    },

    async getPourCombiens() {
      if (this.loaded) return

      const pourCombiens = await this.fetchPourCombiens()

      this.pourCombiens = pourCombiens
      this.loaded = true
    },

    async addPourCombien(newPourCombien) {
      const pourCombiens = this.pourCombiens

      const newPourCombiens = await addContentApi(jsonBinID, pourCombiens, newPourCombien)

      this.pourCombiens = newPourCombiens
    }
  }
})
