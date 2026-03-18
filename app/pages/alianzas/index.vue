<script setup lang="ts">
const { alliances, isLoading } = useAlliances()
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('alliances.sectionTitle')} — Los Escritores Olvidados`,
})
</script>

<template>
  <div>
    <SectionsAlliancesSection :alliances="alliances" />
  </div>
</template>
