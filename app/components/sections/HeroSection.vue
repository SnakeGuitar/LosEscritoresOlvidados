<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <div class="hero-frame">
      <div class="hero-frame-corner hero-frame-corner--tl"></div>
      <div class="hero-frame-corner hero-frame-corner--tr"></div>
      <div class="hero-frame-corner hero-frame-corner--bl"></div>
      <div class="hero-frame-corner hero-frame-corner--br"></div>

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="eyebrow-rule"></span>
          <span class="eyebrow-text">✎ LEO ✎</span>
          <span class="eyebrow-rule"></span>
        </div>

        <h1 class="hero-title">{{ t('hero.title') }}</h1>

        <div class="hero-divider">
          <span>⸻</span>
          <span class="hero-divider-glyph">&sect;</span>
          <span>⸻</span>
        </div>

        <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>

        <div class="hero-actions">
          <NuxtLink :to="localePath('/en-el-tintero')" class="hero-btn hero-btn--primary">
            {{ t('hero.cta') }}
          </NuxtLink>
          <a
            href="https://discord.gg/edwk6mFFQk"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-btn hero-btn--secondary"
          >
            {{ t('hero.ctaSecondary') }}
          </a>
        </div>
      </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="scroll-line"></span>
      <span class="scroll-glyph">↓</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl) var(--space-lg);
  position: relative;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-dark) 50%, var(--color-background) 100%);
  background-image:
    linear-gradient(135deg, var(--color-background) 0%, var(--color-background-dark) 50%, var(--color-background) 100%),
    radial-gradient(ellipse at 15% 85%, rgba(241, 172, 15, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%, rgba(177, 50, 25, 0.1) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 50%, rgba(68, 33, 5, 0.04) 0%, transparent 70%);
  background-blend-mode: multiply, screen, screen, multiply;
}

.hero-frame {
  position: relative;
  width: 100%;
  max-width: 780px;
  padding: var(--space-4xl) var(--space-3xl);
  text-align: center;
  border: 1px solid var(--color-border);
}

.hero-frame::before,
.hero-frame::after {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(212, 197, 160, 0.4);
  pointer-events: none;
}

.hero-frame::after {
  inset: 3px;
  border-color: rgba(246, 172, 15, 0.15);
}

.hero-frame-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--color-accent);
  border-style: solid;
  opacity: 0.7;
}

.hero-frame-corner--tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.hero-frame-corner--tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.hero-frame-corner--bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.hero-frame-corner--br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

.hero-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.eyebrow-rule {
  display: block;
  width: 40px;
  height: 1px;
  background: var(--color-accent);
}

.eyebrow-text {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.15;
  margin-bottom: var(--space-lg);
  text-shadow: 1px 1px 0 rgba(68, 33, 5, 0.08);
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-xl);
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

.hero-divider-glyph {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-secondary);
}

.hero-subtitle {
  font-family: var(--font-accent);
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: var(--space-3xl);
  max-width: 52ch;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  font-family: var(--font-accent);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: var(--space-sm) var(--space-2xl);
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn--primary {
  background: var(--color-secondary);
  color: var(--color-text-inverse);
  border-color: var(--color-secondary);
}

.hero-btn--primary:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.hero-btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.hero-btn--secondary:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.hero-scroll-hint {
  position: absolute;
  bottom: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-accent);
  opacity: 0.6;
  animation: nudge 2s ease-in-out infinite;
}

.scroll-line {
  display: block;
  width: 1px;
  height: 24px;
  background: var(--color-accent);
}

.scroll-glyph {
  font-size: 0.85rem;
}

@keyframes nudge {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

@media (max-width: 640px) {
  .hero-frame {
    padding: var(--space-2xl) var(--space-lg);
  }

  .hero-scroll-hint {
    display: none;
  }
}
</style>
