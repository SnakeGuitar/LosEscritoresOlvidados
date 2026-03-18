<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
}>()
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="rel"
    class="base-btn"
    :class="[`base-btn--${variant ?? 'primary'}`]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type ?? 'button'"
    class="base-btn"
    :class="[`base-btn--${variant ?? 'primary'}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-block;
  font-family: var(--font-accent);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: var(--space-sm) var(--space-xl);
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
  line-height: 1.5;
}

.base-btn:hover {
  transform: translateY(-2px);
}

.base-btn--primary {
  background: var(--color-secondary);
  color: var(--color-text-inverse);
  border-color: var(--color-secondary);
}

.base-btn--primary:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.base-btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.base-btn--secondary:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.base-btn--ghost {
  background: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.base-btn--ghost:hover {
  background: var(--color-accent);
  color: var(--color-primary);
}
</style>
