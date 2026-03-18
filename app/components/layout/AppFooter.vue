<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-ornament">
      <span class="ornament-line"></span>
      <span class="ornament-symbol">&sect;</span>
      <span class="ornament-line"></span>
    </div>

    <div class="container footer-inner">
      <div class="footer-section footer-brand">
        <img
          src="~/assets/cat-logo.webp"
          alt="LEO"
          class="footer-logo"
        />
        <p class="footer-description">{{ t('footer.description') }}</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">{{ t('footer.links') }}</h4>
        <nav class="footer-nav">
          <NuxtLink :to="localePath('/blog')">{{ t('nav.blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/textos')">{{ t('nav.texts') }}</NuxtLink>
          <NuxtLink :to="localePath('/en-el-tintero')">{{ t('nav.inkwell') }}</NuxtLink>
          <NuxtLink :to="localePath('/concursos')">{{ t('nav.contests') }}</NuxtLink>
        </nav>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">{{ t('footer.community') }}</h4>
        <nav class="footer-nav">
          <a
            href="https://discord.gg/edwk6mFFQk"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('footer.joinDiscord') }}
          </a>
          <NuxtLink :to="localePath('/alianzas')">{{ t('nav.alliances') }}</NuxtLink>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ currentYear }} {{ t('footer.copyright') }}</p>
        <p class="footer-tagline">{{ t('footer.madeWith') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  margin-top: var(--space-4xl);
}

.footer-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg) 0;
  background: var(--color-primary-light);
}

.ornament-line {
  width: 60px;
  height: 1px;
  background: var(--color-accent);
}

.ornament-symbol {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-accent);
  margin: 0 var(--space-md);
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-2xl);
  padding: var(--space-3xl) var(--container-padding);
}

.footer-logo {
  height: 56px;
  width: auto;
  border-radius: 50%;
  margin-bottom: var(--space-md);
}

.footer-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  opacity: 0.85;
  line-height: 1.6;
}

.footer-heading {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-nav a {
  font-family: var(--font-accent);
  color: var(--color-text-inverse);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.footer-nav a:hover {
  opacity: 1;
  color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid var(--color-primary-light);
  padding: var(--space-lg) 0;
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  opacity: 0.7;
}

.footer-tagline {
  font-family: var(--font-accent);
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-bottom-inner {
    flex-direction: column;
    gap: var(--space-sm);
    text-align: center;
  }
}
</style>
