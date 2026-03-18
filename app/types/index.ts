/**
 * @file types/index.ts
 * Domain types for Los Escritores Olvidados.
 *
 * These interfaces define the shape of data consumed by composables
 * and rendered by section components. They are not tied to any
 * specific API or CMS — the composables act as the data layer.
 */

/**
 * An article published on the community blog.
 */
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  coverImage?: string
  tags: string[]
}

/**
 * A creative writing submission shared by a community member.
 */
export interface CreativeText {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  genre: string
  publishedAt: string
  wordCount?: number
}

/**
 * Lifecycle state of a writing contest.
 */
export type ContestStatus = 'open' | 'closed' | 'judging'

/**
 * A writing contest organized by or in partnership with LEO.
 */
export interface Contest {
  id: string
  slug: string
  title: string
  description: string
  status: ContestStatus
  deadline: string
  prize: string
  rulesUrl?: string
  discordUrl?: string
}

/**
 * The tab categories available in the Inkwell section.
 */
export type InkwellTab = 'tips' | 'ebooks' | 'courses'

/**
 * An educational or advisory resource published in the Inkwell.
 * The `tab` field controls which category tab renders this resource.
 */
export interface InkwellResource {
  id: string
  tab: InkwellTab
  title: string
  description: string
  author?: string
  url?: string
  fileUrl?: string
  coverImage?: string
}

/**
 * A partner community linked in the Alliances section.
 * At least one of `discordUrl` or `websiteUrl` should be provided.
 */
export interface Alliance {
  id: string
  name: string
  description: string
  logoUrl?: string
  discordUrl?: string
  websiteUrl?: string
}
