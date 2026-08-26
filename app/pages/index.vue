<script setup lang="ts">
const { contests } = useContests()

useSeoMeta({
  title: 'Los Escritores Olvidados — Comunidad literaria',
  description: 'Lecturas semanales, concursos temáticos y una comunidad en Discord para compartir tu escritura.',
})
</script>

<template>
  <div class="home-page">
    <SectionsHeroSection />
    <SectionsReadingSchedule compact />
    <SectionsContestsSection :contests="contests" preview />
    <SectionsCommunitySection />
  </div>
</template>
