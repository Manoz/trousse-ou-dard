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

  const config = useRuntimeConfig()
  const binId = getBinId(config, gameType as GameType)

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    headers: { 'X-Access-Key': config.jsonbinApiKey as string }
  })

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'JSONBin request failed' })
  }

  const data = await response.json()
  return data?.record?.content || []
})
