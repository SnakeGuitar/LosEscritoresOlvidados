<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('inkwell.sectionTitle')} — Los Escritores Olvidados`,
})
</script>

<template>
  <div>
    <SectionsInkwellSection />
  </div>
</template>
