export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  slug: string
  coverImage?: string
  tags: string[]
}

export interface Contest {
  id: string
  title: string
  description: string
  deadline: string
  status: 'open' | 'closed' | 'judging'
  rules: string[]
  prize?: string
}

export interface TextSubmission {
  id: string
  title: string
  author: string
  genre: string
  excerpt: string
  date: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'tip' | 'ebook' | 'course'
  link?: string
  coverImage?: string
}

export interface Alliance {
  id: string
  name: string
  logoUrl: string
  description: string
  link: string
}

export interface NavItem {
  labelKey: string
  path: string
  icon?: string
}
