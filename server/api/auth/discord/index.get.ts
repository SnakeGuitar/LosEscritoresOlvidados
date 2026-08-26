export default defineEventHandler((event) => {
  const state = createOpaqueToken()
  setCookie(event, 'leo_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return sendRedirect(event, discordAuthorizationUrl(state))
})
