<script setup lang="ts">
import type { Alliance } from '~/types'

defineProps<{
  alliances: Alliance[]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="section alliances-section">
    <div class="container">
      <UiSectionHeader
        :title="t('alliances.sectionTitle')"
        :subtitle="t('alliances.subtitle')"
        centered
      />

      <div v-if="alliances.length > 0" class="alliances-grid">
        <a
          v-for="alliance in alliances"
          :key="alliance.id"
          :href="alliance.discordUrl ?? alliance.websiteUrl ?? '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="alliance-card vintage-card"
        >
          <div v-if="alliance.logoUrl" class="alliance-logo-wrap">
            <img
              :src="alliance.logoUrl"
              :alt="alliance.name"
              class="alliance-logo"
            />
          </div>
          <div v-else class="alliance-logo-placeholder" aria-hidden="true">✦</div>
          <h3 class="alliance-name">{{ alliance.name }}</h3>
          <p class="alliance-description">{{ alliance.description }}</p>
          <span class="alliance-visit">{{ t('alliances.visit') }} →</span>
        </a>
      </div>

      <UiEmptyState v-else :message="t('alliances.noAlliancesYet')" glyph="🤝" />
    </div>
  </section>
</template>

<style scoped>
.alliances-section {
  background: linear-gradient(to bottom, var(--color-background-dark) 0%, var(--color-background) 50%, var(--color-background-dark) 100%);
  border-top: 2px solid var(--color-accent);
  border-bottom: 2px solid var(--color-secondary);
  position: relative;
}

.alliances-section::before {
  content: '✦ ✦ ✦';
  position: absolute;
  top: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--color-accent);
  opacity: 0.2;
  letter-spacing: var(--space-lg);
  pointer-events: none;
}

.alliances-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  position: relative;
  z-index: 1;
}

.alliance-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.alliance-logo-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-border);
}

.alliance-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.alliance-logo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--color-accent);
  background: var(--color-background);
}

.alliance-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--color-primary);
}

.alliance-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}

.alliance-visit {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-secondary);
  transition: color 0.3s ease;
}

.alliance-card:hover .alliance-visit {
  color: var(--color-accent);
}

@media (max-width: 900px) {
  .alliances-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .alliances-grid {
    grid-template-columns: 1fr;
  }
}
</style>
