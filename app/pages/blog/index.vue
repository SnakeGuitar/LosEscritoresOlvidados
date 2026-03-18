<script setup lang="ts">
const { posts, isLoading } = useBlog()
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('blog.sectionTitle')} — Los Escritores Olvidados`,
})
</script>

<template>
  <div>
    <SectionsBlogSection :posts="posts" />
  </div>
</template>
