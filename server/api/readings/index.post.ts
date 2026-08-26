export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_readings')
  const body = await readBody(event)
  const queue = enumValue(body.queue, ['community', 'professional'] as const, 'Lista')
  const author = requiredString(body.author, 'Autor', 120)
  const work = optionalString(body.work, 240)
  const sql = database()
  const rows = await sql`
    INSERT INTO reading_entries (queue_id, author_name, work_title, position)
    VALUES (
      ${queue}, ${author}, ${work},
      COALESCE((SELECT MAX(position) + 1 FROM reading_entries WHERE queue_id = ${queue}), 1)
    )
    RETURNING id
  `
  setResponseStatus(event, 201)
  return { id: rows[0].id }
})
