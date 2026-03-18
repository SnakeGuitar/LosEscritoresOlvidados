<script setup lang="ts">
import type { Contest } from '~/types'

defineProps<{
  contests: Contest[]
  preview?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const statusClass = (status: Contest['status']) => ({
  'status--open': status === 'open',
  'status--closed': status === 'closed',
  'status--judging': status === 'judging',
})
</script>

<template>
  <section class="section contests-section" :style="{ '--contest-gradient': 'linear-gradient(135deg, rgba(246, 172, 15, 0.08) 0%, rgba(177, 50, 25, 0.06) 100%)' }">
    <div class="container">
      <UiSectionHeader
        :title="t('contests.sectionTitle')"
        :subtitle="t('contests.subtitle')"
        centered
      />

      <div v-if="contests.length > 0" class="contests-list">
        <div
          v-for="contest in contests"
          :key="contest.id"
          class="contest-card vintage-card"
        >
          <div class="contest-card-top">
            <span class="contest-status" :class="statusClass(contest.status)">
              {{ t(`contests.status.${contest.status}`) }}
            </span>
            <span class="contest-deadline">
              {{ t('contests.deadline') }}: {{ contest.deadline }}
            </span>
          </div>
          <h3 class="contest-title">{{ contest.title }}</h3>
          <p class="contest-description">{{ contest.description }}</p>
          <div class="contest-prize">
            <span class="prize-label">{{ t('contests.prize') }}:</span>
            <span class="prize-value">{{ contest.prize }}</span>
          </div>
          <div class="contest-actions">
            <a
              v-if="contest.discordUrl"
              :href="contest.discordUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contest-btn"
            >
              {{ t('contests.participate') }}
            </a>
            <a
              v-if="contest.rulesUrl"
              :href="contest.rulesUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contest-rules-link"
            >
              {{ t('contests.rules') }} →
            </a>
          </div>
        </div>
      </div>

      <UiEmptyState v-else :message="t('contests.noContestsYet')" glyph="🏆" />
    </div>
  </section>
</template>

<style scoped>
.contests-section {
  background: linear-gradient(135deg, rgba(246, 172, 15, 0.08) 0%, rgba(177, 50, 25, 0.06) 100%);
  border-top: 2px dashed var(--color-accent);
  border-bottom: 2px solid var(--color-secondary);
}

.contests-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

.contest-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.contest-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.contest-status {
  font-family: var(--font-accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px var(--space-sm);
  border-radius: var(--radius-sm);
}

.status--open {
  background: rgba(68, 160, 80, 0.12);
  color: #2d7a38;
}

.status--closed {
  background: rgba(177, 50, 25, 0.12);
  color: var(--color-secondary);
}

.status--judging {
  background: rgba(246, 172, 15, 0.15);
  color: #8a6800;
}

.contest-deadline {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.contest-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-primary);
}

.contest-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}

.contest-prize {
  display: flex;
  gap: var(--space-sm);
  font-family: var(--font-accent);
  font-size: 0.95rem;
  padding: var(--space-sm) var(--space-md);
  background: rgba(246, 172, 15, 0.1);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-accent);
}

.prize-label {
  color: var(--color-text-muted);
}

.prize-value {
  color: var(--color-primary);
  font-weight: 600;
}

.contest-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.contest-btn {
  font-family: var(--font-accent);
  font-size: 0.95rem;
  font-weight: 600;
  background: var(--color-secondary);
  color: var(--color-text-inverse);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.contest-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  transform: translateY(-1px);
}

.contest-rules-link {
  font-family: var(--font-accent);
  font-size: 0.9rem;
  color: var(--color-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contest-rules-link:hover {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .contests-list {
    grid-template-columns: 1fr;
  }
}
</style>
