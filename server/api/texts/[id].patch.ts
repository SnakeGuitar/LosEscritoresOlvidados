export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_contest_texts')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const distinction = enumValue(body.distinction, ['winner', 'finalist', 'honorable_mention'] as const, 'Distinción')
  const status = enumValue(body.status, ['draft', 'published'] as const, 'Estado')
  const sql = database()
  const existing = await sql<{ contest_id: string; distinction: Distinction; position: number }[]>`
    SELECT contest_id, distinction, position FROM contest_texts WHERE id = ${id} LIMIT 1
  `
  if (!existing[0]) throw createError({ statusCode: 404, message: 'Texto no encontrado.' })
  const position = distinction === existing[0].distinction
    ? existing[0].position
    : await nextTextPosition(sql, existing[0].contest_id, distinction, id)
  await sql`
    UPDATE contest_texts SET
      distinction = ${distinction}, position = ${position},
      title = ${requiredString(body.title, 'Título', 240)},
      author_name = ${requiredString(body.authorName, 'Autor', 160)},
      body_markdown = ${requiredString(body.bodyMarkdown, 'Texto', 200000)},
      discord_thread_url = ${optionalUrl(body.discordThreadUrl)},
      status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `
  return { ok: true }
})
