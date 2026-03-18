/**
 * @file composables/useBlog.ts
 * Provides blog post data for the Blog section and page.
 *
 * Currently returns an empty dataset. Replace the `posts` ref
 * with a `useFetch` / `useAsyncData` call once a CMS or API
 * endpoint is available.
 */

import type { BlogPost } from '~/types'

export function useBlog() {
  const posts = ref<BlogPost[]>([])
  const isLoading = ref(false)

  return {
    posts: readonly(posts),
    isLoading: readonly(isLoading),
  }
}
