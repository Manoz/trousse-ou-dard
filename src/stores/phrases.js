import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePhrasesStore = defineStore('phrases', () => {
  const phrases = ref([])
  const currentPhraseIndex = ref(null)
  const jsonBinID = import.meta.env.VITE_TROUSSE_BIN_ID
  const jsonBinAccessKey = import.meta.env.VITE_JSONBIN_API_KEY
  const jsonBinUrl = `https://api.jsonbin.io/v3/b/${jsonBinID}`
  const headers = { 'X-Access-Key': jsonBinAccessKey }

  async function loadPhrases() {
    const data = await fetch(jsonBinUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        return data?.record?.phrases || []
      })
      .catch((error) => {
        console.error(error)
      })

    phrases.value = data
    refreshRandomPhrase()
  }

  const randomPhrase = computed(() => {
    if (phrases.value.length === 0) {
      return 'Chargement des phrases...'
    }
    return phrases.value[currentPhraseIndex.value]
  })

  const refreshRandomPhrase = () => {
    if (phrases.value.length > 0) {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * phrases.value.length)
      } while (newIndex === currentPhraseIndex.value)
      currentPhraseIndex.value = newIndex
    }
  }

  // async function addPhrase(newPhrase) {
  //   phrases.value.push(newPhrase)

  //   await fetch(jsonBinUrl, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Access-Key': jsonBinAccessKey
  //     },
  //     body: JSON.stringify({ phrases: phrases.value })
  //   })
  //     .then((response) => response.json())
  //     .then((updatedData) => {
  //       console.log('Phrase ajoutée:', updatedData.record)
  //       phrases.value = updatedData.record
  //     })
  //     .catch((error) => console.error("Erreur lors de l'ajout de la phrase:", error))
  // }

  return {
    phrases,
    loadPhrases,
    randomPhrase,
    refreshRandomPhrase
    // addPhrase
  }
})
