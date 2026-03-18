<script setup lang="ts">
const { t } = useI18n()

const features = computed(() => [
  { key: 'editors', glyph: '💼' },
  { key: 'sessions', glyph: '📖' },
  { key: 'classes', glyph: '📚' },
  { key: 'beta', glyph: '🧾' },
  { key: 'platforms', glyph: '📌' },
  { key: 'youtube', glyph: '🎬' },
])
</script>

<template>
  <section class="section about-section">
    <div class="container">
      <UiSectionHeader
        :title="t('about.sectionTitle')"
        :subtitle="t('about.description')"
      />

      <div class="features-grid">
        <div
          v-for="feature in features"
          :key="feature.key"
          class="feature-item vintage-card"
        >
          <span class="feature-glyph" aria-hidden="true">{{ feature.glyph }}</span>
          <p class="feature-label">{{ t(`about.features.${feature.key}`) }}</p>
        </div>
      </div>

      <div class="about-cta">
        <a
          href="https://discord.gg/edwk6mFFQk"
          target="_blank"
          rel="noopener noreferrer"
          class="discord-link"
        >
          <span class="discord-link-text">{{ t('nav.joinDiscord') }}</span>
          <span class="discord-link-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: linear-gradient(135deg, var(--color-background-dark) 0%, var(--color-background) 100%);
  border-top: 2px solid var(--color-accent);
  border-bottom: 2px solid var(--color-secondary);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 300px;
  background: radial-gradient(circle, rgba(246, 172, 15, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.about-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 250px;
  background: radial-gradient(circle, rgba(177, 50, 25, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-3xl);
  position: relative;
  z-index: 1;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-sm);
  position: relative;
  z-index: 1;
}

.feature-item:nth-child(odd) {
  background: rgba(246, 172, 15, 0.06);
}

.feature-item:nth-child(even) {
  background: rgba(177, 50, 25, 0.05);
}

.feature-glyph {
  font-size: 1.75rem;
  line-height: 1;
  display: inline-block;
  padding: var(--space-sm);
  background: rgba(68, 33, 5, 0.04);
  border-radius: var(--radius-sm);
}

.feature-label {
  font-family: var(--font-accent);
  font-size: 1rem;
  color: var(--color-primary);
  line-height: 1.4;
  font-weight: 600;
}

.about-cta {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.discord-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-accent);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-secondary);
  padding-bottom: 2px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.discord-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.discord-link-arrow {
  transition: transform 0.3s ease;
}

.discord-link:hover .discord-link-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
