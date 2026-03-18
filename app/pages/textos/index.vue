<script setup lang="ts">
const { texts, isLoading } = useTexts()
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('texts.sectionTitle')} — Los Escritores Olvidados`,
})
</script>

<template>
  <div>
    <SectionsTextsSection :texts="texts" />
  </div>
</template>
