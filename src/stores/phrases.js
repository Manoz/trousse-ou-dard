import { defineStore } from 'pinia'

const jsonBinID = import.meta.env.VITE_TROUSSE_BIN_ID
const jsonBinAccessKey = import.meta.env.VITE_JSONBIN_API_KEY
const jsonBinUrl = `https://api.jsonbin.io/v3/b/${jsonBinID}`
const headers = { 'X-Access-Key': jsonBinAccessKey }

export const usePhraseStore = defineStore('phraseStore', {
  state: () => ({
    phrases: [],
    loaded: false
  }),

  actions: {
    async fetchPhrases() {
      try {
        const fetchData = await fetch(jsonBinUrl, { headers })
          .then((response) => response.json())
          .then((data) => {
            return data?.record?.phrases || []
          })
          .catch((error) => {
            console.error('Oops, something went wrong with JSONBin.io', error)
          })

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
      try {
        const phrases = this.phrases
        phrases.push(newPhrase)

        // Send the updated phrases array to JSONBin
        const newPhrases = await fetch(jsonBinUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ phrases })
        })
          .then((response) => response.json())
          .then((data) => {
            return data?.record?.phrases || []
          })
          .catch((error) => {
            console.error(error)
          })

        this.phrases = newPhrases
      } catch (error) {
        console.error('Oops, something went wrong while adding a trousse', error)
      }
    }
  }
})
