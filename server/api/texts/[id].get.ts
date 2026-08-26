export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const rows = await database()<Array<ContestTextDatabaseRow & { contest_slug: string; contest_title: string; theme: string }>>`
    SELECT text.*, contest.slug AS contest_slug, contest.title AS contest_title, contest.theme
    FROM contest_texts text
    JOIN contests contest ON contest.id = text.contest_id
    WHERE text.id = ${id} AND text.status = 'published' AND contest.published = TRUE
    LIMIT 1
  `
  const text = rows[0]
  if (!text) throw createError({ statusCode: 404, message: 'Texto no encontrado.' })
  return {
    id: text.id,
    title: text.title,
    authorName: text.author_name,
    bodyMarkdown: text.body_markdown,
    distinction: text.distinction,
    position: text.position,
    discordThreadUrl: text.discord_thread_url,
    contest: { slug: text.contest_slug, title: text.contest_title, theme: text.theme },
  }
})
