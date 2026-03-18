<script setup lang="ts">
const { posts } = useBlog()
const { texts } = useTexts()
const { contests } = useContests()
const { alliances } = useAlliances()
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsAboutSection />
    <SectionsBlogSection :posts="posts" preview />
    <SectionsContestsSection :contests="contests" preview />
    <SectionsAlliancesSection :alliances="alliances" />
  </div>
</template>
