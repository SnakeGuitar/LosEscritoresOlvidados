/**
 * @file composables/useTexts.ts
 * Provides creative writing submissions for the Texts section and page.
 *
 * Currently returns an empty dataset. Replace the `texts` ref
 * with a `useFetch` / `useAsyncData` call once a CMS or API
 * endpoint is available.
 */

import type { CreativeText } from '~/types'

export function useTexts() {
  const texts = ref<CreativeText[]>([])
  const isLoading = ref(false)

  return {
    texts: readonly(texts),
    isLoading: readonly(isLoading),
  }
}
