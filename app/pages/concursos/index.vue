<script setup lang="ts">
const { contests, isLoading } = useContests()
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('contests.sectionTitle')} — Los Escritores Olvidados`,
})
</script>

<template>
  <div>
    <SectionsContestsSection :contests="contests" />
  </div>
</template>
