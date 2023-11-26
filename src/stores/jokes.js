import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const jsonBinID = import.meta.env.VITE_JOKE_BIN_ID
const jsonBinAccessKey = import.meta.env.VITE_JSONBIN_API_KEY
const jsonBinUrl = `https://api.jsonbin.io/v3/b/${jsonBinID}`
const headers = { 'X-Access-Key': jsonBinAccessKey }

export const useJokeStore = defineStore('jokeStore', {
  state: () => ({
    jokes: [],
    loaded: false
  }),

  actions: {
    async fetchJokes() {
      try {
        const fetchData = await fetch(jsonBinUrl, { headers })
          .then((response) => response.json())
          .then((data) => {
            return data?.record?.jokes || []
          })
          .catch((error) => {
            console.error('Oops, something went wrong with JSONBin.io', error)
          })

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
      try {
        const jokes = this.jokes
        jokes.push(newJoke)

        // Send the updated jokes array to JSONBin
        const newJokes = await fetch(jsonBinUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ jokes })
        })
          .then((response) => response.json())
          .then((data) => {
            return data?.record?.jokes || []
          })
          .catch((error) => {
            console.error(error)
          })

        this.jokes = newJokes
      } catch (error) {
        console.error('Oops, something went wrong while adding a joke', error)
      }
    }
  }
})
