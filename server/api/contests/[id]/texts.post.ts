export default defineEventHandler(async (event) => {
  const session = await requirePermission(event, 'manage_contest_texts')
  const contestId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const distinction = enumValue(body.distinction, ['winner', 'finalist', 'honorable_mention'] as const, 'Distinción')
  const status = enumValue(body.status, ['draft', 'published'] as const, 'Estado')
  const sql = database()
  const contests = await sql`SELECT id FROM contests WHERE id = ${contestId} LIMIT 1`
  if (!contests[0]) throw createError({ statusCode: 404, message: 'Concurso no encontrado.' })
  const position = await nextTextPosition(sql, contestId!, distinction)
  const rows = await sql`
    INSERT INTO contest_texts (
      contest_id, distinction, position, title, author_name, body_markdown,
      discord_thread_url, status, created_by
    ) VALUES (
      ${contestId}, ${distinction}, ${position}, ${requiredString(body.title, 'Título', 240)},
      ${requiredString(body.authorName, 'Autor', 160)}, ${requiredString(body.bodyMarkdown, 'Texto', 200000)},
      ${optionalUrl(body.discordThreadUrl)}, ${status}, ${session.user.id}
    ) RETURNING id
  `
  setResponseStatus(event, 201)
  return { id: rows[0].id }
})
