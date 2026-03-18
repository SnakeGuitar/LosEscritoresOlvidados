<script setup lang="ts">
import type { CreativeText } from '~/types'

const props = defineProps<{
  texts: CreativeText[]
  preview?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const displayTexts = computed(() =>
  props.preview ? props.texts.slice(0, 6) : props.texts
)
</script>

<template>
  <section class="section texts-section">
    <div class="container">
      <div class="texts-header">
        <UiSectionHeader
          :title="t('texts.sectionTitle')"
          :subtitle="t('texts.subtitle')"
        />
        <a
          href="https://discord.gg/edwk6mFFQk"
          target="_blank"
          rel="noopener noreferrer"
          class="submit-btn"
        >
          {{ t('texts.submitText') }}
        </a>
      </div>

      <div v-if="displayTexts.length > 0" class="texts-grid">
        <NuxtLink
          v-for="text in displayTexts"
          :key="text.id"
          :to="localePath(`/textos/${text.slug}`)"
          class="text-card vintage-card"
        >
          <div class="text-card-top">
            <span class="text-genre">{{ text.genre }}</span>
          </div>
          <h3 class="text-title">{{ text.title }}</h3>
          <p class="text-excerpt">{{ text.excerpt }}</p>
          <div class="text-card-footer">
            <span class="text-author">{{ t('texts.author') }}: {{ text.author }}</span>
            <span v-if="text.wordCount" class="text-words">{{ text.wordCount }} palabras</span>
          </div>
        </NuxtLink>
      </div>

      <UiEmptyState v-else :message="t('texts.noTextsYet')" glyph="✍" />

      <div v-if="preview && texts.length > 6" class="section-more">
        <NuxtLink :to="localePath('/textos')" class="more-link">
          Ver todos los textos →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.texts-section {
  background: linear-gradient(to bottom, var(--color-background) 0%, var(--color-background-dark) 100%);
}

.texts-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.submit-btn {
  flex-shrink: 0;
  font-family: var(--font-accent);
  font-size: 0.95rem;
  font-weight: 600;
  background: var(--color-accent);
  color: var(--color-primary);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background: var(--color-accent-light);
  transform: translateY(-1px);
  color: var(--color-primary);
}

.texts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.text-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-decoration: none;
  color: inherit;
}

.text-card-top {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.text-genre {
  font-family: var(--font-accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-secondary);
  background: rgba(177, 50, 25, 0.08);
  padding: 2px var(--space-sm);
  border-radius: var(--radius-sm);
}

.text-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--color-primary);
  line-height: 1.35;
}

.text-excerpt {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-accent);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: auto;
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border);
}

.section-more {
  display: flex;
  justify-content: center;
  margin-top: var(--space-2xl);
}

.more-link {
  font-family: var(--font-accent);
  font-size: 1rem;
  color: var(--color-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-secondary);
  padding-bottom: 2px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.more-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

@media (max-width: 900px) {
  .texts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .texts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
