/**
 * @file composables/useTheme.ts
 * Manages the site-wide color theme (light / dark mode).
 *
 * The active theme is stored in `localStorage` under the key defined
 * by THEME_KEY so the user's preference survives page reloads.
 * On the very first visit, the composable falls back to the OS-level
 * `prefers-color-scheme` media query.
 *
 * The theme is applied by setting `data-theme="dark"` on the root
 * `<html>` element; CSS variables in `dark-theme.css` respond to
 * that selector.
 *
 * Usage:
 *   const { isDark, toggle, init } = useTheme()
 */

const THEME_KEY = 'leo-theme'

export function useTheme() {
  const isDark = useState<boolean>('theme-is-dark', () => false)

  /**
   * Applies a theme by updating the DOM attribute and persisting
   * the choice to localStorage.
   * No-ops on the server (SSR context).
   */
  const apply = (dark: boolean) => {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    }
    isDark.value = dark
  }

  /**
   * Toggles between light and dark mode.
   */
  const toggle = () => apply(!isDark.value)

  /**
   * Reads the stored preference (or the OS preference as fallback)
   * and applies it. Call this once from a client-only plugin.
   */
  const init = () => {
    if (!import.meta.client) return
    const stored = localStorage.getItem(THEME_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(stored ? stored === 'dark' : prefersDark)
  }

  return {
    /** Whether dark mode is currently active. Read-only. */
    isDark: readonly(isDark),
    toggle,
    init,
  }
}
