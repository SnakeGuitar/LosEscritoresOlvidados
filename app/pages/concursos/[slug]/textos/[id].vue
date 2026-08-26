<script setup lang="ts">
const route = useRoute()
const { data: text, error } = await useFetch(`/api/texts/${route.params.id}`)

if (error.value) throw createError({ statusCode: 404, statusMessage: 'Texto no encontrado' })

useSeoMeta({
  title: () => text.value ? `${text.value.title} — Los Escritores Olvidados` : 'Texto — Los Escritores Olvidados',
  description: () => text.value ? `${text.value.title}, por ${text.value.authorName}.` : '',
})

const distinctionLabel = computed(() => ({
  winner: 'Texto ganador', finalist: 'Finalista', honorable_mention: 'Mención honorífica',
}[text.value?.distinction || 'finalist']))
</script>

<template>
  <article v-if="text" class="text-page">
    <div class="text-container">
      <NuxtLink to="/concursos" class="back-link">← Volver a concursos</NuxtLink>
      <header>
        <span>{{ distinctionLabel }} · {{ text.contest.theme }}</span>
        <h1>{{ text.title }}</h1>
        <p>por {{ text.authorName }}</p>
      </header>
      <div class="text-body">{{ text.bodyMarkdown }}</div>
      <a v-if="text.discordThreadUrl" :href="text.discordThreadUrl" target="_blank" rel="noopener noreferrer" class="discord-source">Ver hilo original en Discord ↗</a>
    </div>
  </article>
</template>

<style scoped>
.text-page { padding: 5rem 0 8rem; background: var(--color-background); }
.text-container { width: min(100% - 2rem, 760px); margin: 0 auto; }
.back-link { color: var(--color-pink); font: 800 .74rem var(--font-sans); }
header { margin: 3rem 0; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border); text-align: center; }
header span { color: var(--color-pink); font: 800 .68rem var(--font-sans); letter-spacing: .12em; text-transform: uppercase; }
header h1 { margin: .8rem 0 1rem; font-size: clamp(2.7rem, 7vw, 5rem); }
header p { color: var(--color-text-muted); font-style: italic; }
.text-body { color: var(--color-text); font-size: 1.08rem; line-height: 1.9; white-space: pre-wrap; }
.discord-source { display: inline-flex; margin-top: 3rem; color: var(--color-pink); font: 800 .75rem var(--font-sans); }
</style>
