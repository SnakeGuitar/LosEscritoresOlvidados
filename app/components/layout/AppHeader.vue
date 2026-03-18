<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const { isDark, toggle: toggleTheme } = useTheme()

const navItems = computed(() => [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.blog', path: '/blog' },
  { labelKey: 'nav.texts', path: '/textos' },
  { labelKey: 'nav.inkwell', path: '/en-el-tintero' },
  { labelKey: 'nav.contests', path: '/concursos' },
  { labelKey: 'nav.alliances', path: '/alianzas' },
])

const isMobileMenuOpen = ref(false)
const isLangOpen = ref(false)
const langDropdownRef = ref<HTMLElement | null>(null)

const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }
const closeMobileMenu = () => { isMobileMenuOpen.value = false }

const selectLocale = (code: string) => {
  setLocale(code)
  isLangOpen.value = false
}

const handleOutsideClick = (event: MouseEvent) => {
  if (langDropdownRef.value && !langDropdownRef.value.contains(event.target as Node)) {
    isLangOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <NuxtLink :to="localePath('/')" class="logo" @click="closeMobileMenu">
        <img
          src="~/assets/cat-logo.webp"
          :alt="t('hero.title')"
          class="logo-image"
        />
        <span class="logo-text">LEO</span>
      </NuxtLink>

      <nav class="nav-desktop" aria-label="Navegación principal">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="localePath(item.path)"
          class="nav-link"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <!-- Selector de idioma -->
        <div ref="langDropdownRef" class="lang-dropdown">
          <button
            class="control-btn lang-trigger"
            :aria-expanded="isLangOpen"
            aria-haspopup="listbox"
            @click.stop="isLangOpen = !isLangOpen"
          >
            <span class="lang-current">{{ locale.toUpperCase() }}</span>
            <span class="lang-arrow" :class="{ open: isLangOpen }" aria-hidden="true">▾</span>
          </button>
          <Transition name="dropdown">
            <ul v-if="isLangOpen" class="lang-menu" role="listbox">
              <li
                v-for="loc in locales"
                :key="loc.code"
                class="lang-option"
                :class="{ active: loc.code === locale }"
                role="option"
                :aria-selected="loc.code === locale"
                @click="selectLocale(loc.code)"
              >
                <span class="lang-option-code">{{ loc.code.toUpperCase() }}</span>
                <span class="lang-option-name">{{ loc.name }}</span>
              </li>
            </ul>
          </Transition>
        </div>

        <!-- Toggle de tema -->
        <button
          class="control-btn theme-toggle"
          :title="isDark ? 'Modo claro' : 'Modo oscuro'"
          :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
          @click="toggleTheme"
        >
          <span class="theme-icon" aria-hidden="true">{{ isDark ? '☀' : '☾' }}</span>
        </button>

        <a
          href="https://discord.gg/edwk6mFFQk"
          target="_blank"
          rel="noopener noreferrer"
          class="discord-btn"
        >
          {{ t('nav.joinDiscord') }}
        </a>

        <button
          class="mobile-toggle"
          :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="toggleMobileMenu"
        >
          <span class="hamburger" :class="{ open: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <nav v-if="isMobileMenuOpen" class="nav-mobile" aria-label="Menú móvil">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="localePath(item.path)"
          class="nav-link-mobile"
          @click="closeMobileMenu"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
        <div class="mobile-controls">
          <select
            class="lang-select-mobile control-btn"
            :value="locale"
            @change="selectLocale(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">
              {{ loc.code.toUpperCase() }} — {{ loc.name }}
            </option>
          </select>
          <button class="control-btn theme-toggle" @click="toggleTheme">
            <span aria-hidden="true">{{ isDark ? '☀' : '☾' }}</span>
          </button>
        </div>
        <a
          href="https://discord.gg/edwk6mFFQk"
          target="_blank"
          rel="noopener noreferrer"
          class="discord-btn-mobile"
        >
          {{ t('nav.joinDiscord') }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 2px 12px rgba(68, 33, 5, 0.08), var(--neu-raised-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-primary);
  text-decoration: none;
}

.logo-image {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  box-shadow: var(--neu-raised-sm);
  object-fit: cover;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-primary);
}

/* ── Nav desktop ── */
.nav-desktop {
  display: flex;
  gap: var(--space-lg);
}

.nav-link {
  font-family: var(--font-accent);
  font-size: 0.95rem;
  color: var(--color-primary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  transition: color 0.3s ease, box-shadow 0.3s ease;
}

.nav-link:hover {
  color: var(--color-secondary);
  box-shadow: var(--neu-inset-sm);
}

.nav-link.router-link-active {
  color: var(--color-secondary);
  box-shadow: var(--neu-inset-sm);
  font-weight: 600;
}

/* ── Actions ── */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* Shared neumorphic control button (lang trigger, theme) */
.control-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  background: var(--color-background);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-xs) var(--space-md);
  color: var(--color-primary);
  cursor: pointer;
  box-shadow: var(--neu-raised-sm);
  transition: box-shadow 0.3s ease, transform 0.2s ease, color 0.3s ease;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.control-btn:hover {
  box-shadow: var(--neu-raised), 0 0 0 2px var(--color-accent);
  color: var(--color-secondary);
  transform: translateY(-1px);
}

.control-btn:active {
  box-shadow: var(--neu-inset-sm);
  transform: translateY(0);
}

.theme-toggle {
  padding: var(--space-xs) var(--space-sm);
  min-width: 36px;
}

.theme-icon {
  font-size: 1rem;
  line-height: 1;
}

/* ── Language dropdown ── */
.lang-dropdown {
  position: relative;
}

.lang-trigger {
  gap: var(--space-xs);
}

.lang-arrow {
  font-size: 0.65rem;
  transition: transform 0.25s ease;
  display: inline-block;
}

.lang-arrow.open {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + var(--space-sm));
  right: 0;
  min-width: 160px;
  background: var(--color-background);
  border-radius: var(--radius-md);
  box-shadow: var(--neu-raised), 0 0 0 1px var(--color-border);
  list-style: none;
  overflow: hidden;
  z-index: 200;
  padding: var(--space-xs) 0;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: var(--font-accent);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.lang-option:hover {
  background: var(--color-background-dark);
  color: var(--color-primary);
}

.lang-option.active {
  color: var(--color-secondary);
  font-weight: 600;
  background: var(--color-section-warm);
}

.lang-option-code {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  min-width: 28px;
  color: var(--color-accent);
}

.lang-option.active .lang-option-code {
  color: var(--color-secondary);
}

.lang-select-mobile {
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.85rem;
  appearance: none;
  -webkit-appearance: none;
  min-width: 80px;
}

/* ── Dropdown transition ── */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Discord btn ── */
.discord-btn {
  font-family: var(--font-accent);
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--color-secondary);
  color: var(--color-text-inverse);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  text-decoration: none;
  box-shadow: var(--neu-raised-sm);
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.discord-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  transform: translateY(-2px);
  box-shadow: var(--neu-raised);
}

/* ── Mobile toggle ── */
.mobile-toggle {
  display: none;
  background: var(--color-background);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  padding: var(--space-sm);
  box-shadow: var(--neu-raised-sm);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile nav ── */
.nav-mobile {
  display: flex;
  flex-direction: column;
  padding: var(--space-lg);
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(68, 33, 5, 0.08);
}

.nav-link-mobile {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  color: var(--color-primary);
  text-decoration: none;
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.mobile-controls {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md) 0;
}

.discord-btn-mobile {
  display: inline-block;
  text-align: center;
  font-family: var(--font-accent);
  font-weight: 600;
  background: var(--color-secondary);
  color: var(--color-text-inverse);
  padding: var(--space-md);
  border-radius: var(--radius-full);
  margin-top: var(--space-md);
  text-decoration: none;
}

/* ── Transition slide ── */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 600px;
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-desktop { display: none; }
  .discord-btn { display: none; }
  .mobile-toggle { display: block; }
  /* Ocultar controles individuales en desktop actions cuando hay mobile */
  .header-actions .control-btn { display: none; }
}
</style>
