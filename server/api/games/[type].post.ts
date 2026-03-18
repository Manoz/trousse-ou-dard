const VALID_GAME_TYPES = ['trousse', 'joke', 'prefer', 'ten', 'howMuch'] as const

type GameType = (typeof VALID_GAME_TYPES)[number]

function getBinId(config: ReturnType<typeof useRuntimeConfig>, gameType: GameType): string {
  const binIds: Record<GameType, string> = {
    trousse: config.trousseBinId as string,
    joke: config.jokeBinId as string,
    prefer: config.preferBinId as string,
    ten: config.tenBinId as string,
    howMuch: config.howMuchBinId as string
  }
  return binIds[gameType]
}

export default defineEventHandler(async (event) => {
  const gameType = getRouterParam(event, 'type')

  if (!gameType || !VALID_GAME_TYPES.includes(gameType as GameType)) {
    throw createError({ statusCode: 400, message: 'Unknown game type' })
  }

  const body = await readBody(event)
  const newContent: unknown = body?.content

  if (!newContent || typeof newContent !== 'string' || newContent.trim().length === 0) {
    throw createError({ statusCode: 400, message: 'Invalid content' })
  }

  if (newContent.length > 500) {
    throw createError({ statusCode: 400, message: 'Content too long (max 500 characters)' })
  }

  const config = useRuntimeConfig()
  const binId = getBinId(config, gameType as GameType)
  const headers = {
    'X-Access-Key': config.jsonbinApiKey as string,
    'Content-Type': 'application/json'
  }

  const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, { headers })

  if (!fetchResponse.ok) {
    throw createError({ statusCode: fetchResponse.status, message: 'JSONBin request failed' })
  }

  const fetchData = await fetchResponse.json()
  const currentContent: string[] = fetchData?.record?.content || []
  const updatedContent = [...currentContent, newContent.trim()]

  const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ content: updatedContent })
  })

  if (!updateResponse.ok) {
    throw createError({ statusCode: updateResponse.status, message: 'JSONBin update failed' })
  }

  const updateData = await updateResponse.json()
  return updateData?.record?.content || []
})
