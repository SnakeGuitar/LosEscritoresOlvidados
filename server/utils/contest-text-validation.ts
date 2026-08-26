import type { Sql } from 'postgres'

export type Distinction = 'winner' | 'finalist' | 'honorable_mention'

const limits: Record<Distinction, number> = {
  winner: 1,
  finalist: 2,
  honorable_mention: 2,
}

export async function nextTextPosition(sql: Sql, contestId: string, distinction: Distinction, excludedId?: string) {
  const rows = excludedId
    ? await sql<{ count: number; maximum: number | null }[]>`
        SELECT COUNT(*)::int AS count, MAX(position)::int AS maximum
        FROM contest_texts WHERE contest_id = ${contestId} AND distinction = ${distinction} AND id <> ${excludedId}
      `
    : await sql<{ count: number; maximum: number | null }[]>`
        SELECT COUNT(*)::int AS count, MAX(position)::int AS maximum
        FROM contest_texts WHERE contest_id = ${contestId} AND distinction = ${distinction}
      `
  if (rows[0].count >= limits[distinction]) {
    throw createError({ statusCode: 409, message: `Ya se alcanzó el límite para ${distinction}.` })
  }
  return (rows[0].maximum ?? 0) + 1
}
