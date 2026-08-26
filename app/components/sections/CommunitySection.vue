<template>
  <section id="comunidad" class="community-section">
    <div class="container">
      <div class="community-grid">
        <div class="community-copy">
          <span class="kicker">Mucho más que publicar</span>
          <h2>Escribir no tiene por qué ser un acto solitario.</h2>
          <p>Somos una comunidad pequeña y activa para compartir procesos, recibir lectura crítica y hacer amigos que también se obsesionan con las palabras.</p>
          <a href="https://discord.gg/edwk6mFFQk" target="_blank" rel="noopener noreferrer">Conocer el servidor <span>↗</span></a>
        </div>
        <div class="benefit-grid">
          <article><span>01</span><h3>Lectura atenta</h3><p>Sesiones semanales con turnos claros y espacio para conversar sobre cada obra.</p></article>
          <article><span>02</span><h3>Criterio editorial</h3><p>Un día dedicado a la lectura profesional y retroalimentación más profunda.</p></article>
          <article><span>03</span><h3>Retos creativos</h3><p>Concursos temáticos mensuales o estacionales para salir de la zona cómoda.</p></article>
          <article><span>04</span><h3>Archivo vivo</h3><p>Los textos ganadores y menciones permanecen visibles para celebrar a sus autores.</p></article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.community-section { padding: 7rem 0; background: var(--color-brand-ink); color: white; }
.community-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(3rem, 8vw, 7rem); }
.kicker { color: var(--color-gold); font: 800 .75rem var(--font-sans); letter-spacing: .16em; text-transform: uppercase; }
.community-copy h2 { margin: .7rem 0 1.3rem; color: white; font-size: clamp(2.5rem, 4.7vw, 4.3rem); }
.community-copy p { color: #c4b7c8; font-size: 1rem; }
.community-copy a { display: inline-flex; gap: .5rem; margin-top: 2rem; border-radius: 999px; background: var(--color-pink); color: white; padding: .85rem 1.2rem; font: 800 .78rem var(--font-sans); }
.benefit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,.12); }
.benefit-grid article { min-height: 215px; padding: 1.5rem; background: var(--color-brand-ink); }
.benefit-grid article:hover { background: color-mix(in srgb, var(--color-brand-ink) 88%, var(--color-pink)); }
.benefit-grid span { color: var(--color-pink); font: 800 .7rem var(--font-sans); }
.benefit-grid h3 { margin: 2.5rem 0 .7rem; color: white; font-size: 1.25rem; }
.benefit-grid p { color: #a99bac; font-size: .82rem; }
@media (max-width: 850px) { .community-grid { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .community-section { padding: 4.5rem 0; } .benefit-grid { grid-template-columns: 1fr; } .benefit-grid article { min-height: 175px; } }
</style>
