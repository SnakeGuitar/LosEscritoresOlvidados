export default defineEventHandler(async () => {
  const sql = database()
  const contests = await sql<ContestDatabaseRow[]>`
    SELECT * FROM contests WHERE published = TRUE ORDER BY year DESC, month DESC, created_at DESC
  `
  if (!contests.length) return []
  const texts = await sql<ContestTextDatabaseRow[]>`
    SELECT * FROM contest_texts
    WHERE status = 'published' AND contest_id IN ${sql(contests.map(contest => contest.id))}
    ORDER BY distinction, position
  `
  return contests.map(contest => serializeContest(contest, texts))
})
