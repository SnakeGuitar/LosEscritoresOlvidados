interface ReadingRow {
  id: string
  queue_id: 'community' | 'professional'
  author_name: string
  work_title: string | null
  strike_count: number
  paused: boolean
  position: number
}

export default defineEventHandler(async () => {
  const rows = await database()<ReadingRow[]>`
    SELECT id, queue_id, author_name, work_title, strike_count, paused, position
    FROM reading_entries
    ORDER BY queue_id, position
  `
  const queues = { community: [], professional: [] } as Record<'community' | 'professional', object[]>
  for (const row of rows) {
    queues[row.queue_id].push({
      id: row.id,
      author: row.author_name,
      work: row.work_title ?? undefined,
      strikes: row.strike_count,
      paused: row.paused,
      position: row.position,
    })
  }
  return queues
})
