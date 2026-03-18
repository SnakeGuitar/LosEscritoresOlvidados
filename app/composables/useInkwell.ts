/**
 * @file composables/useInkwell.ts
 * Provides resource data and tab state for the Inkwell section and page.
 *
 * The `activeTab` ref drives which category is displayed; it is exposed
 * as writable so the InkwellSection component can update it directly.
 * `filteredResources` is a derived computed that reacts automatically.
 *
 * Currently returns an empty dataset. Replace the `resources` ref
 * with a `useFetch` / `useAsyncData` call once a CMS or API
 * endpoint is available.
 */

import type { InkwellResource, InkwellTab } from '~/types'

export function useInkwell() {
  const resources = ref<InkwellResource[]>([])
  const isLoading = ref(false)
  const activeTab = ref<InkwellTab>('tips')

  const filteredResources = computed(() =>
    resources.value.filter((r) => r.tab === activeTab.value)
  )

  return {
    resources: readonly(resources),
    /** Subset of resources matching the currently selected tab. */
    filteredResources,
    /** Currently selected tab. Writable — bind directly to UI controls. */
    activeTab,
    isLoading: readonly(isLoading),
  }
}
