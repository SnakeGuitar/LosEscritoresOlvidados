<script setup lang="ts">
import type { InkwellTab } from '~/types'

const { t } = useI18n()
const { resources, filteredResources, activeTab, isLoading } = useInkwell()

const tabs: { key: InkwellTab; labelKey: string }[] = [
  { key: 'tips', labelKey: 'inkwell.tabs.tips' },
  { key: 'ebooks', labelKey: 'inkwell.tabs.ebooks' },
  { key: 'courses', labelKey: 'inkwell.tabs.courses' },
]
</script>

<template>
  <section class="section inkwell-section">
    <div class="container">
      <UiSectionHeader
        :title="t('inkwell.sectionTitle')"
        :subtitle="t('inkwell.subtitle')"
        centered
      />

      <div class="inkwell-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          role="tab"
          :aria-selected="activeTab === tab.key"
          class="inkwell-tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ t(tab.labelKey) }}
        </button>
      </div>

      <div v-if="filteredResources.length > 0" class="resources-grid">
        <a
          v-for="resource in filteredResources"
          :key="resource.id"
          :href="resource.url ?? resource.fileUrl ?? '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="resource-card vintage-card"
        >
          <h3 class="resource-title">{{ resource.title }}</h3>
          <p class="resource-description">{{ resource.description }}</p>
          <span v-if="resource.author" class="resource-author">— {{ resource.author }}</span>
        </a>
      </div>

      <UiEmptyState
        v-else
        :message="t('inkwell.noResourcesYet')"
        glyph="🖋"
      />
    </div>
  </section>
</template>

<style scoped>
.inkwell-section {
  background: linear-gradient(to right, var(--color-background-dark) 0%, var(--color-background) 50%, var(--color-background-dark) 100%);
  border-top: 2px solid var(--color-secondary);
  border-bottom: 2px solid var(--color-accent);
  position: relative;
}

.inkwell-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(circle, rgba(246, 172, 15, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.inkwell-tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-3xl);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0;
  position: relative;
  z-index: 1;
}

.inkwell-tab {
  font-family: var(--font-accent);
  font-size: 1rem;
  color: var(--color-text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: var(--space-sm) var(--space-lg);
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
  margin-bottom: -1px;
}

.inkwell-tab:hover {
  color: var(--color-primary);
}

.inkwell-tab.active {
  color: var(--color-secondary);
  border-bottom-color: var(--color-secondary);
  font-weight: 600;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  position: relative;
  z-index: 1;
}

.resource-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-decoration: none;
  color: inherit;
}

.resource-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-primary);
}

.resource-description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}

.resource-author {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }

  .inkwell-tab {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.9rem;
  }
}
</style>
