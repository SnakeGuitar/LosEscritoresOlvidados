export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_readings')
  const id = getRouterParam(event, 'id')
  const result = await database()`DELETE FROM reading_entries WHERE id = ${id} RETURNING id`
  if (!result[0]) throw createError({ statusCode: 404, message: 'Autor no encontrado.' })
  return { ok: true }
})
