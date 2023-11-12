import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

const jsonBinID = import.meta.env.VITE_JOKE_BIN_ID

export const useJokeStore = defineStore('jokeStore', {
  state: () => ({
    jokes: [],
    loaded: false
  }),

  actions: {
    async fetchJokes() {
      try {
        const fetchData = await fetchApi(jsonBinID)

        return fetchData || []
      } catch (error) {
        console.error('Oops, something went wrong while loading the jokes', error)
      }
    },

    async getJokes() {
      if (this.loaded) return

      const jokes = await this.fetchJokes()

      this.jokes = jokes
      this.loaded = true
    },

    async addJoke(newJoke) {
      const jokes = this.jokes
      const newJokes = await addContentApi(jsonBinID, jokes, newJoke)

      this.jokes = newJokes
    }
  }
})
