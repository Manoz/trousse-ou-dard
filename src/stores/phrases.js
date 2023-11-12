import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_TROUSSE_BIN_ID

export const usePhraseStore = defineStore('phraseStore', {
  state: () => ({
    phrases: [],
    loaded: false
  }),

  actions: {
    async fetchPhrases() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the trousses', error)
      }
    },

    async getPhrases() {
      if (this.loaded) return

      const phrases = await this.fetchPhrases()

      this.phrases = phrases
      this.loaded = true
    },

    async addPhrase(newPhrase) {
      const phrases = this.phrases

      const newPhrases = await addContentApi(jsonBinID, phrases, newPhrase)

      this.phrases = newPhrases
    }
  }
})
