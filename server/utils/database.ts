import postgres from 'postgres'

let client: ReturnType<typeof postgres> | undefined

export function database() {
  if (client) return client

  const config = useRuntimeConfig()
  const databaseUrl = process.env.DATABASE_URL || config.databaseUrl
  if (!databaseUrl) {
    throw createError({ statusCode: 503, message: 'La base de datos no está configurada.' })
  }

  client = postgres(databaseUrl, {
    max: 1,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: 'require',
  })

  return client
}
