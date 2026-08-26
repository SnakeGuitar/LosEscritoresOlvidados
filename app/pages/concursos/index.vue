<script setup lang="ts">
const { contests, isLoading } = useContests()
useSeoMeta({
  title: 'Concursos — Los Escritores Olvidados',
  description: 'Archivo de concursos temáticos, textos ganadores y menciones honoríficas de la comunidad.',
})
</script>

<template>
  <div class="page-top-space">
    <SectionsContestsSection :contests="contests" />
  </div>
</template>
