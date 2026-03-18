/**
 * @file composables/useAlliances.ts
 * Provides partner community data for the Alliances section and page.
 *
 * Currently returns an empty dataset. Replace the `alliances` ref
 * with a `useFetch` / `useAsyncData` call once a CMS or API
 * endpoint is available.
 */

import type { Alliance } from '~/types'

export function useAlliances() {
  const alliances = ref<Alliance[]>([])
  const isLoading = ref(false)

  return {
    alliances: readonly(alliances),
    isLoading: readonly(isLoading),
  }
}
