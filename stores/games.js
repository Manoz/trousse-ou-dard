import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '~/composables/useStoreApi'

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
    async loadGameContent(gameType) {
      if (this.games[gameType]?.loaded) return

      try {
        if (!this.games[gameType]) {
          throw new Error(`Unknown game type: ${gameType}`)
        }

        const content = await fetchApi(gameType)
        if (!content || (Array.isArray(content) && content.length === 0)) {
          throw new Error(`Failed to load content for game type: ${gameType}`)
        }

        this.games[gameType].content = content
        this.games[gameType].loaded = true
      } catch (error) {
        console.error(`Oops, something went wrong while loading ${gameType}`, error)
      }
    },

    async addGameContent(gameType, newContent) {
      if (!this.games[gameType]) {
        throw new Error(`Unknown game type: ${gameType}`)
      }

      const updatedContent = await addContentApi(gameType, newContent)
      if (updatedContent) {
        this.games[gameType].content = updatedContent
      }
      return updatedContent
    }
  }
})
