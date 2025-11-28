import { defineStore } from 'pinia'
import { addContentApi, fetchApi } from '~/composables/useStoreApi'

// Map game types to their JSONBin IDs - will be populated in the store
function getGameBinIds() {
  const config = useRuntimeConfig()
  return {
    trousse: config.public.trousseBinId,
    joke: config.public.jokeBinId,
    prefer: config.public.preferBinId,
    ten: config.public.tenBinId,
    howMuch: config.public.howMuchBinId
  }
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
        const GAME_BIN_IDS = getGameBinIds()
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
      const GAME_BIN_IDS = getGameBinIds()
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
