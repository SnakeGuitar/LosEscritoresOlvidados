export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'leo_session')
  if (token) await database()`DELETE FROM sessions WHERE token_hash = ${hashToken(token)}`
  deleteCookie(event, 'leo_session', { path: '/' })
  return { ok: true }
})
