/**
 * @file composables/useContests.ts
 * Provides contest data for the Contests section and page.
 *
 * Currently returns an empty dataset. Replace the `contests` ref
 * with a `useFetch` / `useAsyncData` call once a CMS or API
 * endpoint is available.
 */

import type { Contest } from '~/types'

export function useContests() {
  const contests = ref<Contest[]>([])
  const isLoading = ref(false)

  return {
    contests: readonly(contests),
    isLoading: readonly(isLoading),
  }
}
