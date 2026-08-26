export default defineEventHandler(async (event) => {
  const session = await getAuthorizedSession(event)
  if (!session) return { authenticated: false as const }
  return { authenticated: true as const, user: session.user, role: session.role }
})
