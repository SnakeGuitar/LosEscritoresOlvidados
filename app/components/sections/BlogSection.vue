<script setup lang="ts">
import type { BlogPost } from '~/types'

const props = defineProps<{
  posts: BlogPost[]
  preview?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const displayPosts = computed(() =>
  props.preview ? props.posts.slice(0, 3) : props.posts
)
</script>

<template>
  <section class="section blog-section">
    <div class="container">
      <UiSectionHeader
        :title="t('blog.sectionTitle')"
        :subtitle="t('blog.subtitle')"
        :centered="preview"
      />

      <div v-if="displayPosts.length > 0" class="blog-grid">
        <article
          v-for="post in displayPosts"
          :key="post.id"
          class="blog-card vintage-card"
        >
          <div class="blog-card-meta">
            <span class="blog-date">{{ post.publishedAt }}</span>
            <span class="blog-separator">·</span>
            <span class="blog-author">{{ t('blog.by') }} {{ post.author }}</span>
          </div>
          <h3 class="blog-title">{{ post.title }}</h3>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="blog-read-more">
            {{ t('blog.readMore') }}
            <span class="read-more-arrow">→</span>
          </NuxtLink>
        </article>
      </div>

      <UiEmptyState v-else :message="t('blog.noPostsYet')" glyph="📜" />

      <div v-if="preview && posts.length > 3" class="section-more">
        <NuxtLink :to="localePath('/blog')" class="more-link">
          Ver todos los artículos →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.blog-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-accent);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.blog-separator {
  color: var(--color-accent);
}

.blog-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-primary);
  line-height: 1.35;
}

.blog-excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}

.blog-read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-accent);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-decoration: none;
  margin-top: var(--space-sm);
  transition: color 0.3s ease;
}

.blog-read-more:hover {
  color: var(--color-accent);
}

.read-more-arrow {
  transition: transform 0.3s ease;
}

.blog-read-more:hover .read-more-arrow {
  transform: translateX(4px);
}

.section-more {
  display: flex;
  justify-content: center;
  margin-top: var(--space-2xl);
}

.more-link {
  font-family: var(--font-accent);
  font-size: 1rem;
  color: var(--color-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-secondary);
  padding-bottom: 2px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.more-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

@media (max-width: 900px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
