export default defineEventHandler(async (event) => {
  const session = await requirePermission(event, 'manage_contests')
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
  try {
    const rows = await database()`
      INSERT INTO contests (
        slug, title, theme, description, status, deadline, prize, month, year,
        rules_url, discord_url, published, created_by
      ) VALUES (
        ${record.slug}, ${record.title}, ${record.theme}, ${record.description}, ${record.status},
        ${record.deadline}, ${record.prize}, ${record.month}, ${record.year}, ${record.rulesUrl},
        ${record.discordUrl}, ${record.published}, ${session.user.id}
      ) RETURNING id
    `
    setResponseStatus(event, 201)
    return { id: rows[0].id }
  } catch (error: any) {
    if (error?.code === '23505') throw createError({ statusCode: 409, message: 'Ya existe un concurso con ese slug.' })
    throw error
  }
})
