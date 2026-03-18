<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  centered?: boolean
}>()
</script>

<template>
  <div class="section-header" :class="{ centered }">
    <div class="ornament-top">
      <span class="ornament-rule"></span>
      <span class="ornament-glyph">✦</span>
      <span class="ornament-rule"></span>
    </div>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    <div class="ornament-bottom">
      <span class="ornament-rule short"></span>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: var(--space-3xl);
}

.section-header.centered {
  text-align: center;
}

.section-header.centered .ornament-top,
.section-header.centered .ornament-bottom {
  justify-content: center;
}

.ornament-top,
.ornament-bottom {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.ornament-bottom {
  margin-top: var(--space-md);
  margin-bottom: 0;
}

.ornament-rule {
  display: block;
  height: 1px;
  width: 48px;
  background: var(--color-accent);
}

.ornament-rule.short {
  width: 32px;
}

.ornament-glyph {
  color: var(--color-accent);
  font-size: 0.75rem;
  line-height: 1;
}

.section-title {
  font-family: var(--font-display);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.section-subtitle {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.6;
}
</style>
