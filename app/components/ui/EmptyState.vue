<script setup lang="ts">
defineProps<{
  message: string
  glyph?: string
}>()
</script>

<template>
  <div class="empty-state">
    <span class="empty-glyph">{{ glyph ?? '✎' }}</span>
    <p class="empty-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-4xl) var(--space-xl);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  text-align: center;
}

.empty-glyph {
  font-size: 3rem;
  color: var(--color-accent);
  opacity: 0.6;
  line-height: 1;
}

.empty-message {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--color-text-muted);
  max-width: 36ch;
}
</style>
