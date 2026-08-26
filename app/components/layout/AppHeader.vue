<script setup lang="ts">
const { isDark, toggle: toggleTheme } = useTheme()
const menuOpen = ref(false)
const route = useRoute()

const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Lecturas', to: '/lecturas' },
  { label: 'Concursos', to: '/concursos' },
  { label: 'La comunidad', to: '/#comunidad' },
  { label: 'Gestión', to: '/admin' },
]

watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" aria-label="Los Escritores Olvidados, inicio">
        <span class="brand-mark"><img src="~/assets/gaby-logo.png" alt=""></span>
        <span class="brand-name"><strong>Los Escritores</strong><small>Olvidados</small></span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Navegación principal">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      </nav>

      <div class="header-actions">
        <button class="theme-button" :aria-label="isDark ? 'Activar tema claro' : 'Activar tema oscuro'" @click="toggleTheme">
          <span aria-hidden="true">{{ isDark ? '☀' : '☾' }}</span>
        </button>
        <a class="discord-button" href="https://discord.gg/edwk6mFFQk" target="_blank" rel="noopener noreferrer">
          Entrar al Discord <span>↗</span>
        </a>
        <button class="menu-button" :aria-expanded="menuOpen" aria-label="Abrir menú" @click="menuOpen = !menuOpen">
          <span></span><span></span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" class="mobile-nav" aria-label="Navegación móvil">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }} <span>→</span></NuxtLink>
        <a href="https://discord.gg/edwk6mFFQk" target="_blank" rel="noopener noreferrer">Entrar al Discord <span>↗</span></a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header { position: sticky; z-index: 100; top: 0; border-bottom: 1px solid var(--color-border-light); background: color-mix(in srgb, var(--color-background) 88%, transparent); backdrop-filter: blur(18px); }
.header-inner { display: flex; align-items: center; justify-content: space-between; min-height: 78px; gap: 2rem; }
.brand { display: inline-flex; align-items: center; gap: .7rem; color: var(--color-ink); }
.brand-mark { display: grid; place-items: center; width: 48px; height: 48px; overflow: hidden; border-radius: 15px; background: var(--color-pink-soft); }
.brand-mark img { width: 57px; max-width: none; transform: translateY(9px); }
.brand-name { display: flex; flex-direction: column; font-family: var(--font-sans); line-height: 1; }
.brand-name strong { font-size: .82rem; font-weight: 900; letter-spacing: .03em; }
.brand-name small { margin-top: .28rem; color: var(--color-pink); font-size: .69rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.desktop-nav { display: flex; align-items: center; gap: 1.7rem; margin-left: auto; }
.desktop-nav a { position: relative; color: var(--color-text-muted); font: 700 .78rem var(--font-sans); }
.desktop-nav a::after { content: ''; position: absolute; left: 0; right: 100%; bottom: -.45rem; height: 2px; background: var(--color-pink); transition: right .2s ease; }
.desktop-nav a:hover, .desktop-nav a.router-link-active { color: var(--color-ink); }
.desktop-nav a:hover::after, .desktop-nav a.router-link-active::after { right: 0; }
.header-actions { display: flex; align-items: center; gap: .65rem; }
.theme-button { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid var(--color-border); border-radius: 50%; background: transparent; color: var(--color-ink); cursor: pointer; }
.discord-button { display: inline-flex; align-items: center; gap: .5rem; border-radius: 999px; background: var(--color-ink); color: var(--color-background); padding: .72rem 1.1rem; font: 800 .75rem var(--font-sans); }
.discord-button:hover { background: var(--color-pink); color: white; }
.menu-button { display: none; width: 42px; height: 42px; border: 1px solid var(--color-border); border-radius: 50%; background: transparent; cursor: pointer; }
.menu-button span { display: block; width: 16px; height: 2px; margin: 4px auto; background: var(--color-ink); }
.mobile-nav { position: absolute; left: 0; right: 0; top: 100%; display: flex; flex-direction: column; gap: 0; padding: 1rem var(--container-padding) 1.5rem; border-bottom: 1px solid var(--color-border); background: var(--color-background); box-shadow: var(--shadow-lg); }
.mobile-nav a { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--color-border-light); color: var(--color-ink); font: 800 1rem var(--font-sans); }
.menu-enter-active, .menu-leave-active { transition: opacity .2s ease, transform .2s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-8px); }
@media (max-width: 880px) {
  .desktop-nav { display: none; }
  .menu-button { display: block; }
}
@media (max-width: 560px) {
  .header-inner { min-height: 70px; }
  .brand-mark { width: 43px; height: 43px; }
  .brand-mark img { width: 52px; }
  .brand-name strong { font-size: .75rem; }
  .discord-button { display: none; }
}
</style>
