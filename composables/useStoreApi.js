export const fetchApi = async (gameType) => {
  return await $fetch(`/api/games/${gameType}`)
}

export const addContentApi = async (gameType, newContent) => {
  return await $fetch(`/api/games/${gameType}`, {
    method: 'POST',
    body: { content: newContent }
  })
}
