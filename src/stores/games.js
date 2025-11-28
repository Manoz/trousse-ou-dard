import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '../api/storeApi'

// Map game types to their JSONBin IDs
const GAME_BIN_IDS = {
  trousse: import.meta.env.VITE_TROUSSE_BIN_ID,
  joke: import.meta.env.VITE_JOKE_BIN_ID,
  prefer: import.meta.env.VITE_PREFER_BIN_ID,
  ten: import.meta.env.VITE_TEN_BIN_ID,
  howMuch: import.meta.env.VITE_HOWMUCH_BIN_ID
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: {
      trousse: { content: [], loaded: false },
      joke: { content: [], loaded: false },
      prefer: { content: [], loaded: false },
      ten: { content: [], loaded: false },
      howMuch: { content: [], loaded: false }
    }
  }),

  getters: {
    getGameContent: (state) => (gameType) => {
      return state.games[gameType]?.content || []
    },
    isGameLoaded: (state) => (gameType) => {
      return state.games[gameType]?.loaded || false
    }
  },

  actions: {
    async fetchGameContent(gameType) {
      try {
        const binId = GAME_BIN_IDS[gameType]
        if (!binId) {
          throw new Error(`Unknown game type: ${gameType}`)
        }

        const fetchData = await fetchApi(binId)
        return fetchData || []
      } catch (error) {
        console.error(`Oops, something went wrong while loading ${gameType}`, error)
        return []
      }
    },

    async loadGameContent(gameType) {
      if (this.games[gameType]?.loaded) return

      const content = await this.fetchGameContent(gameType)

      this.games[gameType].content = content
      this.games[gameType].loaded = true
    },

    async addGameContent(gameType, newContent) {
      const binId = GAME_BIN_IDS[gameType]
      if (!binId) {
        throw new Error(`Unknown game type: ${gameType}`)
      }

      const currentContent = this.games[gameType].content
      const updatedContent = await addContentApi(binId, currentContent, newContent)

      this.games[gameType].content = updatedContent
      return updatedContent
    }
  }
})
