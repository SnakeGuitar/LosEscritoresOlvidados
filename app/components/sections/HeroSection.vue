<template>
  <section class="hero">
    <div class="hero-orbit hero-orbit--one"></div>
    <div class="hero-orbit hero-orbit--two"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="hero-kicker"><span></span> Comunidad literaria en Discord</div>
        <h1>Donde tus historias encuentran <em>voz.</em></h1>
        <p>Escribe acompañado. Comparte tu obra en nuestras lecturas semanales, recibe retroalimentación y participa en concursos que celebran nuevas voces.</p>
        <div class="hero-actions">
          <a href="https://discord.gg/edwk6mFFQk" target="_blank" rel="noopener noreferrer" class="hero-primary">Unirme a la comunidad <span>↗</span></a>
          <NuxtLink to="/lecturas" class="hero-secondary">Ver próximas lecturas <span>↓</span></NuxtLink>
        </div>
        <div class="hero-proof">
          <div class="avatar-stack" aria-hidden="true"><span>LE</span><span>O</span><span>+</span></div>
          <p><strong>Lecturas cada semana</strong><br>Miércoles, jueves y sábado</p>
        </div>
      </div>

      <div class="mascot-stage" aria-label="Gaby, la mascota de Los Escritores Olvidados">
        <div class="mascot-halo"></div>
        <span class="spark spark--one">✦</span>
        <span class="spark spark--two">✧</span>
        <span class="spark spark--three">·</span>
        <img src="~/assets/gaby-logo.png" alt="Gaby, un mapache abrazando un libro de LEO">
        <div class="floating-card floating-card--next">
          <span class="floating-label">Próxima lectura</span>
          <strong>Sesiones semanales</strong>
          <small>Miércoles, jueves y sábado</small>
        </div>
        <div class="floating-card floating-card--contest">
          <span class="mini-icon">✦</span>
          <span><strong>Concursos temáticos</strong><small>Convocatorias y archivo</small></span>
        </div>
      </div>
    </div>
    <div class="hero-marquee" aria-hidden="true">
      <div>LECTURAS SEMANALES <span>✦</span> CONCURSOS TEMÁTICOS <span>✦</span> CRÍTICA CON RESPETO <span>✦</span> COMUNIDAD CREATIVA <span>✦</span></div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; isolation: isolate; overflow: hidden; min-height: calc(100vh - 78px); padding: 4.5rem 0 0; background: var(--color-brand-ink); color: white; }
.hero::before { content: ''; position: absolute; inset: 0; z-index: -2; background: radial-gradient(circle at 72% 42%, rgba(229,47,107,.2), transparent 30%), linear-gradient(135deg, #21112b 0%, #2c1636 55%, #1b1025 100%); }
.hero::after { content: ''; position: absolute; z-index: -1; inset: 0; opacity: .16; background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(to bottom, black, transparent 75%); }
.hero-grid { display: grid; grid-template-columns: 1.02fr .98fr; align-items: center; gap: 2rem; min-height: 650px; padding-bottom: 5rem; }
.hero-copy { position: relative; z-index: 3; }
.hero-kicker { display: flex; align-items: center; gap: .65rem; margin-bottom: 1.5rem; color: #e6dbe9; font: 800 .72rem var(--font-sans); letter-spacing: .14em; text-transform: uppercase; }
.hero-kicker span { width: 7px; height: 7px; border-radius: 50%; background: var(--color-gold); box-shadow: 0 0 0 5px rgba(246,172,15,.12); }
.hero h1 { max-width: 760px; color: white; }
.hero h1 em { color: var(--color-pink); font-weight: 700; }
.hero-copy > p { max-width: 610px; margin-top: 1.6rem; color: #c9bdce; font-size: clamp(1rem, 1.5vw, 1.15rem); }
.hero-actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
.hero-actions a { display: inline-flex; align-items: center; justify-content: center; gap: .55rem; min-height: 52px; border-radius: 999px; padding: .8rem 1.3rem; font: 800 .78rem var(--font-sans); }
.hero-primary { background: var(--color-pink); color: white; box-shadow: 0 10px 30px rgba(229,47,107,.27); }
.hero-primary:hover { background: var(--color-red); }
.hero-secondary { border: 1px solid rgba(255,255,255,.2); color: white; }
.hero-secondary:hover { border-color: rgba(255,255,255,.5); }
.hero-proof { display: flex; align-items: center; gap: .8rem; margin-top: 2rem; }
.avatar-stack { display: flex; }
.avatar-stack span { display: grid; place-items: center; width: 34px; height: 34px; margin-left: -7px; border: 2px solid #291534; border-radius: 50%; background: var(--color-gold); color: #23142e; font: 900 .62rem var(--font-sans); }
.avatar-stack span:first-child { margin-left: 0; background: var(--color-red); color: white; }
.avatar-stack span:nth-child(2) { background: var(--color-pink); color: white; }
.hero-proof p { color: #aa9cb0; font: .7rem/1.45 var(--font-sans); }
.hero-proof strong { color: white; font-size: .75rem; }
.mascot-stage { position: relative; align-self: stretch; min-height: 620px; }
.mascot-stage > img { position: absolute; z-index: 2; left: 50%; bottom: -3.5rem; width: min(670px, 52vw); max-width: none; transform: translateX(-49%); filter: drop-shadow(0 30px 28px rgba(0,0,0,.28)); }
.mascot-halo { position: absolute; left: 50%; top: 49%; width: min(480px, 40vw); aspect-ratio: 1; border-radius: 50%; background: linear-gradient(145deg, #fff1ca, #efc9d3); transform: translate(-50%, -50%); box-shadow: 0 0 0 1px rgba(255,255,255,.18), 0 0 0 35px rgba(255,255,255,.025); }
.mascot-halo::before, .mascot-halo::after { content: ''; position: absolute; border-radius: 50%; }
.mascot-halo::before { inset: 10%; border: 1px dashed rgba(35,20,46,.2); }
.mascot-halo::after { width: 30px; height: 30px; left: 8%; top: 20%; background: var(--color-gold); }
.floating-card { position: absolute; z-index: 4; border: 1px solid rgba(255,255,255,.25); border-radius: 16px; background: rgba(255,250,244,.94); color: #23142e; box-shadow: 0 18px 38px rgba(0,0,0,.2); backdrop-filter: blur(10px); }
.floating-card--next { top: 15%; right: -1rem; padding: .85rem 1rem; transform: rotate(2deg); }
.floating-label { display: block; color: #e52f6b; font: 800 .58rem var(--font-sans); letter-spacing: .1em; text-transform: uppercase; }
.floating-card--next strong { display: block; margin-top: .28rem; font: 800 .98rem var(--font-sans); }
.floating-card small { display: block; margin-top: .12rem; color: #73687a; font: .66rem var(--font-sans); }
.floating-card--contest { left: -1rem; bottom: 16%; display: flex; align-items: center; gap: .7rem; padding: .75rem .9rem; transform: rotate(-2deg); }
.floating-card--contest strong { display: block; font: 800 .78rem var(--font-sans); }
.mini-icon { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: #fff2c9; color: #ef2b17; }
.spark { position: absolute; z-index: 3; color: var(--color-gold); }
.spark--one { top: 14%; left: 14%; font-size: 1.7rem; }
.spark--two { top: 31%; right: 3%; color: white; font-size: 1.3rem; }
.spark--three { bottom: 18%; right: 3%; color: var(--color-pink); font-size: 4rem; }
.hero-orbit { position: absolute; z-index: -1; border: 1px solid rgba(255,255,255,.08); border-radius: 50%; }
.hero-orbit--one { width: 320px; height: 320px; left: -190px; top: 8%; }
.hero-orbit--two { width: 190px; height: 190px; right: -80px; bottom: 13%; }
.hero-marquee { overflow: hidden; padding: .9rem 0; background: var(--color-pink); color: white; transform: rotate(-1deg) scale(1.01); transform-origin: left; }
.hero-marquee div { width: max-content; font: 900 .66rem var(--font-sans); letter-spacing: .16em; white-space: nowrap; }
.hero-marquee span { margin: 0 1.5rem; color: var(--color-gold); }
@media (max-width: 900px) {
  .hero { padding-top: 3rem; }
  .hero-grid { grid-template-columns: 1fr; text-align: center; padding-bottom: 0; }
  .hero-copy { display: flex; flex-direction: column; align-items: center; }
  .mascot-stage { min-height: 560px; }
  .mascot-stage > img { width: min(650px, 90vw); }
  .mascot-halo { width: min(470px, 68vw); }
  .floating-card--next { right: 6%; }
  .floating-card--contest { left: 6%; }
}
@media (max-width: 560px) {
  .hero { min-height: auto; }
  .hero-grid { min-height: 0; }
  .hero-copy > p { font-size: .95rem; }
  .hero-actions { width: 100%; flex-direction: column; }
  .hero-actions a { width: 100%; }
  .mascot-stage { min-height: 430px; }
  .mascot-stage > img { bottom: -2.5rem; width: 118vw; }
  .mascot-halo { top: 54%; width: 80vw; }
  .floating-card--next { top: 10%; right: 0; }
  .floating-card--contest { bottom: 11%; left: 0; }
}
</style>
