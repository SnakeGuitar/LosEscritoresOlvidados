import type { Contest } from '~/types'

export function useContests() {
  const { data: contests, status, error, refresh } = useFetch<Contest[]>('/api/contests', {
    default: () => [],
  })
  return { contests, status, error, refresh }
}
