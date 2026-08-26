export interface DiscordTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: 'Bearer'
  scope: string
}

export interface DiscordUser {
  id: string
  username: string
  global_name: string | null
  avatar: string | null
}

export interface DiscordMember {
  user: DiscordUser
  nick: string | null
  roles: string[]
  pending?: boolean
}

function discordConfig() {
  const config = useRuntimeConfig()
  const required = [
    config.discordClientId,
    config.discordClientSecret,
    config.discordRedirectUri,
    config.discordGuildId,
  ]
  if (required.some(value => !value)) {
    throw createError({ statusCode: 503, message: 'Discord OAuth2 no está configurado.' })
  }
  return config
}

async function requestToken(params: URLSearchParams) {
  return await $fetch<DiscordTokenResponse>('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
}

export function discordAuthorizationUrl(state: string) {
  const config = discordConfig()
  const params = new URLSearchParams({
    client_id: config.discordClientId,
    redirect_uri: config.discordRedirectUri,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state,
  })
  return `https://discord.com/oauth2/authorize?${params}`
}

export function exchangeDiscordCode(code: string) {
  const config = discordConfig()
  return requestToken(new URLSearchParams({
    client_id: config.discordClientId,
    client_secret: config.discordClientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.discordRedirectUri,
  }))
}

export function refreshDiscordToken(refreshToken: string) {
  const config = discordConfig()
  return requestToken(new URLSearchParams({
    client_id: config.discordClientId,
    client_secret: config.discordClientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }))
}

export async function fetchCurrentDiscordMember(accessToken: string) {
  const config = discordConfig()
  return await $fetch<DiscordMember>(
    `https://discord.com/api/v10/users/@me/guilds/${config.discordGuildId}/member`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )
}

export function discordAvatarUrl(user: DiscordUser) {
  return user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    : null
}
