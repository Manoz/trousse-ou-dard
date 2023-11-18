import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useJokesStore = defineStore('jokes', () => {
  const jokes = ref([])
  const currentJokeIndex = ref(null)
  const jsonBinID = import.meta.env.VITE_JOKE_BIN_ID
  const jsonBinAccessKey = import.meta.env.VITE_JSONBIN_API_KEY
  const jsonBinUrl = `https://api.jsonbin.io/v3/b/${jsonBinID}`
  const headers = { 'X-Access-Key': jsonBinAccessKey }

  async function loadJokes() {
    const data = await fetch(jsonBinUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        return data?.record?.jokes || []
      })
      .catch((error) => {
        console.error(error)
      })

    jokes.value = data
    refreshRandomJoke()
  }

  const randomJoke = computed(() => {
    if (jokes.value.length === 0) {
      return 'Chargement des jokes lô...'
    }
    return jokes.value[currentJokeIndex.value]
  })

  const refreshRandomJoke = () => {
    if (jokes.value.length > 0) {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * jokes.value.length)
      } while (newIndex === currentJokeIndex.value)
      currentJokeIndex.value = newIndex
    }
  }

  async function addJoke(newPhrase) {
    jokes.value.push(newPhrase)

    await fetch(jsonBinUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': jsonBinAccessKey
      },
      body: JSON.stringify({ phrases: jokes.value })
    })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log('Joke ajoutée:', updatedData.record)
        jokes.value = updatedData.record
      })
      .catch((error) => console.error("Erreur lors de l'ajout de la Joke:", error))
  }

  return {
    jokes,
    loadJokes,
    randomJoke,
    refreshRandomJoke,
    addJoke
  }
})
