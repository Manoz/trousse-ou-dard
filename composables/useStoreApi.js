export const fetchApi = async (gameType) => {
  try {
    return await $fetch(`/api/games/${gameType}`)
  } catch {
    return []
  }
}

export const addContentApi = async (gameType, newContent) => {
  try {
    return await $fetch(`/api/games/${gameType}`, {
      method: 'POST',
      body: { content: newContent }
    })
  } catch {
    return null
  }
}
