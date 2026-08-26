export default defineEventHandler(async (event) => {
  await requirePermission(event, 'manage_contest_texts')
  const id = getRouterParam(event, 'id')
  const rows = await database()`DELETE FROM contest_texts WHERE id = ${id} RETURNING id`
  if (!rows[0]) throw createError({ statusCode: 404, message: 'Texto no encontrado.' })
  return { ok: true }
})
