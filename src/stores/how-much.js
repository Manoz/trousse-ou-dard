import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_HOWMUCH_BIN_ID

export const useHowMuchStore = defineStore('howMuchStore', {
  state: () => ({
    howMuchs: [],
    loaded: false
  }),

  actions: {
    async fetchHowMuchs() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the how muchs', error)
      }
    },

    async getHowMuchs() {
      if (this.loaded) return

      const howMuchs = await this.fetchHowMuchs()

      this.howMuchs = howMuchs
      this.loaded = true
    },

    async addHowMuch(newHowMuch) {
      const howMuchs = this.howMuchs

      const newHowMuchs = await addContentApi(jsonBinID, howMuchs, newHowMuch)

      this.howMuchs = newHowMuchs
    }
  }
})
