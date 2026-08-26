export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_contest_texts')
  const sql = database()
  const contests = await sql<ContestDatabaseRow[]>`SELECT * FROM contests ORDER BY year DESC, month DESC, created_at DESC`
  const texts = contests.length
    ? await sql<ContestTextDatabaseRow[]>`SELECT * FROM contest_texts WHERE contest_id IN ${sql(contests.map(contest => contest.id))} ORDER BY distinction, position`
    : []
  return contests.map(contest => serializeContest(contest, texts, true))
})
