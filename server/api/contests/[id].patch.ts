export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_contests')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const record = {
    slug: slugValue(body.slug),
    title: requiredString(body.title, 'Título', 180),
    theme: requiredString(body.theme, 'Tema', 100),
    description: optionalString(body.description, 1200) ?? '',
    status: enumValue(body.status, ['open', 'judging', 'closed'] as const, 'Estado'),
    deadline: optionalDate(body.deadline),
    prize: optionalString(body.prize, 500) ?? '',
    month: integerValue(body.month, 'Mes', 1, 12),
    year: integerValue(body.year, 'Año', 2020, 2200),
    rulesUrl: optionalUrl(body.rulesUrl),
    discordUrl: optionalUrl(body.discordUrl),
    published: body.published === true,
  }
  const rows = await database()`
    UPDATE contests SET
      slug = ${record.slug}, title = ${record.title}, theme = ${record.theme},
      description = ${record.description}, status = ${record.status}, deadline = ${record.deadline},
      prize = ${record.prize}, month = ${record.month}, year = ${record.year},
      rules_url = ${record.rulesUrl}, discord_url = ${record.discordUrl},
      published = ${record.published}, updated_at = NOW()
    WHERE id = ${id} RETURNING id
  `
  if (!rows[0]) throw createError({ statusCode: 404, message: 'Concurso no encontrado.' })
  return { ok: true }
})
