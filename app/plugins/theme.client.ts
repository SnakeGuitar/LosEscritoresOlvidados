/**
 * @file plugins/theme.client.ts
 * Initializes the color theme on the client side.
 *
 * This plugin runs exclusively in the browser (`.client.ts` suffix)
 * and calls `useTheme().init()`, which reads the stored user preference
 * from localStorage (or falls back to the OS `prefers-color-scheme`)
 * and applies the appropriate `data-theme` attribute to <html>.
 *
 * It must be a plugin (not a composable call in app.vue) because it
 * needs to run before the first render to avoid a flash of the wrong theme.
 */

export default defineNuxtPlugin(() => {
  const { init } = useTheme()
  init()
})
