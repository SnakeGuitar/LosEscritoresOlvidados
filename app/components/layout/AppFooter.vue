<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <span class="footer-logo"><img src="~/assets/gaby-logo.png" alt=""></span>
        <div><strong>Los Escritores Olvidados</strong><p>Una comunidad donde las historias encuentran voz.</p></div>
      </div>
      <nav aria-label="Enlaces de pie de página">
        <NuxtLink to="/lecturas">Lecturas</NuxtLink>
        <NuxtLink to="/concursos">Concursos</NuxtLink>
        <a href="https://discord.gg/edwk6mFFQk" target="_blank" rel="noopener noreferrer">Discord ↗</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} Los Escritores Olvidados</span>
      <span>Hecho entre libros, café y buenas conversaciones.</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { border-top: 1px solid var(--color-border-light); background: var(--color-background); }
.footer-top { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding-top: 2.5rem; padding-bottom: 2.5rem; }
.footer-brand { display: flex; align-items: center; gap: .9rem; }
.footer-logo { display: grid; place-items: center; width: 52px; height: 52px; overflow: hidden; border-radius: 16px; background: var(--color-pink-soft); }
.footer-logo img { width: 62px; max-width: none; transform: translateY(11px); }
.footer-brand strong { color: var(--color-ink); font: 900 .83rem var(--font-sans); }
.footer-brand p { margin-top: .2rem; color: var(--color-text-faint); font-size: .74rem; }
.footer-top nav { display: flex; gap: 1.5rem; }
.footer-top nav a { color: var(--color-text-muted); font: 800 .74rem var(--font-sans); }
.footer-top nav a:hover { color: var(--color-pink); }
.footer-bottom { display: flex; justify-content: space-between; gap: 1rem; padding-top: 1rem; padding-bottom: 1.6rem; border-top: 1px solid var(--color-border-light); color: var(--color-text-faint); font: .65rem var(--font-sans); }
@media (max-width: 650px) { .footer-top, .footer-bottom { align-items: flex-start; flex-direction: column; } .footer-top nav { flex-wrap: wrap; } }
</style>
