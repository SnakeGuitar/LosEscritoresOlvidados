<script setup lang="ts">
import type { Contest } from '~/types'

const props = withDefaults(defineProps<{ contests: Contest[]; preview?: boolean }>(), { preview: false })

const selectedYear = ref<'all' | number>('all')
const selectedMonth = ref('Todos')
const years = computed(() => [...new Set(props.contests.map(contest => contest.year))].sort((a, b) => b - a))
const months = computed(() => ['Todos', ...new Set(
  props.contests
    .filter(contest => selectedYear.value === 'all' || contest.year === selectedYear.value)
    .map(contest => contest.month),
)])
const filtered = computed(() => props.contests.filter(contest => {
  const yearMatches = selectedYear.value === 'all' || contest.year === selectedYear.value
  const monthMatches = selectedMonth.value === 'Todos' || contest.month === selectedMonth.value
  return yearMatches && monthMatches
}))
const visibleContests = computed(() => props.preview ? filtered.value.slice(0, 3) : filtered.value)

watch(selectedYear, () => { selectedMonth.value = 'Todos' })
</script>

<template>
  <section id="concursos" class="contests-section">
    <div class="container">
      <div class="section-intro contest-intro">
        <div>
          <span class="kicker">Archivo de concursos</span>
          <h2>Historias que dejaron marca</h2>
          <p>Explora las convocatorias por temporada y vuelve a leer los textos premiados por la comunidad.</p>
        </div>
        <NuxtLink v-if="preview" to="/concursos" class="text-link">Ver todo el archivo <span>→</span></NuxtLink>
      </div>

      <div v-if="!preview" class="filters" aria-label="Filtros del archivo">
        <div class="filter-group">
          <span>Año</span>
          <button :class="{ active: selectedYear === 'all' }" @click="selectedYear = 'all'">Todos</button>
          <button v-for="year in years" :key="year" :class="{ active: selectedYear === year }" @click="selectedYear = year">{{ year }}</button>
        </div>
        <div class="filter-group filter-group--months">
          <span>Mes</span>
          <button v-for="month in months" :key="month" :class="{ active: selectedMonth === month }" @click="selectedMonth = month">{{ month }}</button>
        </div>
      </div>

      <div class="contest-grid">
        <article v-for="contest in visibleContests" :key="contest.id" class="contest-card">
          <div class="contest-cover" :class="`contest-cover--${contest.artworkTone}`">
            <span class="cover-date">{{ contest.month }} · {{ contest.year }}</span>
            <strong>{{ contest.theme }}</strong>
            <span class="cover-mark">LEO</span>
          </div>
          <div class="contest-body">
            <div class="contest-meta">
              <span class="status" :class="`status--${contest.status}`">{{ contest.status === 'open' ? 'Abierto' : contest.status === 'judging' ? 'En evaluación' : 'Cerrado' }}</span>
              <span>{{ contest.deadline }}</span>
            </div>
            <h3>{{ contest.title }}</h3>
            <p>{{ contest.description }}</p>

            <div v-if="contest.winner" class="winner-block">
              <span class="winner-label">Texto ganador</span>
              <strong>“{{ contest.winner.title }}”</strong>
              <small>por {{ contest.winner.author }}</small>
              <p v-if="contest.winner.excerpt">{{ contest.winner.excerpt }}</p>
              <NuxtLink v-if="contest.winner.textUrl" :to="contest.winner.textUrl">Leer texto <span>→</span></NuxtLink>
            </div>

            <div v-if="contest.finalists?.length" class="recognitions">
              <span>Finalistas</span>
              <NuxtLink v-for="finalist in contest.finalists" :key="finalist.id" :to="finalist.textUrl || '#'">{{ finalist.title }} · {{ finalist.author }}</NuxtLink>
            </div>

            <details v-if="contest.mentions?.length" class="mentions">
              <summary>{{ contest.mentions.length }} {{ contest.mentions.length === 1 ? 'mención honorífica' : 'menciones honoríficas' }}</summary>
              <ul>
                <li v-for="mention in contest.mentions" :key="mention.id || mention.title">
                  <NuxtLink :to="mention.textUrl || '#'"><strong>{{ mention.title }}</strong> · {{ mention.author }}</NuxtLink>
                </li>
              </ul>
            </details>

            <div v-if="contest.status === 'open'" class="contest-actions">
              <a :href="contest.discordUrl" target="_blank" rel="noopener noreferrer" class="primary-action">Participar en Discord</a>
              <span>Premio: {{ contest.prize }}</span>
            </div>
          </div>
        </article>
      </div>

      <p v-if="visibleContests.length === 0" class="no-results">Todavía no hay concursos publicados.</p>
    </div>
  </section>
</template>

<style scoped>
.contests-section { padding: 7rem 0; background: var(--color-background); }
.section-intro { margin-bottom: 2.5rem; }
.contest-intro { display: flex; align-items: end; justify-content: space-between; gap: 2rem; }
.contest-intro h2 { margin: .45rem 0 1rem; }
.contest-intro p { max-width: 650px; color: var(--color-text-muted); font-size: 1.05rem; }
.kicker { color: var(--color-pink); font-family: var(--font-sans); font-size: .75rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.text-link { white-space: nowrap; color: var(--color-pink); font: 800 .82rem var(--font-sans); }
.text-link span { margin-left: .35rem; }
.filters { display: flex; flex-wrap: wrap; gap: 1rem 2rem; margin: -1rem 0 1.2rem; padding: 1rem 0 1.4rem; border-bottom: 1px solid var(--color-border-light); }
.filter-group { display: flex; flex-wrap: wrap; align-items: center; gap: .45rem; }
.filter-group > span { margin-right: .2rem; color: var(--color-text-faint); font: 800 .68rem var(--font-sans); letter-spacing: .08em; text-transform: uppercase; }
.filter-group button { border: 1px solid var(--color-border); border-radius: 999px; background: transparent; color: var(--color-text-muted); padding: .45rem .75rem; font: 700 .72rem var(--font-sans); cursor: pointer; }
.filter-group button.active { border-color: var(--color-ink); background: var(--color-ink); color: white; }
.contest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
.contest-card { overflow: hidden; border: 1px solid var(--color-border); border-radius: 24px; background: var(--color-surface); box-shadow: var(--shadow-md); transition: transform .25s ease, box-shadow .25s ease; }
.contest-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
.contest-cover { position: relative; isolation: isolate; display: flex; flex-direction: column; justify-content: space-between; min-height: 210px; padding: 1.25rem; overflow: hidden; color: white; }
.contest-cover::before { content: ''; position: absolute; z-index: -1; width: 180px; height: 180px; right: -45px; bottom: -65px; border: 32px solid rgba(255,255,255,.12); border-radius: 50%; }
.contest-cover::after { content: '✦'; position: absolute; z-index: -1; right: 1.3rem; top: 50%; font-size: 4.5rem; color: rgba(255,255,255,.18); transform: translateY(-50%); }
.contest-cover--red { background: linear-gradient(145deg, #ef2b17, #99190d); }
.contest-cover--pink { background: linear-gradient(145deg, #ec397b, #8f174b); }
.contest-cover--gold { background: linear-gradient(145deg, #f5aa0a, #bf5a08); }
.contest-cover--plum { background: linear-gradient(145deg, #422052, #1d1029); }
.cover-date { font: 800 .68rem var(--font-sans); letter-spacing: .12em; text-transform: uppercase; opacity: .75; }
.contest-cover strong { max-width: 230px; font: 700 clamp(1.75rem, 3vw, 2.7rem)/.95 var(--font-display); }
.cover-mark { align-self: flex-end; font: 900 .72rem var(--font-sans); letter-spacing: .18em; }
.contest-body { padding: 1.35rem; }
.contest-meta { display: flex; align-items: center; justify-content: space-between; gap: .7rem; color: var(--color-text-faint); font: 700 .66rem var(--font-sans); }
.status { border-radius: 99px; padding: .25rem .5rem; text-transform: uppercase; letter-spacing: .06em; }
.status--open { background: #ddf7e8; color: #157548; }
.status--closed { background: var(--color-surface-soft); color: var(--color-text-faint); }
.status--judging { background: var(--color-gold-soft); color: var(--color-red); }
.contest-body h3 { margin: 1rem 0 .55rem; font-size: 1.25rem; }
.contest-body > p { min-height: 4.3em; color: var(--color-text-muted); font-size: .86rem; }
.winner-block { margin-top: 1.15rem; padding-top: 1.05rem; border-top: 1px solid var(--color-border-light); }
.winner-label { display: block; color: var(--color-pink); font: 800 .66rem var(--font-sans); letter-spacing: .1em; text-transform: uppercase; }
.winner-block strong { display: block; margin-top: .35rem; color: var(--color-ink); font-size: .95rem; }
.winner-block small { color: var(--color-text-faint); font: .7rem var(--font-sans); }
.winner-block p { margin-top: .7rem; color: var(--color-text-muted); font-size: .82rem; font-style: italic; }
.pending-link { display: block; margin-top: .7rem; color: var(--color-text-faint); font: 700 .67rem var(--font-sans); }
.recognitions { display: flex; flex-direction: column; gap: .35rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border-light); font: .72rem var(--font-sans); }
.recognitions > span { color: var(--color-pink); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.recognitions a { color: var(--color-text-muted); }
.mentions { margin-top: 1rem; color: var(--color-text-muted); font: .75rem var(--font-sans); }
.mentions summary { color: var(--color-ink); font-weight: 800; cursor: pointer; }
.mentions ul { list-style: none; margin-top: .65rem; }
.mentions li + li { margin-top: .4rem; }
.contest-actions { display: flex; flex-direction: column; gap: .65rem; margin-top: 1.1rem; }
.primary-action { display: inline-flex; justify-content: center; border-radius: 10px; background: var(--color-pink); color: white; padding: .75rem 1rem; font: 800 .78rem var(--font-sans); }
.primary-action:hover { background: var(--color-red); color: white; }
.contest-actions > span { color: var(--color-text-faint); font: .67rem var(--font-sans); text-align: center; }
.no-results { padding: 4rem 0; color: var(--color-text-muted); text-align: center; }
@media (max-width: 950px) { .contest-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) {
  .contests-section { padding: 4.5rem 0; }
  .contest-intro { align-items: flex-start; flex-direction: column; }
  .contest-grid { grid-template-columns: 1fr; }
}
</style>
