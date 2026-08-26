export interface ContestDatabaseRow {
  id: string
  slug: string
  title: string
  theme: string
  description: string
  status: 'open' | 'judging' | 'closed'
  deadline: string | Date | null
  prize: string
  month: number
  year: number
  rules_url: string | null
  discord_url: string | null
  published: boolean
}

export interface ContestTextDatabaseRow {
  id: string
  contest_id: string
  distinction: 'winner' | 'finalist' | 'honorable_mention'
  position: number
  title: string
  author_name: string
  body_markdown: string
  discord_thread_url: string | null
  status: 'draft' | 'published'
}

const monthNames = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const tones = ['red', 'pink', 'gold', 'plum'] as const

function toneFor(value: string) {
  const sum = [...value].reduce((total, character) => total + character.charCodeAt(0), 0)
  return tones[sum % tones.length]
}

function recognition(text: ContestTextDatabaseRow, contestSlug: string) {
  return {
    id: text.id,
    title: text.title,
    author: text.author_name,
    textUrl: `/concursos/${contestSlug}/textos/${text.id}`,
    distinction: text.distinction,
    position: text.position,
  }
}

export function serializeContest(contest: ContestDatabaseRow, allTexts: ContestTextDatabaseRow[], includeDrafts = false) {
  const texts = allTexts
    .filter(text => text.contest_id === contest.id && (includeDrafts || text.status === 'published'))
    .sort((a, b) => a.position - b.position)
  const winner = texts.find(text => text.distinction === 'winner')
  return {
    id: contest.id,
    slug: contest.slug,
    title: contest.title,
    description: contest.description,
    status: contest.status,
    deadline: contest.deadline ? new Date(contest.deadline).toISOString().slice(0, 10) : '',
    prize: contest.prize,
    theme: contest.theme,
    month: monthNames[contest.month],
    monthNumber: contest.month,
    year: contest.year,
    artworkTone: toneFor(contest.id),
    rulesUrl: contest.rules_url ?? undefined,
    discordUrl: contest.discord_url ?? undefined,
    published: contest.published,
    winner: winner ? recognition(winner, contest.slug) : undefined,
    finalists: texts.filter(text => text.distinction === 'finalist').map(text => recognition(text, contest.slug)),
    mentions: texts.filter(text => text.distinction === 'honorable_mention').map(text => recognition(text, contest.slug)),
    texts: includeDrafts ? texts.map(text => ({
      ...recognition(text, contest.slug),
      bodyMarkdown: text.body_markdown,
      discordThreadUrl: text.discord_thread_url,
      status: text.status,
    })) : undefined,
  }
}
