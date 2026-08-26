import { readFile } from 'node:fs/promises'
import { loadEnvFile } from 'node:process'
import postgres from 'postgres'

try {
  loadEnvFile(new URL('../.env', import.meta.url))
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

if (!process.env.DATABASE_URL) {
  console.error('Falta DATABASE_URL.')
  process.exit(1)
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  prepare: false,
  ssl: 'require',
})

try {
  const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8')
  await sql.unsafe(schema)
  console.log('Esquema aplicado correctamente.')
} finally {
  await sql.end()
}
